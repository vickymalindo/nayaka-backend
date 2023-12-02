import { check } from 'express-validator';

export const salaryValidator = () => {
  return [
    check('salary_range')
      .not()
      .isEmpty()
      .withMessage('salary_range is required'),
    check('annual_income')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('annual_income is required'),
    check('loans').not().isEmpty().isInt().withMessage('loans is required'),
  ];
};
