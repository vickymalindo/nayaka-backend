import { check } from 'express-validator';

export const positionValidator = () => {
  return [
    check('position_name')
      .not()
      .isEmpty()
      .withMessage('position_name is required'),
  ];
};
