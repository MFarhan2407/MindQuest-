const { User, Profile } = require('../models')

class StuController {
    static async readQuestion(req, res) {
        try {
            const id = req.session.userId
            const user = await User.findOne({
                where: { id }
            })
            // res.send(user)
            // console.log(user);

            // res.send('masuk')
            res.render("student-dashboard", { user })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = StuController