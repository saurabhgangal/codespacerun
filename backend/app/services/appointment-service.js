import Appointment from '../models/appointment.js'
import mongoose from 'mongoose'

export const search = async (id) => {
    const appointments = await Appointment.findOne({appointmentID : id}).exec()
    return appointments
}

export const update = async (updatedAppointment, id) => {
    // try{


        const appointment = await Appointment.findOneAndUpdate({appointmentID : id}, updatedAppointment).exec()
        console.log("appointment", appointment)
        // if (!appointment) {
        //     throw new Error('Appointment not found');
        //   }
        return appointment
    // }
    // catch(error){
    //     console.log(error)
    // }
}

export const save = async (newAppointment) => {
    const appointment = new Appointment(newAppointment)
    return appointment.save()
}

export const remove = async (id, body) => {
    await Appointment.updateOne(
        {appointmentID: id},
        {$set : body}
        ).exec()
}
