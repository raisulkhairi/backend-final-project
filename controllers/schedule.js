const scheduleModel = require("../models/schedule");

class ScheduleController {
  static async createNewSchedule(req, res, next) {
    const {
      kelas,
      title,
      daysOfWeek,
      start,
      startTime,
      endTime,
      end,
      color,
      allDay,
    } = req.body;
    let result;

    try {
      if (daysOfWeek) {
        result = await scheduleModel.create({
          kelas,
          title,
          daysOfWeek,
          start,
          startTime,
          endTime,
          end,
          color,
          allDay,
        });
      } else {
        result = await scheduleModel.create({
          kelas,
          title,
          daysOfWeek: null,
          start,
          startTime,
          endTime,
          end,
          color,
          allDay,
        });
      }
      if (!result) {
        return res.status(404).send("the schedule cannot be created");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllSchedule(req, res, next) {
    try {
      const result = await scheduleModel.find();

      if (!result) {
        return res.status(404).send("the schedule cannot be showed");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  static async getScheduleByID(req, res, next) {
    const { id } = req.params;
    try {
      const schedule = await scheduleModel.findById(id);
      if (!schedule) {
        return res.status(500).json({ success: false });
      }
      res.send(schedule);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    const { id } = req.params;
    try {
      const result = await scheduleModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("the schedule cannot be deleted");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  // For Event
  static async updateDragDropSchedule(req, res, next) {
    try {
      const arrSchedule = req.body;
      arrSchedule.forEach(async (element) => {
        await scheduleModel.findOneAndUpdate(
          { _id: element.id },
          {
            title: element.title,
            start: element.start,
            end: element.end,
            color: element.color,
          }
        );
      });
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  static async editScheduleByID(req, res, next) {
    const { id } = req.params;
    const { title, color } = req.body;

    try {
      const result = await scheduleModel.findOneAndUpdate(
        { _id: id },
        {
          title,
          color,
        },
        {
          new: true,
        }
      );
      if (!result) {
        return res.status(404).send("the schedule cannot be edited");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTempSchedule(req, res, next) {
    try {
      let filter1 = {};
      let filter2 = {};
      if (req.query.schedule) {
        filter1 = { kelas: req.query.schedule.split(",") };
        filter2 = { kelas: { $exists: false } };
      }
      const scheduleList = await scheduleModel.find({
        $or: [filter1, filter2],
      });
      if (!scheduleList) {
        res.status(500).json({ success: false });
      }
      res.status(201).json(scheduleList);
    } catch (error) {}
  }
}

module.exports = ScheduleController;
