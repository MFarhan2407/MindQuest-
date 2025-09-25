const { User, Profile, Challenge, Subject } = require('../models')


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

            const subject = await Subject.findAll()

            res.render("edu-area", { user, subject })
        } catch (error) {
            res.send(error)
        }
    }

    static async createQuestion(req, res) {
        try {
            const { question, correctAnswer, choices, subjects } = req.body

            if (!req.session.userId) {
                return res.redirect('/login') 
            }


            // console.log(choices.split(","));
            const option = choices.split(",")
            const id = req.session.userId

            console.log('User ID dari session:', id)

            await Challenge.create({
                question,
                correctAnswer,
                optionA: option[0],
                optionB: option[1],
                optionC: option[2],
                optionD: option[3],
                EducatorId: id,
                SubjectId: subjects
            })

            res.redirect("/mindquest/educator/area")

        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = eduController