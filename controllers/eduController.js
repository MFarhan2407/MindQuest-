const { User, Profile } = require('../models')
class eduController {
    static async dashBoard(req, res) {
        try {
            const id = req.session.userId
            const user = await User.findOne({
                where: { id }
            })
            res.render("edu-dashboard", { user })
        } catch (error) {
            res.send(error)
        }
    }

    static async areaEducator(req, res) {
        try {
            res.render("edu-area")
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = eduController