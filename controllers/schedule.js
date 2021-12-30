const scheduleModel = require("../models/schedule");

class ScheduleController {
  static async createNewSchedule(req, res, next) {
    const { title, start, end, allDay } = req.body;
    try {
      const result = await scheduleModel.create({
        title,
        start,
        end,
        allDay,
      });
      if (!result) {
        return res.status(404).send("the schedule cannot be created");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  //   static async editClass(req, res, next) {
  //     const { id } = req.params;
  //     const { class_name, teacher, subject } = req.body;
  //     try {
  //       const result = await classModel.findByIdAndUpdate(id, {
  //         class_name,
  //         teacher,
  //         subject,
  //       });
  //       if (!result) {
  //         return res.status(404).send("the class cannot be updated");
  //       }
  //       res.send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
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
  static async updateDragDropSchedule(req, res, next) {
    try {
      const arrSchedule = req.body;
      console.log(arrSchedule);
      arrSchedule.forEach(async (element) => {
        await scheduleModel.findOneAndUpdate(
          { _id: element.id },
          { title: element.title, start: element.start, end: element.end }
        );
      });
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
  //   static async getClassByID(req, res, next) {
  //     const { id } = req.params;
  //     try {
  //       const result = await classModel
  //         .findById(id)
  //         .populate({
  //           path: "subject",
  //           populate: {
  //             path: "teacher_id",
  //             select: ["first_name", "last_name", "email", "phone", "short_bio"],
  //           },
  //         })
  //         .populate({
  //           path: "teacher",
  //           select: ["first_name", "last_name", "email", "phone", "short_bio"],
  //         });
  //       if (!result) {
  //         return res.status(404).send("the class cannot be showed");
  //       }
  //       res.send(result);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = ScheduleController;
