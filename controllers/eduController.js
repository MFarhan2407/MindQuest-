const { User, Profile } = require('../models')
class eduController {
    static async dashBoard(req, res) {
        try {
            const id = req.session.userId
            const user = await User.findOne({
                where: { id }
            })
            // res.send(user)
            // console.log(user);
            
            // res.send('masuk')
            res.render("edu-dashboard", { user })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = eduController