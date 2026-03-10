const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const { terser } = require("rollup-plugin-terser");
const fs = require("node:fs");
const path = require("node:path");

const copyStyles = () => ({
  name: "copy-styles",
  buildEnd() {
    const outDir = path.resolve("dist/styles");
    fs.mkdirSync(outDir, { recursive: true });
    fs.copyFileSync("src/styles/base.css", path.join(outDir, "base.css"));
    fs.copyFileSync(
      "src/styles/bootstrap.css",
      path.join(outDir, "bootstrap.css")
    );
  },
});

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "ReactSuperSelect",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-window": "ReactWindow",
      },
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
    copyStyles(),
  ],
};

