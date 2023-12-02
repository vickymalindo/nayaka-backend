import db from './../config/database.js';
import response from '../utils/response.js';
import { validationResult } from 'express-validator';

export const getTranings = (req, res) => {
  db.query('SELECT * FROM  training', (error, result) => {
    if (error) throw new Error(error);

    if (result.length === 0) {
      return response({
        statusCode: 400,
        message: 'Empty training datas',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 200,
      message: 'Get trainings success',
      datas: result,
      res,
    });
  });
};

export const getTraning = (req, res) => {
  const { id } = req.params;

  db.query(`SELECT * FROM training WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    return response({
      statusCode: 200,
      message: 'Get training success',
      datas: result,
      res,
    });
  });
};

export const createTraining = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { skills, trainer, project } = req.body;

  const query =
    'INSERT INTO training (skills, trainer, project) VALUES (?, ?, ?)';

  const values = [skills, trainer, project];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Insert training success',
        datas: values,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Insert training failed',
      datas: null,
      res,
    });
  });
};

export const udpateTraining = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  const { id } = req.params;

  const { skills, trainer, project } = req.body;

  const query = `UPDATE training SET skills = ?, trainer = ?, project = ? WHERE id = ${id}`;

  const values = [skills, trainer, project];

  db.query(query, values, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Update training success',
        datas: values,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Update training failed',
      datas: null,
      res,
    });
  });
};

export const deleteTraining = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM training WHERE id = ${id}`, (error, result) => {
    if (error) throw new Error(error);

    if (result.affectedRows) {
      return response({
        statusCode: 200,
        message: 'Delete training success',
        datas: null,
        res,
      });
    }

    return response({
      statusCode: 400,
      message: 'Delete training failed',
      datas: null,
      res,
    });
  });
};
