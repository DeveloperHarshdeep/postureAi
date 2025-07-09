import { evaluatePosture } from '../services/postureRules.js';

const socketHandler = (socket) => {
  socket.on('start-detection', () => {
    console.log('Detection started');
  });

  socket.on('frame', ({ keypoints, mode }) => {
    const result = evaluatePosture(keypoints, mode);

    socket.emit('posture-feedback', {
      status: result.status,
      score: result.score,
      keypoints,
      instructions: result.instructions
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};

export default socketHandler;
