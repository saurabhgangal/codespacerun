// ./app/routes/doctor-routes.js
import express from 'express';
import * as doctorController from '../controllers/doctor-controller.js';

const router = express.Router();

// Create a new doctor
router.route('/').post(doctorController.registerDoctor);

// Handle multiple HTTP methods on the same endpoint
router.route('/:id')
  .get(doctorController.viewDoctorInfo)
  .put(doctorController.updateDoctor)
  // .delete(doctorController.deleteDoctor);

router.route('/:id/update-scans').put(doctorController.updateScans);

router.put('/:doctorId/patients/:patientId/remarks', doctorController.updateRemarks);

router.get('/:doctorId/patients/:patientId/info', doctorController.getPatientInfoController);

export default router;
