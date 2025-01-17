const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: 'Khóa học', maxLength: 255 },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
    video: { type: String, maxLength: 255 },
}, {
    timestamps: true,
});

Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this;
}

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
