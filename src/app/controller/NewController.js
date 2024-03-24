class NewController {
    index(req, res) {
        res.render('news');
    }
    show(req, res) {
        res.send('Day la trang show trong news');
    }
}
module.exports = new NewController();
