module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: false,
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
