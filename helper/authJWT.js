require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "";
const StudentModel = require("../models/student");

class AuthJWT {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }
    const token = access_token;
    const decoded = jwt.verify(token, JWT_SECRET);
    req.decoded = decoded;
    next();
  }
  //   static async authStudent(req, res, next) {
  //     const { idUser } = req.params;
  //     const temp_decoded = req.decoded;
  //     try {
  //       const hasil = await StudentModel.findOne({ _id: temp_decoded.id });
  //       const hasil_akhir = hasil._id.toString();
  //       if (hasil_akhir === idUser) {
  //         next();
  //       } else {
  //         throw { name: "UNAUTHORIZED" };
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = AuthJWT;
