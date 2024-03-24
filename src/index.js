const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const sortMiddleware = require('./app/middleware/sortMiddleware')
const app = express();
const port = 3000;


app.use(methodOverride('_method'))
//tự lưu và thông báo khi lưu
app.use(morgan('combined'))
// rút gojb file ,handlebars thành .hbs
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: require('./helpers/helper'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
console.log(path.join(__dirname, 'resources/views'));

// tạo đường dẫn đến thư mục ảnh
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

//Tạo middleware cho phương thức post của form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(sortMiddleware)

//tạo middleware
app.use('/middleware',
    function(req, res, next) {
        if(['vip','normal'].includes(req.query.ve)){
            req.face = 'Sua doi info'
            return next()
        }
        res.json({meessage: 'Invalid decied'})
    },
    function(req, res,next){
        res.json({meessage: 'Successfully!',face: req.face})
})

const route = require('./route');
route(app);

const db = require('./config/db');

db.connect();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
