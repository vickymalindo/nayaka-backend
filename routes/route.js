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
  getEmployees,
  updateEmployee,
} from '../controllers/employee.js';
import {
  createPosition,
  deletePosition,
  getPosition,
  getPositions,
  updatePosition,
} from '../controllers/position.js';
import { departementValidator } from '../validations/departement.js';
import { employeeValidator } from '../validations/employee.js';
import { positionValidator } from '../validations/position.js';

const router = express.Router();

router.get('/employee', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/employee', ...employeeValidator(), createEmployee);
router.put('/employee/:id', ...employeeValidator(), updateEmployee);
router.delete('/employee/:id', deleteEmployee);

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

export default router;
