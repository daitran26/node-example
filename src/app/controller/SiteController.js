const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../until/mongoose')
class SiteController {

    //trang home
    index(req, res,next) {
        //[GET] /
        // Course.find({},(err,courses) => {
        //     if(!err) {
        //         res.json(courses)
        //     }
        //     else{
        //         res.status(404).json({error:'error Message'})
        //     }
        // })
        Course.find({})
            .then(courses=> res.render('home', {
                courses:mutipleMongooseToObject(courses)
            }))
            .catch(next)
        // res.render('home')
    }
    //GET /search
    search(req, res) {
        res.render('search')
    }
}
module.exports = new SiteController();
