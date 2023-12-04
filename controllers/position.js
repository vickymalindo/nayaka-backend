import { validationResult } from 'express-validator';
import db from '../config/database.js';
import response from '../utils/response.js';

export const getPositions = (req, res) => {
  db.query('SELECT * FROM position', (error, result) => {
    if (error) throw new Error(error);

    if (result.length === 0) {
      return response({
        statusCode: 400,
        message: 'Empty position datas',
        datas: null,
        res,
      });
    }

    response({
      statusCode: 200,
      message: 'Success get positions',
      datas: result,
      res,
    });
  });
};

export const getPosition = (req, res) => {
  const { id } = req.params;

  db.query(`SELECT * FROM position WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    response({
      statusCode: 200,
      message: 'Success get position',
      datas: result,
      res,
    });
  });
};

export const createPosition = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { position_name } = req.body;

  const query = 'INSERT INTO position (position_name) VALUES (?)';

  const value = [position_name];

  db.query(query, value, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Insert position success',
        datas: req.body,
        res,
      });
    }
    return response({
      statusCode: 400,
      message: 'Insert position failed',
      datas: null,
      res,
    });
  });
};

export const updatePosition = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { id } = req.params;

  const { position_name } = req.body;

  const query = `UPDATE position SET position_name = ? WHERE id = ${id}`;

  const values = [position_name];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows)
      return response({
        statusCode: 200,
        message: 'Update position success',
        datas: values,
        res,
      });

    return response({
      statusCode: 400,
      message: 'Update position failed',
      datas: null,
      res,
    });
  });
};

export const deletePosition = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM position WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Delete position success',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Delete position failed',
      datas: null,
      res,
    });
  });
};
