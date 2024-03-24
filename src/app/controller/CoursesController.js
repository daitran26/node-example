const Course = require('../models/Course')
const {mongooseToObject,mutipleMongooseToObject} = require('../../until/mongoose')

class CoursesController {

    show(req, res,next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                console.log("log course");
                console.log(course);
                res.status(200).send(course)
            })
            .catch(next => console.log(next))
    }
    create(req, res,next){
        res.render('../views/createCourse')
    };
    store(req, res,next){
        const newCourse = {...req.body}
        newCourse.image = `https://i.ytimg.com/vi/${req.body.video}/hqdefault.jpg`
        const course = Course(newCourse)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error =>{
                next(error)
            })
        console.log(req.body)
    }
    edit(req, res,next){
        Course.findById(req.params.id)
            .then(course => res.render('../views/me/updateCourse',{
                course: mongooseToObject(course)
            }))
            .catch(next)
    }
    //[PUT] course/:id
    update(req, res,next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next)
    }
    delete(req, res,next){
        Course.delete({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }
    restore(req, res,next){
        Course.restore({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }
    deleteRestore(req, res,next){
        Course.deleteOne({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }
    handleSubmit(req, res,next){
        switch(req.body.action){
            case 'delete': 
                Course.delete({_id: {$in : req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next)
                break
            default: 
                res.json({message:'Action invalid.'})
        }
    }
    trashActive(req, res,next){
        switch(req.body.action){
            case 'delete': 
                Course.deleteMany({_id: {$in : req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next)
                break
            case 'restore':
                Course.restore({_id: {$in : req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next)
                break
            default: 
                res.json({message:'Action invalid.'})
        }
    }
}
module.exports = new CoursesController();
