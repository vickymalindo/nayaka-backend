import db from '../config/database.js';
import response from './../utils/response.js';

export const getKaryawan = (req, res) => {
  db.query('SELECT * FROM karyawan', (error, result) => {
    if (error) throw new Error(error);

    response({
      statusCode: 200,
      message: 'Get karyawan success',
      datas: result,
      res,
    });
  });
};
