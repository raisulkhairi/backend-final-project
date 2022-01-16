const express = require("express");
const scheduleRoute = express.Router();
const ScheduleController = require("./../controllers/schedule");

scheduleRoute.get("/tempSchedule", ScheduleController.getTempSchedule);
scheduleRoute.get("/byTeacher/:id", ScheduleController.getScheduleByTeacher);
scheduleRoute.get("/byStudent/:id", ScheduleController.getScheduleByStudent);
scheduleRoute.get("/", ScheduleController.getAllSchedule);
scheduleRoute.get("/:id", ScheduleController.getScheduleByID);
scheduleRoute.post("/", ScheduleController.createNewSchedule);
scheduleRoute.put("/editEvent/:id", ScheduleController.editScheduleByID);
scheduleRoute.delete("/:id", ScheduleController.deleteSchedule);
scheduleRoute.put("/", ScheduleController.updateDragDropSchedule);

module.exports = scheduleRoute;
