import json from "@rollup/plugin-json";

export default {
    input: "src/jukebox-api.js",
    output: [{
        file: "dist/jukebox.js",
        format: "iife",
        globals: {}
    }],
    plugins: [json()]
}
