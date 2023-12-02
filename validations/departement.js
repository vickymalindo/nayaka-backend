import { check } from 'express-validator';

export const departementValidator = () => {
  return [
    check('departement_name')
      .not()
      .isEmpty()
      .withMessage('departement_name is required'),
  ];
};
