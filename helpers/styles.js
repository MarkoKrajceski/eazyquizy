import { StyleSheet, } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inline: {
    display: "inline",
  },
  buttonTextSmall: {
    fontSize: 11,
    fontWeight: "700",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: 200,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: 'rgb(0,0,0, 0.5)',
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    borderTopStartRadius: 80,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 80,
  },
  cardsText: {
    fontSize: 22,
  },
});
