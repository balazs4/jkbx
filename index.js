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

  return ({ payload }) => {
    if (payload.file === undefined) {
      log(`Seeking...`);
      player.seek(payload.seek || 5);
      return;
    }
    log(`Message received // Playing...${payload.file}`);
    player.loadFile(payload.file);
  };
};
