import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.82;

export const COLORS = {
  primary: "#5C6BC0",
  primaryLight: "#E8EAF6",
  background: "#F5F6FA",
  card: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#757575",
  success: "#43A047",
  danger: "#E53935",
  border: "#EEEEEE",
  white: "#FFFFFF",
};

export default StyleSheet.create({
  // ── Containers ───────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  listBackground: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },

  // ── Picker rows ──────────────────────────────────────────
  pickerRow: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  pickerRowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  pickerRowSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // ── Action buttons ───────────────────────────────────────
  button: {
    marginVertical: 7,
    height: 52,
    width: width * 0.8,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  buttonTextSecondary: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  // ── Card ─────────────────────────────────────────────────
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: CARD_WIDTH,
    minHeight: CARD_WIDTH,
    borderTopStartRadius: 40,
    borderTopEndRadius: 16,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 40,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.textPrimary,
    lineHeight: 30,
  },
  cardHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 16,
    textAlign: "center",
    fontStyle: "italic",
  },

  // ── Status / loading ─────────────────────────────────────
  statusContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cardsText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  statusSubText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },

  // ── Score screen ─────────────────────────────────────────
  scoreBig: {
    fontSize: 72,
    fontWeight: "800",
    color: COLORS.primary,
    lineHeight: 80,
  },
  scoreOf: {
    fontSize: 20,
    color: COLORS.textSecondary,
    fontWeight: "600",
    marginBottom: 6,
  },
  scoreMessage: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 32,
  },

  // ── Legacy aliases ────────────────────────────────────────
  buttonContainer: { alignItems: "center" },
  buttonTextSmall: { fontSize: 15, fontWeight: "600", color: COLORS.textPrimary },
  inline: { flexDirection: "row" },
});
