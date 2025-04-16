module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}", "./views/**/*.html"],
  theme: {
    extend: {
      boxShadow: {
        brutal: "6px 6px 0 0 black", // ombre dure noire, décalée
        brutalTeal: "6px 6px 0 0 #2dd4bf", // variante colorée
        brutalOutline: "4px 4px 0 0 black, 6px 6px 0 0 white", // ombre dure noire avec contour
      },
    },
  },
  plugins: [],
};