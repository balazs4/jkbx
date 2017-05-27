const mpv = require('node-mpv');
const log = require('debug')('jkbx');

module.exports = ({ publish }) => {
  const player = new mpv({
    audio_only: true,
    socket: 'jkbx.sock',
    time_update: 1,
    verbose: false
  });

  player.on('stopped', () => {
    log(`Stopped`);
  });

  player.on('statuschange', async status => {
    await publish('/jkbx/status', status);
  });

  player.observeProperty('metadata', 42);

  return ({ payload }) => {
    log(`Playing...${payload.file}`);
    player.loadFile(payload.file);
  };
};
