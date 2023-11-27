// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.tsx', // Adjust the path
  output: {
    file: 'dist/bundle.js', // Adjust the output path and filename
    format: 'cjs',
  },
  plugins: [
    typescript(),
    terser(),
  ],
};
