module.exports = {
  apps: [
    {
      name: 'jukebox',
      cwd: '/srv/jukebox/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        BROKER: 'mqtt://localhost:1883'
        ,DEBUG:'*'
      }
    },
    {
      name: 'jukebox-songinfo',
      cwd: '/srv/jukebox-songinfo/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        BROKER: 'mqtt://localhost:1883',
        SONGINFO: 'http://localhost:8080/jukebox/songinfo',
        DEBUG: 'jukebox-songinfo'
      }
    },
    {
      name: 'songinfo',
      cwd: '/srv/songinfo/',
      script: 'npm',
      args: ['run', 'start'],
      env: {
        PORT: 1212,
        DEBUG: 'songinfo',
        CLIENT_ID: '6aa10a7ead854a088f4bc28e66a039fd',
        CLIENT_SECRET: 'ef2f559a03a44b0da44e47276b53d3c3'
      }
    }
  ]
};
