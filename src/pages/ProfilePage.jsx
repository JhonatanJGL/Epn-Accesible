import ImageUpload from "../components/imageUpload/ImageUpload";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const { user, perfil } = useAuth();

  return (
    <main className="main-content">
      <section className="section profile-section">
        <h2 className="section-title">Mi perfil</h2>

        <div>
          <p>
            <strong>Nombre:</strong>{" "}
            {`${perfil?.nombre || ""} ${perfil?.apellido || ""}`.trim() ||
              "Usuario"}
          </p>

          <p>
            <strong>Correo:</strong> {user?.email}
          </p>
        </div>

        <ImageUpload />
      </section>
    </main>
  );
};

export default ProfilePage;