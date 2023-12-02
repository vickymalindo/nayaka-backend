import { check } from 'express-validator';

export const employeeValidator = () => {
  return [
    check('firstname').not().isEmpty().withMessage('firstname is required'),
    check('middlename').not().isEmpty().withMessage('middlename is required'),
    check('lastname').not().isEmpty().withMessage('lastname is required'),
    check('birthdate').not().isEmpty().withMessage('birthdate is required'),
    check('age')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('age is required or must be number'),
    check('sex').not().isEmpty().withMessage('sex is required'),
    check('address').not().isEmpty().withMessage('address is required'),
    check('employed_date')
      .not()
      .isEmpty()
      .withMessage('employed_date is required'),
    check('dept_id')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('dept_id is required or must be number'),
    check('post_id')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('post_id is required or must be number'),
  ];
};
