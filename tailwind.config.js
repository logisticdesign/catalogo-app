module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [],
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
