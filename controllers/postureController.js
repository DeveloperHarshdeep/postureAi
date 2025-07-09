import { evaluatePosture } from '../services/postureRules.js';

export const processKeypoints = (keypoints, mode) => {
  return evaluatePosture(keypoints, mode);
};
