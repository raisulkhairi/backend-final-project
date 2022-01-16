const express = require("express");
const multer = require("multer");

const teacherRoute = express.Router();
const TeacherController = require("./../controllers/teacher");

// Image Input
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// Only By Headmaster
teacherRoute.post(
  "/register",
  uploadOptions.single("image"),
  TeacherController.createNewTeacher
);

// Only By Teacher
teacherRoute.put(
  "/byteacher/image/:id",
  uploadOptions.single("image"),
  TeacherController.editTeacherImageByTeacher
);

// Only By Teacher
teacherRoute.put("/byteacher/:id", TeacherController.updateTeacherByTeacher);

// Only By Headmaster
teacherRoute.put(
  "/byheadmaster/image/:id",
  uploadOptions.single("image"),
  TeacherController.editTeacherImageByHeadmaster
);

// Only By Headmaster
teacherRoute.put(
  "/byheadmaster/:id",
  TeacherController.updateTeacherByHeadmaster
);

teacherRoute.get("/count", TeacherController.teacherCount);
teacherRoute.get("/", TeacherController.getAllTeacher);
teacherRoute.get("/:id", TeacherController.getTeacherByID);
teacherRoute.post("/scorring/:id", TeacherController.setScoreBySubjectID);

module.exports = teacherRoute;
