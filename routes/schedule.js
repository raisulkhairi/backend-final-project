const express = require("express");
const scheduleRoute = express.Router();
const ScheduleController = require("./../controllers/schedule");

scheduleRoute.post("/", ScheduleController.createNewSchedule);
scheduleRoute.get("/", ScheduleController.getAllSchedule);
// scheduleRoute.put("/:id", ScheduleController.editSubject);
scheduleRoute.delete("/:id", ScheduleController.deleteSchedule);
scheduleRoute.put("/", ScheduleController.updateDragDropSchedule);
// scheduleRoute.get("/:id", ScheduleController.getSubjectByID);

module.exports = scheduleRoute;
