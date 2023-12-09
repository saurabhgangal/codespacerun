import express from 'express';
import * as appointmentController from '../controllers/appointment-controller.js';

const router = express.Router();

router.route('/schedule').post(appointmentController.scheduleAppointment)

router.route('/:id').get(appointmentController.getAppointment)
     
router.route('/update/:id').put(appointmentController.updateAppointment)
     
router.route('/cancel/:id').patch(appointmentController.cancelAppointment)
export default router
