const express = require("express");
const scheduleRoute = express.Router();
const ScheduleController = require("./../controllers/schedule");

scheduleRoute.get("/tempSchedule", ScheduleController.getTempSchedule);
scheduleRoute.post("/", ScheduleController.createNewSchedule);
scheduleRoute.get("/", ScheduleController.getAllSchedule);
scheduleRoute.put("/editEvent/:id", ScheduleController.editScheduleByID);
scheduleRoute.delete("/:id", ScheduleController.deleteSchedule);
scheduleRoute.put("/", ScheduleController.updateDragDropSchedule);
scheduleRoute.get("/:id", ScheduleController.getScheduleByID);
module.exports = scheduleRoute;
