module.exports = {
  apps: [
    {
      script: './src/server.js',
      watch: '.',
      exec_mode: 'cluster',
    },
  ],
};
