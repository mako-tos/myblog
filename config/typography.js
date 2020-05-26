import Typography from 'typography';

export const typography = new Typography({
  title: 'Step by Step',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: [
    'Kosugi',
    '-apple-system',
  ],
  bodyFontFamily: [
    'Noto Sans JP',
    '-apple-system',
  ],
  googleFonts: [
    {
      name: 'Kosugi',
      styles: ['700'],
    },
    {
      name: 'Noto Sans JP',
      styles: ['400'],
    },
  ],
  headerWeight: 500,
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}
export default typography;
