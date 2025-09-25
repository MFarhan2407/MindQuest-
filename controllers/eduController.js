const { User, Profile, Challenge } = require('../models')


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
            const id = req.session.userId
            const user = await User.findOne({
                where: { id }
            })
            res.render("edu-area", { user })
        } catch (error) {
            res.send(error)
        }
    }

    static async createQuestion(req, res) {
        try {
            const { question, correctAnswer, choices} = req.body


            // console.log(choices.split(","));
            const option = choices.split(",")
            

            await Challenge.create({
                question,
                correctAnswer,
                optionA: option[0],
                optionB: option[1],
                optionC: option[2],
                optionD: option[3],
                EducatorId: req.session.userId
            })

            res.redirect("/mindquest/educator/area")
            
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = eduController