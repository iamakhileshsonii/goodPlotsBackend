import mongoose from "mongoose";

const scheduleAppointmentSchema = new mongoose.Schema(
  {
    appointmentBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    appointmentWith: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
  },
  { timestamps: true }
);

export const ScheduleAppointment = mongoose.model(
  "ScheduleAppointment",
  scheduleAppointmentSchema
);
