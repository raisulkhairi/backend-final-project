// Cek Hari Sama ?
if (data.daysOfWeek.includes(daysOfWeek[0])) {
  const startTimeInSecondValidator = convertHHMMToSec(data.startTime); // s1
  const endTimeInSecondValidator = convertHHMMToSec(data.endTime); //e1
  const startTimeNewInput = convertHHMMToSec(startTime); //s2
  const endTimeNewInput = convertHHMMToSec(endTime); //e2
  console.log("S1 : ", startTimeInSecondValidator);
  console.log("E1 : ", endTimeInSecondValidator);
  console.log("S2 : ", startTimeNewInput);
  console.log("E2 : ", endTimeNewInput);
  // Apakah Jam bentrok ?
  // Jam bentrok
  if (startTimeNewInput < endTimeInSecondValidator) {
    if (
      !(
        startTimeNewInput < startTimeInSecondValidator &&
        endTimeNewInput <= startTimeInSecondValidator
      )
    ) {
      return res.json({
        error: "Jadwal Berada di hari yang sama dan Bentrok",
      });
    }
  } else if (startTimeNewInput > endTimeInSecondValidator) {
    if (
      !(
        startTimeNewInput >= endTimeInSecondValidator &&
        endTimeNewInput > endTimeInSecondValidator
      )
    ) {
      return res.json({
        error: "Jadwal Berada di hari yang sama dan Bentrok",
      });
    }
  }
  // Jam tidak bentrok
  // Cek Guru Ngajar Di tempat lain atau engga
  // Ambil Data Guru Yang bersangkutan
  const scheduleForAllClass = await scheduleModel
    .find({ kelas: { $exists: true } })
    .populate({
      path: "kelas",
      select: ["class_name", "teacher"],
      populate: {
        path: "teacher",
        select: ["first_name", "last_name", "email", "phone", "short_bio"],
      },
    });

  scheduleForAllClass.forEach(async (jadwal) => {
    // Cek Guru Yang bersangkutan
    if (jadwal.kelas.teacher._id == "61d6f6545228336cd6c8e9d3") {
      if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
        const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
        const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
        const startTimeNewInput = convertHHMMToSec(startTime); //s2
        const endTimeNewInput = convertHHMMToSec(endTime); //e2
        console.log("S1 : ", startTimeInSecondValidator);
        console.log("E1 : ", endTimeInSecondValidator);
        console.log("S2 : ", startTimeNewInput);
        console.log("E2 : ", endTimeNewInput);
        // Apakah Jam bentrok ?
        // Jam bentrok
        if (startTimeNewInput < endTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput < startTimeInSecondValidator &&
              endTimeNewInput <= startTimeInSecondValidator
            )
          ) {
            return res.json({
              error: "Jadwal Guru ybs Bentrok",
            });
          }
        } else if (startTimeNewInput > endTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput >= endTimeInSecondValidator &&
              endTimeNewInput > endTimeInSecondValidator
            )
          ) {
            return res.json({
              error: "Jadwal Guru ybs Bentrok",
            });
          }
        }
        // Jam Tidak Bentrok
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

        return res.send(result);
      }
    }
  });
} else {
  // Beda Hari

  // Cek Guru Ngajar Di tempat lain atau engga
  // Ambil Data Guru Yang bersangkutan
  const scheduleForAllClass = await scheduleModel
    .find({ kelas: { $exists: true } })
    .populate({
      path: "kelas",
      select: ["class_name", "teacher"],
      populate: {
        path: "teacher",
        select: ["first_name", "last_name", "email", "phone", "short_bio"],
      },
    });

  scheduleForAllClass.forEach(async (jadwal) => {
    // Cek Guru Yang bersangkutan
    if (jadwal.kelas.teacher._id == "61d6f6545228336cd6c8e9d3") {
      if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
        const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
        const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
        const startTimeNewInput = convertHHMMToSec(startTime); //s2
        const endTimeNewInput = convertHHMMToSec(endTime); //e2
        console.log("S1 : ", startTimeInSecondValidator);
        console.log("E1 : ", endTimeInSecondValidator);
        console.log("S2 : ", startTimeNewInput);
        console.log("E2 : ", endTimeNewInput);
        // Apakah Jam bentrok ?
        // Jam bentrok
        if (startTimeNewInput < endTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput < startTimeInSecondValidator &&
              endTimeNewInput <= startTimeInSecondValidator
            )
          ) {
            return res.json({
              error: "Jadwal Guru ybs Bentrok",
            });
          }
        } else if (startTimeNewInput > endTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput >= endTimeInSecondValidator &&
              endTimeNewInput > endTimeInSecondValidator
            )
          ) {
            return res.json({
              error: "Jadwal Guru ybs Bentrok",
            });
          }
        }
        // Jam Tidak Bentrok
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

        return res.send(result);
      }
    }
  });
}
