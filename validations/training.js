import { check } from 'express-validator';

export const trainingValidator = () => {
  return [
    check('skills').not().isEmpty().withMessage('skills is required'),
    check('trainer').not().isEmpty().withMessage('trainer is required'),
    check('project').not().isEmpty().withMessage('project is required'),
  ];
};
