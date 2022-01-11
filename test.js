if (element.daysOfWeek.include(daysOfWeek[0])) {
  // Hari Sama

  // Cek Jam
  startTimeInSecondValidator = convertHHMMToSec(element.startTime);

  endTimeInSecondValidator = convertHHMMToSec(element.endTime);
  startTimeNewInput = convertHHMMToSec(startTime);
  endTimeNewInput = convertHHMMToSec(endTime);

  console.log(startTimeInSecondValidator);
  console.log(startTimeNewInput);
  console.log();
  console.log(endTimeInSecondValidator);
  console.log(endTimeNewInput);
} else {
  // Hari Beda
}

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

    const convertHHMMToSec = (time) => {
      const tt = time.split(":");
      if (tt[2]) {
        return tt[0] * 3600 + tt[1] * 60 + parseInt(tt[2]);
      } else {
        return tt[0] * 3600 + tt[1] * 60;
      }
    };
    try {
      if (start && end) {
        ///cek apakah berupa event atau bukan
        // Semua ini event
        const validator1 = await scheduleModel.find();
        validator1.forEach((element) => {
          if (element.start) {
            // klo true artinya ada event karena cuman event yang punya start
            const startInMili = new Date(start).getTime(); // (s2)
            const startInMiliValidator1 = new Date(element.start).getTime(); // (s1)

            const endInMili = new Date(end).getTime(); // (e2)
            const endInMiliValidator1 = new Date(element.end).getTime(); //(e1)

            // console.log(startInMili); // (s2)
            // console.log(startInMiliValidator1); // (s1)
            // console.log();
            // console.log(endInMili); // (e2)
            // console.log(endInMiliValidator1); //(e1)

            if (
              startInMiliValidator1 <= startInMili &&
              startInMili < endInMiliValidator1 &&
              endInMili <= endInMiliValidator1
            ) {
              return res.json({ error: "Jadwal Event Bertabrakan" });
            }

            if (
              startInMiliValidator1 <= startInMili &&
              startInMili < endInMiliValidator1 &&
              endInMiliValidator1 <= endInMili
            ) {
              return res.json({ error: "Jadwal Event Bertabrakan" });
            }

            if (
              startInMili <= startInMiliValidator1 &&
              startInMiliValidator1 < endInMili &&
              endInMili <= endInMiliValidator1
            ) {
              return res.json({ error: "Jadwal Event Bertabrakan" });
            }
            if (
              startInMili <= startInMiliValidator1 &&
              startInMiliValidator1 < endInMili &&
              endInMiliValidator1 <= endInMili
            ) {
              return res.json({ error: "Jadwal Event Bertabrakan" });
            }
          }
        });

        result = await scheduleModel.create({
          title,
          daysOfWeek: null,
          start,
          end,
          color,
          allDay,
        });

        if (!result) {
          return res.status(404).send("the schedule cannot be created");
        }
        res.send(result);
      } else {
        // Bukan event

        const validator2 = await scheduleModel.find();
        validator2.forEach((element) => {
          // Ambil yang berupa jadwal pelajaran
          if (
            element.kelas &&
            element.daysOfWeek &&
            element.startTime &&
            element.endTime
          ) {
            // Cek Nama MatPel Sama?
            if (element.title === title) {
              // Cek Hari Sama?
              if (element.daysOfWeek.includes(daysOfWeek[0])) {
                // Hari Sama
                // Cek Jam
                const startTimeInSecondValidator = convertHHMMToSec(
                  element.startTime
                );
                const endTimeInSecondValidator = convertHHMMToSec(
                  element.endTime
                );
                const startTimeNewInput = convertHHMMToSec(startTime);
                const endTimeNewInput = convertHHMMToSec(endTime);

                console.log(startTimeInSecondValidator); // s1
                console.log(startTimeNewInput); // s2
                console.log();
                console.log(endTimeInSecondValidator); // e1
                console.log(endTimeNewInput); // e2

                // Jam bentrok
                if (
                  !(
                    startTimeNewInput < startTimeInSecondValidator &&
                    endTimeNewInput <= startTimeInSecondValidator
                  ) ||
                  !(
                    startTimeNewInput >= endTimeInSecondValidator &&
                    endTimeNewInput > endTimeInSecondValidator
                  )
                ) {
                  return res.json({
                    error: "Jadwal Berada di hari yang sama dan Bentrok",
                  });
                }
              } else {
                // Hari Beda
              }
            }
          }
        });

        result = await scheduleModel.create({
          kelas,
          title,
          daysOfWeek,
          startTime,
          endTime,
          color,
          allDay,
        });

        if (!result) {
          return res.status(404).send("the schedule cannot be created");
        }

        res.send(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllSchedule(req, res, next) {
    try {
      const result = await scheduleModel.find().populate({
        path: "kelas",
        select: ["class_name", "teacher"],
        populate: {
          path: "teacher",
          select: ["first_name", "last_name", "email", "phone", "short_bio"],
        },
      });

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
      const schedule = await scheduleModel.findById(id).populate({
        path: "kelas",
        select: ["class_name", "teacher"],
        populate: {
          path: "teacher",
          select: ["first_name", "last_name", "email", "phone", "short_bio"],
        },
      });
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
