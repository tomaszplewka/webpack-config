module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      // settings
      {
        // this option causes that you dont have to import React from react when using only jsx in your files
        runtime: "automatic",
      }
    ],
  ],
};
