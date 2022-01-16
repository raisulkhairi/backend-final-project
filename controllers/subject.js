const subjectModel = require("../models/subject");
const TeacherModel = require("../models/teacher");
class SubjectController {
  // Only By Headmaster
  static async createNewSubject(req, res, next) {
    const { subject_name, teacher_id, duration, link } = req.body;
    try {
      const result = await subjectModel.create(
        {
          subject_name,
          teacher_id,
          duration,
          link,
        },
        { new: true }
      );

      await TeacherModel.findByIdAndUpdate(teacher_id, {
        $push: { Subject: result._id },
      });

      if (!result) {
        return res.status(404).send("the subject cannot be created");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  // Only By Headmaster
  static async editSubject(req, res, next) {
    const { id } = req.params;
    const { subject_name, teacher_id, duration, link } = req.body;

    const result = await subjectModel.findByIdAndUpdate(
      id,
      { subject_name, teacher_id, duration, link },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("The subject cannot be updated");
    }
    res.send(result);
  }

  // ??
  static async getAllSubject(req, res, next) {
    const subjectList = await subjectModel.find().populate({
      path: "teacher_id",
      select: ["first_name", "last_name", "email", "phone", "short_bio"],
    });
    if (!subjectList) {
      res.status(5000).json({ success: false });
    }
    res.send(subjectList);
  }

  // ??
  static async getSubjectByID(req, res, next) {
    const { id } = req.params;
    const subject = await subjectModel.findById(id).populate({
      path: "teacher_id",
      select: ["first_name", "last_name", "email", "phone", "short_bio"],
    });
    if (!subject) {
      return res.status(500).json({ success: false });
    }
    res.send(subject);
  }

  // Only By Headmaster
  static async deleteSubject(req, res, next) {
    const { id } = req.params;
    try {
      const result = await subjectModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("the subject cannot be deleted");
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubjectController;
