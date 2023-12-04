import express from 'express';
import {
  createDepartement,
  deleteDepartement,
  getDepartement,
  getDepartements,
  updateDepartement,
} from '../controllers/departement.js';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployeeNotInTraining,
  getEmployeeSalary,
  getEmployeeTraining,
  getEmployees,
  updateEmployee,
} from '../controllers/employee.js';
import { getKaryawan } from '../controllers/karyawan.js';
import {
  createPosition,
  deletePosition,
  getPosition,
  getPositions,
  updatePosition,
} from '../controllers/position.js';
import {
  createSalary,
  deleteSalary,
  getSalaries,
  getSalary,
  updateSalary,
} from '../controllers/salary.js';
import {
  createTraining,
  deleteTraining,
  getTraning,
  getTranings,
  udpateTraining,
} from '../controllers/training.js';
import { departementValidator } from '../validations/departement.js';
import { employeeValidator } from '../validations/employee.js';
import { positionValidator } from '../validations/position.js';
import { salaryValidator } from '../validations/salary.js';
import { trainingValidator } from '../validations/training.js';

const router = express.Router();

router.get('/employee', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/employee', ...employeeValidator(), createEmployee);
router.put('/employee/:id', ...employeeValidator(), updateEmployee);
router.delete('/employee/:id', deleteEmployee);
router.get('/employee/salary/:id', getEmployeeSalary);
router.get('/employee/train/:id', getEmployeeTraining);
router.get('/employee/train', getEmployeeNotInTraining);

router.get('/departement', getDepartements);
router.get('/departement/:id', getDepartement);
router.post('/departement', ...departementValidator(), createDepartement);
router.put('/departement/:id', ...departementValidator(), updateDepartement);
router.delete('/departement/:id', deleteDepartement);

router.get('/position', getPositions);
router.get('/position/:id', getPosition);
router.post('/position', ...positionValidator(), createPosition);
router.put('/position/:id', ...positionValidator(), updatePosition);
router.delete('/position/:id', deletePosition);

router.get('/salary', getSalaries);
router.get('/salary/:id', getSalary);
router.post('/salary', ...salaryValidator(), createSalary);
router.put('/salary/:id', ...salaryValidator(), updateSalary);
router.delete('/salary/:id', deleteSalary);

router.get('/train', getTranings);
router.get('/train/:id', getTraning);
router.post('/train', ...trainingValidator(), createTraining);
router.put('/train/:id', ...trainingValidator(), udpateTraining);
router.delete('/train/:id', deleteTraining);

router.get('/karyawan', getKaryawan);

export default router;
