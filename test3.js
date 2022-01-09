// Bukan event
const validator2 = await scheduleModel.find({ title });
// console.log("VALID 2", validator2);
// Validator2 adalah kumpulan data (array) schedule dengan title sama
if (validator2.length !== 0) {
  let isTabrakan = false; // Untuk Hari Yang Sama
  let isTabrakan2 = false; // Untuk Hari Yang Beda
  let isSameDate;
  validator2.forEach(async (element) => {
    // Jika Hari Sama
    if (element.daysOfWeek.includes(daysOfWeek[0])) {
      isSameDate = true;
      let startTimeInSecondValidator = convertHHMMToSec(element.startTime); // s1
      let endTimeInSecondValidator = convertHHMMToSec(element.endTime); //e1
      let startTimeNewInput = convertHHMMToSec(startTime); //s2
      let endTimeNewInput = convertHHMMToSec(endTime); //e2

      // console.log("S1 : ", startTimeInSecondValidator);
      // console.log("E1 : ", endTimeInSecondValidator);
      // console.log("S2 : ", startTimeNewInput);
      // console.log("E2 : ", endTimeNewInput);

      if (startTimeNewInput < startTimeInSecondValidator) {
        if (
          !(
            startTimeNewInput < startTimeInSecondValidator &&
            endTimeNewInput <= startTimeInSecondValidator
          )
        ) {
          // console.log("1");
          isTabrakan = true;
        }
      } else if (startTimeNewInput >= endTimeInSecondValidator) {
        if (
          !(
            startTimeNewInput >= endTimeInSecondValidator &&
            endTimeNewInput > endTimeInSecondValidator
          )
        ) {
          // console.log("2");
          isTabrakan = true;
        }
      } else {
        isTabrakan = true;
      }
    } else {
      isSameDate = false;
      // isTabrakan2 = false
      const guruSaatIni = await subjectModel.find({
        subject_name: title,
      });
      const idGuruSaatIni = guruSaatIni[0].teacher_id;
      // console.log("GURU SAAT INI", idGuruSaatIni);

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

      const newData = scheduleForAllClass.filter(
        (el) => el.kelas.teacher._id.toString() === idGuruSaatIni.toString()
      );
      // newData.forEach((el) => {
      //   // console.log();
      //   console.log(
      //     "GURU YANG NGAJAR SAAT INI NAMUN BEDA HARI",
      //     el.kelas.teacher
      //   );
      // });

      // console.log();
      // console.log();
      // console.log();
      // console.log();
      // newData adalah array dengan semua jadwal dengan guru yang ajar bersangkutan sama
      newData.forEach((jadwal) => {
        if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
          // console.log(
          //   "SECHEDULE DENGAN HARI YANG SAMA DENGAN YANG SUDAH ADA (NAMA GURU SAMA) : ",
          //   jadwal
          // );
          const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
          const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
          const startTimeNewInput = convertHHMMToSec(startTime); //s2
          const endTimeNewInput = convertHHMMToSec(endTime); //e2
          // console.log("S1 : ", startTimeInSecondValidator);
          // console.log("E1 : ", endTimeInSecondValidator);
          // console.log("S2 : ", startTimeNewInput);
          // console.log("E2 : ", endTimeNewInput);

          // Apakah Jam bentrok ?
          // Jam bentrok
          if (startTimeNewInput < startTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput < startTimeInSecondValidator &&
                endTimeNewInput <= startTimeInSecondValidator
              )
            ) {
              // console.log("1");
              isTabrakan2 = true;
            }
          } else if (startTimeNewInput >= endTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput >= endTimeInSecondValidator &&
                endTimeNewInput > endTimeInSecondValidator
              )
            ) {
              // console.log("2");
              isTabrakan2 = true;
            }
          } else {
            isTabrakan2 = true;
          }
          console.log("IS TABRAKAN : ", isTabrakan2);
        }
      });
    }
  });
  setTimeout(async () => {
    if (isTabrakan == true) {
      return res.json({
        error: "Jadwal Berada di hari yang sama dan Bentrok",
      });
    } else if (isTabrakan2 == true) {
      return res.json({
        error: "Jadwal Berada di hari yang berbeda tapi Bentrok",
      });
    } else if (isTabrakan == false && isSameDate == true) {
      // isTabrakan = false berdasarkan jam dan hari
      const guruSaatIni = await subjectModel.find({
        subject_name: title,
      });
      const idGuruSaatIni = guruSaatIni[0].teacher_id;

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

      const newData = scheduleForAllClass.filter(
        (el) => el.kelas.teacher._id.toString() === idGuruSaatIni.toString()
      );
      // console.log(newData);

      // newData adalah array dengan semua jadwal dengan guru yang ajar bersangkutan sama
      newData.forEach((jadwal) => {
        if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
          const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
          const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
          const startTimeNewInput = convertHHMMToSec(startTime); //s2
          const endTimeNewInput = convertHHMMToSec(endTime); //e2
          // console.log("S1 : ", startTimeInSecondValidator);
          // console.log("E1 : ", endTimeInSecondValidator);
          // console.log("S2 : ", startTimeNewInput);
          // console.log("E2 : ", endTimeNewInput);

          // Apakah Jam bentrok ?
          // Jam bentrok
          if (startTimeNewInput < startTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput < startTimeInSecondValidator &&
                endTimeNewInput <= startTimeInSecondValidator
              )
            ) {
              console.log("1");
              isTabrakan = true;
            }
          } else if (startTimeNewInput >= endTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput >= endTimeInSecondValidator &&
                endTimeNewInput > endTimeInSecondValidator
              )
            ) {
              console.log("2");
              isTabrakan = true;
            }
          } else {
            isTabrakan = true;
          }
        }
      });

      if (isTabrakan) {
        return res.json({
          error: "Jadwal Guru ybs Bentrok",
        });
      } else {
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
    } else if (isTabrakan2 == false && isSameDate == false) {
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
  }, 120);
}
// Jika Tidak ada data mapel dengan nama yang sama
else {
  console.log("MAPEL BEDA");
  // Ambil Semua jadwal
  const allSchedule = await scheduleModel.find({
    kelas: { $exists: true },
  });

  let isTabrakan3 = false; // Untuk Hari Yang Sama
  let isTabrakan4 = false; // Untuk Hari Yang Beda
  let isSameDate2;
  allSchedule.forEach(async (jadwal) => {
    // Cek Apakah Kelas Sama
    if (kelas.toString() === jadwal.kelas._id.toString()) {
      // Cek Hari Sama ?
      if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
        isSameDate2 = true;
        const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
        const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
        const startTimeNewInput = convertHHMMToSec(startTime); //s2
        const endTimeNewInput = convertHHMMToSec(endTime); //e2
        // console.log("S1 : ", startTimeInSecondValidator);
        // console.log("E1 : ", endTimeInSecondValidator);
        // console.log("S2 : ", startTimeNewInput);
        // console.log("E2 : ", endTimeNewInput);

        // Apakah Jam bentrok ?
        // Jam bentrok
        if (startTimeNewInput < startTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput < startTimeInSecondValidator &&
              endTimeNewInput <= startTimeInSecondValidator
            )
          ) {
            console.log("1");
            isTabrakan3 = true;
          }
        } else if (startTimeNewInput >= endTimeInSecondValidator) {
          if (
            !(
              startTimeNewInput >= endTimeInSecondValidator &&
              endTimeNewInput > endTimeInSecondValidator
            )
          ) {
            console.log("2");
            isTabrakan3 = true;
          }
        } else {
          isTabrakan3 = true;
        }
      } else {
        // HARI BEDA
        isSameDate2 = false;
        const guruSaatIni = await subjectModel.find({
          subject_name: title,
        });
        const idGuruSaatIni = guruSaatIni[0].teacher_id;

        // Cek Guru Ngajar Di tempat lain atau engga
        // Ambil Data Guru Yang bersangkutan
        const scheduleForAllClass = await scheduleModel
          .find({ kelas: { $exists: true } })
          .populate({
            path: "kelas",
            select: ["class_name", "teacher"],
            populate: {
              path: "teacher",
              select: [
                "first_name",
                "last_name",
                "email",
                "phone",
                "short_bio",
              ],
            },
          });

        const newData = scheduleForAllClass.filter(
          (el) => el.kelas.teacher._id.toString() === idGuruSaatIni.toString()
        );
        // console.log(newData);

        // newData adalah array dengan semua jadwal dengan guru yang ajar bersangkutan sama

        newData.forEach((jadwal) => {
          if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
            const startTimeInSecondValidator = convertHHMMToSec(
              jadwal.startTime
            ); // s1
            const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
            const startTimeNewInput = convertHHMMToSec(startTime); //s2
            const endTimeNewInput = convertHHMMToSec(endTime); //e2
            // console.log("S1 : ", startTimeInSecondValidator);
            // console.log("E1 : ", endTimeInSecondValidator);
            // console.log("S2 : ", startTimeNewInput);
            // console.log("E2 : ", endTimeNewInput);

            // Apakah Jam bentrok ?
            // Jam bentrok
            if (startTimeNewInput < startTimeInSecondValidator) {
              if (
                !(
                  startTimeNewInput < startTimeInSecondValidator &&
                  endTimeNewInput <= startTimeInSecondValidator
                )
              ) {
                console.log("1");
                isTabrakan3 = true;
              }
            } else if (startTimeNewInput >= endTimeInSecondValidator) {
              if (
                !(
                  startTimeNewInput >= endTimeInSecondValidator &&
                  endTimeNewInput > endTimeInSecondValidator
                )
              ) {
                console.log("2");
                isTabrakan3 = true;
              }
            } else {
              isTabrakan3 = true;
              // isTabrakan4 = true untuk guru yang harus ngajar mapel lain
            }
          }
        });
      }
    }
  });

  setTimeout(async () => {
    if (isTabrakan3 == true && isSameDate2 == true) {
      return res.json({
        error: "Jadwal Berada di hari yang sama dan Bentrok",
      });
    } else if (isTabrakan3 == true && isSameDate2 == false) {
      //  BENTROK KARENA GURU
      return res.json({
        error: "Jadwal Guru YBS Bentrok",
      });
    } else if (isTabrakan3 == false && isSameDate2 == false) {
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
    } else if (isTabrakan3 == false && isSameDate2 == true) {
      // HEHEHEHEHEH
      // isTabrakan = false berdasarkan jam dan hari
      const guruSaatIni = await subjectModel.find({
        subject_name: title,
      });
      const idGuruSaatIni = guruSaatIni[0].teacher_id;

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

      const newData = scheduleForAllClass.filter(
        (el) => el.kelas.teacher._id.toString() === idGuruSaatIni.toString()
      );
      // console.log(newData);

      // newData adalah array dengan semua jadwal dengan guru yang ajar bersangkutan sama
      newData.forEach((jadwal) => {
        if (jadwal.daysOfWeek.includes(daysOfWeek[0])) {
          const startTimeInSecondValidator = convertHHMMToSec(jadwal.startTime); // s1
          const endTimeInSecondValidator = convertHHMMToSec(jadwal.endTime); //e1
          const startTimeNewInput = convertHHMMToSec(startTime); //s2
          const endTimeNewInput = convertHHMMToSec(endTime); //e2
          // console.log("S1 : ", startTimeInSecondValidator);
          // console.log("E1 : ", endTimeInSecondValidator);
          // console.log("S2 : ", startTimeNewInput);
          // console.log("E2 : ", endTimeNewInput);

          // Apakah Jam bentrok ?
          // Jam bentrok
          if (startTimeNewInput < startTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput < startTimeInSecondValidator &&
                endTimeNewInput <= startTimeInSecondValidator
              )
            ) {
              console.log("1");
              isTabrakan3 = true;
            }
          } else if (startTimeNewInput >= endTimeInSecondValidator) {
            if (
              !(
                startTimeNewInput >= endTimeInSecondValidator &&
                endTimeNewInput > endTimeInSecondValidator
              )
            ) {
              console.log("2");
              isTabrakan3 = true;
            }
          } else {
            isTabrakan3 = true;
          }
        }
      });

      if (isTabrakan3) {
        return res.json({
          error: "Jadwal Guru ybs Bentrok",
        });
      } else {
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
    } else if (isTabrakan4 == true) {
      return res.json({
        error: "Jadwal Berada di hari yang beda dan Bentrok",
      });
    } else if (isTabrakan4 == false && isSameDate2 == false) {
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
  }, 150);
}

// return res.json({
//   error: "Jadwal Berada di hari yang sama dan Bentrok",
// });

// Dari data kelas (validator2) cari dengan nama mapel yang sama
// for (let i = 0; i < validator2.length; i++) {
//   var data = validator2[i];
//   // Klo Ada yang sama
//   if (data.title == title) {
//     console.log("YES NAMA SAMA");

//   } else {
//     // Jika Beda Nama
//     console.log("YES BEDA NAMA");
//     // result = await scheduleModel.create({
//     //   kelas,
//     //   title,
//     //   daysOfWeek,
//     //   startTime,
//     //   endTime,
//     //   color,
//     //   allDay,
//     // });
//     // if (!result) {
//     //   return res.status(404).send("the schedule cannot be created");
//     // }
//     // return res.send(result);
//   }
// }
