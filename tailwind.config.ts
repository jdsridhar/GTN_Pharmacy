// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'brand-red': '#B1040E', // This is the red from the Stanford site
//         'brand-sand': '#F9F6F2', // If you need the light background color
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

        // Global Primary Color Palette - Change here to update entire website
             colors: {
        primary: "#1e2f5c",
        "primary-dark": "#18264a",
        "primary-darker": "#121c36",
        "primary-light": "#3a4b7a",
        "primary-hover": "#2b3e6dff",
        "primary-foreground": "#ffffff",
   
// White text on primary color

        // Semantic color names (alias to primary)
        'brand': 'rgb(var(--color-primary) / <alpha-value>)',
      },
      // fontFamily: {
      //   sans: ['"Source Sans Pro"', 'sans-serif'], // 👈 Makes it the default sans-serif font
      //   // OR if you want a custom name:
      //   // 'source-sans': ['"Source Sans Pro"', 'sans-serif'],
      // },
//       fontFamily: {
//   sans: ['"Source Sans Pro"', 'sans-serif'],
//   serif: ['"Crimson Text"', 'serif'], // Stanford-style serif font
// },
fontFamily: {
  sans: ['Inter', 'sans-serif'],
},


    },
  },
  plugins: [],
};