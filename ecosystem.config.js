module.exports = {
  apps: [
    {
      name: 'xrpl-bridge-track',
      script: './dist/main.js',
      instances: 1,
    },
  ],
};
