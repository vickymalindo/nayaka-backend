import { validationResult } from 'express-validator';
import db from '../config/database.js';
import response from '../utils/response.js';

export const getDepartements = (req, res) => {
  db.query('SELECT * FROM departement', (error, result) => {
    if (error) throw new Error(error);

    response({
      statusCode: 200,
      message: 'Success get departements',
      datas: result,
      res,
    });
  });
};

export const getDepartement = (req, res) => {
  const { id } = req.params;

  db.query(`SELECT * FROM departement WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    response({
      statusCode: 200,
      message: 'Success get departement',
      datas: result,
      res,
    });
  });
};

export const createDepartement = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { departement_name } = req.body;

  const query = 'INSERT INTO departement (departement_name) VALUES (?)';

  const value = [departement_name];

  db.query(query, value, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows)
      return response({
        statusCode: 200,
        message: 'Insert departement success',
        datas: value,
        res,
      });

    return response({
      statusCode: 400,
      message: 'Insert departement failed',
      datas: null,
      res,
    });
  });
};

export const updateDepartement = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { id } = req.params;

  const { departement_name } = req.body;

  const query = `UPDATE departement SET departement_name = ? WHERE id = ${id}`;

  const value = [departement_name];

  db.query(query, value, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows)
      return response({
        statusCode: 200,
        message: 'Update departement success',
        datas: value,
        res,
      });

    return response({
      statusCode: 400,
      message: 'Update departement failed',
      datas: null,
      res,
    });
  });
};

export const deleteDepartement = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM departement WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Delete departement success',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Delete departement failed',
      datas: null,
      res,
    });
  });
};
