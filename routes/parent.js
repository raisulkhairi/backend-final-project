const express = require("express");
const multer = require("multer");

const parentRoute = express.Router();
const ParentController = require("./../controllers/parent");

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

parentRoute.post(
  "/register",
  uploadOptions.single("image"),
  ParentController.createNewParent
);

// Buat Parent
parentRoute.put("/byparent/:id", ParentController.editByParent);

// Buat Headmaster
parentRoute.put("/status/:id", ParentController.editStatus);

// Buat Parent
parentRoute.put(
  "/byparent/image/:id",
  uploadOptions.single("image"),
  ParentController.editParentImageByParent
);

// Headmaster
parentRoute.put("/byheadmaster/:id", ParentController.editByHeadmaster);

// Headmaster
parentRoute.put(
  "/byheadmaster/image/:id",
  ParentController.editParentImageByHeadMaster
);

// By Headmaster
parentRoute.get("/count", ParentController.parentCount);

parentRoute.get("/", ParentController.getAllParentData);
parentRoute.get("/:id", ParentController.getParentByID);

module.exports = parentRoute;
