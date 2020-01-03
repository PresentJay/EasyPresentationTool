
import builder from "@daybrush/builder";
const commonjs = require("rollup-plugin-commonjs");
const cjs = commonjs({
    namedExports: {
        "node_modules/shallowequal/index.js": undefined,
    },
})

const defaultConfig = {
    tsconfig: "tsconfig.build.json",
    input: "src/PureProps.tsx",
    exports: "default",
    plugins: [cjs],
    external: {
        "react": "react",
    },
    resolve: true,
};

export default builder([
    {
        ...defaultConfig,
        output: "./dist/pure-props.esm.js",
        format: "es",
    },
    {
        ...defaultConfig,
        output: "./dist/pure-props.cjs.js",
        format: "cjs",
    },
]);
