module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "@babel/preset-typescript", // Adicione o preset TypeScript
    ],
    plugins: ["expo-router/babel"],
  };
};
