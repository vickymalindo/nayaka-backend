import { validationResult } from 'express-validator';
import db from '../config/database.js';
import response from '../utils/response.js';

export const getSalaries = (req, res) => {
  db.query('SELECT * FROM salary', (error, result) => {
    if (error) throw new Error(error);

    if (result.length === 0) {
      return response({
        statusCode: 400,
        message: 'Empty salary datas',
        datas: null,
        res,
      });
    }

    response({
      statusCode: 200,
      message: 'Get salaries success',
      datas: result,
      res,
    });
  });
};

export const getSalary = (req, res) => {
  const { id } = req.params;

  db.query(`SELECT * FROM salary WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    response({
      statusCode: 200,
      message: 'Get salary success',
      datas: result,
      res,
    });
  });
};

export const createSalary = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { salary_range, annual_income, loans } = req.body;

  const query =
    'INSERT INTO salary (salary_range, annual_income, loans) VALUES (?, ?, ?)';

  const values = [salary_range, annual_income, loans];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Insert salary success',
        datas: values,
        res,
      });
    }

    return response({
      statusCode: 200,
      message: 'Insert salary failed',
      datas: null,
      res,
    });
  });
};

export const updateSalary = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { id } = req.params;

  const { salary_range, annual_income, loans } = req.body;

  const query = `UPDATE salary SET salary_range = ?, annual_income = ?, loans = ? WHERE id = ${id}`;

  const values = [salary_range, annual_income, loans];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Update salary success',
        datas: values,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Update salary failed',
      datas: null,
      res,
    });
  });
};

export const deleteSalary = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM salary WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Delete salary success',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 200,
      message: 'Delete salary failed',
      datas: null,
      res,
    });
  });
};
