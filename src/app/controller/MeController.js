const Course = require('../models/Course')
const {mongooseToObject,mutipleMongooseToObject} = require('../../until/mongoose')

class MeController {

    storedCourses(req, res,next) {

        Promise.all( [Course.find({}).sortable(req),Course.countDocumentsDeleted()])
            .then(([courses,countDeleted]) => res.render('../views/me/storedCourse',{
                countDeleted,
                courses: mutipleMongooseToObject(courses),
            }))
            .catch(next)

        // Course.countDocumentsDeleted()
        //     .then(count => console.log(count))// lấy ra số bản ghi được xóa
        // Course.find({})
        //     .then(courses => res.render('../views/me/storedCourse',{
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
    }
    trashCourses(req,res,next){
        Course.findDeleted({})
            .then(courses => res.render('../views/me/trashCourse',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}
module.exports = new MeController();
