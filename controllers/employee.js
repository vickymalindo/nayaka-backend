import { validationResult } from 'express-validator';
import db from '../config/database.js';
import response from './../utils/response.js';

export const getEmployees = (req, res) => {
  db.query(
    `SELECT employee.firstname, employee.middlename, employee.lastname, employee.birthdate, employee.age, employee.sex, employee.address, employee.employed_date, departement.departement_name, position.position_name FROM employee INNER JOIN departement ON employee.dept_id = departement.id INNER JOIN position ON employee.post_id = position.id`,
    (err, result) => {
      if (err) throw new Error(err);

      if (result.length === 0) {
        return response({
          statusCode: 400,
          message: 'Empty employee datas',
          datas: null,
          res,
        });
      }

      response({
        statusCode: 200,
        message: 'Success get employees',
        datas: result,
        res,
      });
    }
  );
};

export const getEmployee = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, employee.birthdate, employee.age, employee.sex, employee.address, employee.employed_date, departement.departement_name, position.position_name FROM employee INNER JOIN departement ON employee.dept_id = departement.id INNER JOIN position ON employee.post_id = position.id WHERE employee.id = ${id}`,
    (err, result) => {
      if (err) throw new Error(err);
      response({
        statusCode: 200,
        message: 'Success get employee',
        datas: result,
        res,
      });
    }
  );
};

export const getEmployeeSalary = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, employee.birthdate, employee.age, employee.sex, employee.address, employee.employed_date, salary.annual_income, salary.loans, (salary.annual_income - salary.loans) AS salary_per_person FROM employee INNER JOIN salary ON employee.id = salary.id WHERE employee.id = ${id}`,
    (error, result) => {
      if (error) throw new Error(err);
      response({
        statusCode: 200,
        message: 'Success get employee salary',
        datas: result,
        res,
      });
    }
  );
};

export const getEmployeeTraining = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, training.skills, training.trainer, training.project FROM employee INNER JOIN training ON employee.id = training.id WHERE employee.id = ${id}`,
    (error, result) => {
      if (error) throw new Error(err);
      response({
        statusCode: 200,
        message: 'Success get employee training',
        datas: result,
        res,
      });
    }
  );
};

export const createEmployee = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const {
    firstname,
    middlename,
    lastname,
    birthdate,
    age,
    sex,
    address,
    employed_date,
    dept_id,
    post_id,
  } = req.body;

  const query =
    'INSERT INTO employee (firstname, middlename, lastname, birthdate, age, sex, address, employed_date, dept_id, post_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [
    firstname,
    middlename,
    lastname,
    birthdate,
    age,
    sex,
    address,
    employed_date,
    dept_id,
    post_id,
  ];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows)
      return response({
        statusCode: 200,
        message: 'Insert employee success',
        datas: result.insertId,
        res,
      });

    return response({
      statusCode: 400,
      message: 'Insert employee failed',
      datas: null,
      res,
    });
  });
};

export const updateEmployee = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { id } = req.params;

  const {
    firstname,
    middlename,
    lastname,
    birthdate,
    age,
    sex,
    address,
    employed_date,
    dept_id,
    post_id,
  } = req.body;

  const query = `UPDATE employee SET firstname = ?, middlename = ?, lastname = ?, birthdate = ?, age = ?, sex = ?, address = ?, employed_date = ?, dept_id = ?, post_id = ? WHERE id = ${id}`;

  const values = [
    firstname,
    middlename,
    lastname,
    birthdate,
    age,
    sex,
    address,
    employed_date,
    dept_id,
    post_id,
  ];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Update employee success',
        datas: values,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Update employee failed',
      datas: null,
      res,
    });
  });
};

export const deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM employee WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Delete employee success',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Delete employee failed',
      datas: null,
      res,
    });
  });
};
