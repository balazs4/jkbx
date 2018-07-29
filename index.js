const mpv = require('node-mpv');
const log = require('debug')('jukebox');

module.exports = ({ publish }) => {
  const player = new mpv(
    {
      audio_only: true,
      socket: '/tmp/jukebox.sock',
      time_update: 1,
      verbose: false
    },
    ['--no-ytdl', '--cache-file=TMP']
  );

  player.on('stopped', () => {
    log(`Stopped`);
  });

  player.on('statuschange', async status => {
    log(`outgoing message: ${JSON.stringify(status)}`);
    await publish('/jukebox/status', status);
  });

  player.observeProperty('metadata', 42);
  player.unobserveProperty(3);

  return ({ payload }) => {
    log(`incoming message: ${JSON.stringify(payload)}`);
    const { command, args } = payload;
    if (!command) {
      log(`The '${command}' command is falsy...ignore it!`);
      return;
    }
    player.command(command, args);
  };
};
