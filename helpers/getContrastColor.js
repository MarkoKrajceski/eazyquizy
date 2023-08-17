export default function getContrastColor(bgColor) {
  // Calculate the relative luminance of the background color
  const luminance =
    (parseInt(bgColor.substr(1, 2), 16) * 0.299 +
      parseInt(bgColor.substr(3, 2), 16) * 0.587 +
      parseInt(bgColor.substr(5, 2), 16) * 0.114) /
    255;

  // Choose black or white as the contrast color based on the luminance
  return luminance > 0.5 ? "black" : "white";
}
