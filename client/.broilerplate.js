const path = require("path");
const util = require("util");
const {
  pipe,
  empty,
  ensureFiles,
  defaultFeatures,
  defaultPaths,
  defaultBaseConfig,
  mergeOptions,
  addFeatures,
  compile,
  override,
  run,
  removeFeature,
  toJS
} = require("@dr-kobros/broilerplate");

const postCssFeature = require("@dr-kobros/broilerplate-postcss");
const nodeExternalsFeature = require("@dr-kobros/broilerplate/lib/features/nodeExternalsFeature");
const externalCssFeature = require("@dr-kobros/broilerplate/lib/features/externalCssFeature");
const extractCssFeature = require("@dr-kobros/broilerplate-mini-css-extract");
const styledComponentsFeature = require("@dr-kobros/broilerplate-styled-components");
// const legacyFeature = require("./src/config/legacy");

const dotenv = require("dotenv");
dotenv.config();

const { Map } = require("immutable");

module.exports = target => {
  const env = process.env.NODE_ENV;

  const config = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    mergeOptions(
      Map({
        debug: env === "development" ? true : false
      })
    ),
    defaultFeatures,
    removeFeature("uglifyFeature"),
    addFeatures(
      postCssFeature(),
      styledComponentsFeature(),
      // legacyFeature(),
      externalCssFeature(),
      extractCssFeature(),
      nodeExternalsFeature({
        whitelist: []
      })
    ),
    build => {
      if (env === "production") {
        return build;
      }
      return build.setIn(["base", "devtool"], "cheap-module-eval-source-map");
    },
    ensureFiles(false),
    compile(env, target),
    override(path.join(__dirname, "./src/config/overrides")),
    run,
    toJS
  )(Map());

  // console.log("config", util.inspect(config, { depth: 666 }));
  // process.exit();

  return config;
};
