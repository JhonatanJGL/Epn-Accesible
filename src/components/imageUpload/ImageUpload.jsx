import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase/firebaseConfig";
import { supabase } from "../../supabase/supabaseClient";

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const TAMANO_MAXIMO = 5 * 1024 * 1024;

const ImageUpload = () => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const seleccionarImagen = (event) => {
    const imagenSeleccionada = event.target.files?.[0];

    setMensaje("");
    setUrlImagen("");

    if (!imagenSeleccionada) {
      setArchivo(null);
      setVistaPrevia("");
      return;
    }

    if (!FORMATOS_PERMITIDOS.includes(imagenSeleccionada.type)) {
      setArchivo(null);
      setVistaPrevia("");
      setMensaje("Solo se permiten imágenes JPG, PNG o WebP.");
      return;
    }

    if (imagenSeleccionada.size > TAMANO_MAXIMO) {
      setArchivo(null);
      setVistaPrevia("");
      setMensaje("La imagen no puede superar los 5 MB.");
      return;
    }

    setArchivo(imagenSeleccionada);
    setVistaPrevia(URL.createObjectURL(imagenSeleccionada));
  };

  const subirImagen = async () => {
    const usuario = auth.currentUser;

    if (!usuario) {
      setMensaje("Debes iniciar sesión para subir una foto de perfil.");
      return;
    }

    if (!archivo) {
      setMensaje("Selecciona una imagen antes de subirla.");
      return;
    }

    try {
      setSubiendo(true);
      setMensaje("");

      const extension =
        archivo.name.split(".").pop()?.toLowerCase() || "jpg";

      const nombreUnico = `${crypto.randomUUID()}.${extension}`;

      const rutaArchivo =
        `perfiles/${usuario.uid}/${nombreUnico}`;

      const { error: errorSubida } = await supabase.storage
        .from("imagenes-epn")
        .upload(rutaArchivo, archivo, {
          cacheControl: "3600",
          upsert: false,
          contentType: archivo.type,
        });

      if (errorSubida) {
        throw errorSubida;
      }

      const { data } = supabase.storage
        .from("imagenes-epn")
        .getPublicUrl(rutaArchivo);

      const urlPublica = data.publicUrl;

      await setDoc(
        doc(db, "usuarios", usuario.uid),
        {
          fotoPerfil: urlPublica,
        },
        {
          merge: true,
        }
      );

      setUrlImagen(urlPublica);
      setMensaje("Foto de perfil actualizada correctamente.");
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);

      setMensaje(
        `No se pudo subir la imagen: ${error.message}`
      );
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <section className="profile-image-upload">
      <h2>Foto de perfil</h2>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={seleccionarImagen}
      />

      {vistaPrevia && (
        <img
          src={vistaPrevia}
          alt="Vista previa de la foto de perfil"
          style={{
            display: "block",
            width: "160px",
            height: "160px",
            objectFit: "cover",
            marginTop: "15px",
            borderRadius: "50%",
          }}
        />
      )}

      <button
        type="button"
        onClick={subirImagen}
        disabled={!archivo || subiendo}
      >
        {subiendo
          ? "Subiendo..."
          : "Guardar foto de perfil"}
      </button>

      {mensaje && <p>{mensaje}</p>}

      {urlImagen && (
        <img
          src={urlImagen}
          alt="Foto de perfil guardada"
          style={{
            display: "block",
            width: "160px",
            height: "160px",
            objectFit: "cover",
            marginTop: "15px",
            borderRadius: "50%",
          }}
        />
      )}
    </section>
  );
};

export default ImageUpload;