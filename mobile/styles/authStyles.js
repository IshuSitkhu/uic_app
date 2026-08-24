import { StyleSheet } from "react-native";

const PRIMARY = "#4D3C78";
const SECONDARY = "#755DB0";
const PRIMARY_LIGHT = "#FCEBEC";
const BACKGROUND = "#F8F8FA";

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  topSection: {
    height: 205,
    backgroundColor:PRIMARY,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",

    // borderBottomLeftRadius: 32,
    // borderBottomRightRadius: 32,
  },

  brandText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 38,
    opacity: 0.95,
    letterSpacing: 0.3,
  },

  logoCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#FFFFFF",

    position: "absolute",
    bottom: -54,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 5,
    borderColor: "#F8F8FA",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 6,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  headingSection: {
    alignItems: "center",
    marginTop: 75,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1D1D1F",
    letterSpacing: -0.5,
    textAlign: "center",
  },

  redText: {
    color: PRIMARY,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 9,
    fontSize: 14,
    color: "#85858A",
    textAlign: "center",
    lineHeight: 21,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "52%",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor:SECONDARY ,
    marginHorizontal: 10,
  },

  form: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,

    elevation: 2,
  },

  inputContainer: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#55555A",
  },

  inputWrapper: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F8F8FA",

    borderWidth: 1,
    borderColor: "#ECECEF",
    borderRadius: 14,

    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222222",
  },

  button: {
    height: 54,
    backgroundColor: PRIMARY,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,

    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,

    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.88,
    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  text: {
    fontSize: 14,
    color: "#85858A",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 22,
  },
});

export default authStyles;
