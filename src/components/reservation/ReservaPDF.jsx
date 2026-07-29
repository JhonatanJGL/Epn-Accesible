import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#0067b1",
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#0067b1",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 11,
    textAlign: "center",
    color: "#555555",
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    color: "#222222",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },

  label: {
    width: "35%",
    fontWeight: "bold",
    color: "#444444",
  },

  value: {
    width: "65%",
    color: "#111111",
  },

  footer: {
    marginTop: 35,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    fontSize: 9,
    textAlign: "center",
    color: "#777777",
  },
});

const valorSeguro = (valor) => {
  if (valor === null || valor === undefined || valor === "") {
    return "No registrado";
  }

  return String(valor);
};

const ReservaPDF = ({ reserva }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Comprobante de reserva</Text>
          <Text style={styles.subtitle}>
            Sistema EPN Accesible
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Información de la reserva
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Código:</Text>
            <Text style={styles.value}>
              {valorSeguro(reserva?.id)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Espacio:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.espacio ||
                reserva?.nombreEspacio ||
                reserva?.espacioNombre
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.tipo ||
                reserva?.tipoEspacio ||
                reserva?.categoria
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>
              {valorSeguro(reserva?.fecha)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Hora de inicio:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.inicio ||
                reserva?.horaInicio
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Hora de fin:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.fin ||
                reserva?.horaFin
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.usuarioNombre ||
                reserva?.nombreUsuario
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>
              {valorSeguro(
                reserva?.usuarioCorreo ||
                reserva?.correo
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>
              {valorSeguro(reserva?.estado || "Activa")}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Este documento confirma la reserva registrada en EPN Accesible.
        </Text>
      </Page>
    </Document>
  );
};

export default ReservaPDF;