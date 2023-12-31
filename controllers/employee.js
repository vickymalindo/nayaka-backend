import { validationResult } from 'express-validator';
import db from '../config/database.js';
import response from './../utils/response.js';

export const getEmployees = (req, res) => {
  db.query(`SELECT * FROM employee`, (err, result) => {
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
  });
};

export const getEmployee = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, employee.birthdate, employee.age, employee.sex, employee.address, employee.employed_date, departement.departement_name, position.position_name, salary.salary_range, salary.annual_income, salary.loans, training.skills, training.trainer, training.project FROM employee INNER JOIN departement ON employee.dept_id = departement.id INNER JOIN position ON employee.post_id = position.id INNER JOIN salary ON employee.id = salary.employee_id INNER JOIN training ON employee.id = training.employee_id WHERE employee.id = ${id}`,
    (err, result) => {
      if (err) throw new Error(err);

      if (result.length) {
        return response({
          statusCode: 200,
          message: 'Success get employee',
          datas: result,
          res,
        });
      }

      return response({
        statusCode: 400,
        message: 'Failed get employee',
        datas: null,
        res,
      });
    }
  );
};

export const getEmployeeSalary = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, employee.birthdate, employee.age, employee.sex, employee.address, employee.employed_date, salary.annual_income, salary.loans, (salary.annual_income - salary.loans) AS salary_per_person FROM employee INNER JOIN salary ON employee.id = salary.employee_id WHERE employee.id = ${id}`,
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
    `SELECT employee.id, employee.firstname, employee.middlename, employee.lastname, training.skills, training.trainer, training.project FROM employee INNER JOIN training ON employee.id = training.employee_id WHERE employee.id = ${id}`,
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
    salary_range,
    annual_income,
    loans,
    skills,
    trainer,
    project,
  } = req.body;

  const queryEmp =
    'INSERT INTO employee (firstname, middlename, lastname, birthdate, age, sex, address, employed_date, dept_id, post_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const querySalary = `INSERT INTO salary (salary_range, annual_income, loans, employee_id) VALUES (?, ?, ?, ?)`;

  const queryTraining = `INSERT INTO training (skills, trainer, project, employee_id) VALUES (?, ?, ?, ?)`;

  const valuesEmp = [
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

  db.query(queryEmp, valuesEmp, (errorEmp, resultEmp) => {
    if (errorEmp) throw new Error(errorEmp);
    const { insertId } = resultEmp;
    const valuesSalary = [salary_range, annual_income, loans, insertId];
    const valuesTraining = [skills, trainer, project, insertId];

    if (!resultEmp.affectedRows) {
      return response({
        statusCode: 400,
        message: 'Insert employee failed',
        datas: null,
        res,
      });
    }

    db.query(querySalary, valuesSalary, (errorSalary, resultSalary) => {
      if (errorSalary) throw new Error(errorSalary);

      if (!resultSalary.affectedRows) {
        return response({
          statusCode: 400,
          message: 'Insert salary failed',
          datas: null,
          res,
        });
      }
    });

    db.query(queryTraining, valuesTraining, (errorTrain, resultTrain) => {
      if (errorTrain) throw new Error(errorTrain);

      if (!resultTrain.affectedRows) {
        return response({
          statusCode: 400,
          message: 'Insert salary failed',
          datas: null,
          res,
        });
      }

      return response({
        statusCode: 200,
        message: 'Insert employee success',
        datas: req.body,
        res,
      });
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
    salary_range,
    annual_income,
    loans,
    skills,
    trainer,
    project,
  } = req.body;

  const queryEmp = `UPDATE employee SET firstname = ?, middlename = ?, lastname = ?, birthdate = ?, age = ?, sex = ?, address = ?, employed_date = ?, dept_id = ?, post_id = ? WHERE id = ${id}`;

  const querySalary = `UPDATE salary SET salary_range = ?, annual_income = ?, loans = ? WHERE employee_id = ${id}`;

  const queryTraining = `UPDATE training SET skills = ?, trainer = ?, project = ? WHERE employee_id = ${id}`;

  const valuesEmp = [
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

  const valuesSalary = [salary_range, annual_income, loans];

  const valuesTraining = [skills, trainer, project];

  db.query(queryEmp, valuesEmp, (errorEmp, resultEmp) => {
    if (errorEmp) throw new Error(errorEmp);

    if (!resultEmp.affectedRows) {
      return response({
        statusCode: 400,
        message: 'Update employee failed',
        datas: null,
        res,
      });
    }

    db.query(querySalary, valuesSalary, (errorSalary, resultSalary) => {
      if (errorSalary) throw new Error(errorSalary);

      if (!resultSalary.affectedRows) {
        return response({
          statusCode: 400,
          message: 'Update salary failed',
          datas: null,
          res,
        });
      }
    });

    db.query(queryTraining, valuesTraining, (errorTrain, resultTrain) => {
      if (errorTrain) throw new Error(errorTrain);

      if (!resultTrain.affectedRows) {
        return response({
          statusCode: 400,
          message: 'Update employed failed',
          datas: null,
          res,
        });
      }

      return response({
        statusCode: 200,
        message: 'Update employee success',
        datas: req.body,
        res,
      });
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

export const getEmployeeNotInTraining = (req, res) => {
  db.query(
    `SELECT id, CONCAT(firstname,' ', middlename,' ', lastname) AS fullname FROM employee WHERE id NOT IN (SELECT employee_id FROM training)`,
    (error, result) => {
      if (error) throw new Error(error);

      return response({
        statusCode: 200,
        message: 'Delete employee success',
        datas: result,
        res,
      });
    }
  );
};
