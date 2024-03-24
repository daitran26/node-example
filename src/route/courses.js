const express = require('express');
const router = express.Router();
const coursesController = require('../app/controller/CoursesController');
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-submit', coursesController.handleSubmit);
router.post('/trashActive', coursesController.trashActive);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id/restore', coursesController.deleteRestore);
router.delete('/:id', coursesController.delete);
router.get('/:slug', coursesController.show);
// router.get('/', coursesController.index);

module.exports = router;
