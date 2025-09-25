const { User, Profile, Subject, Challenge } = require('../models')

class StuController {
    static async dashboard(req, res) {
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

    static async showSubject(req, res) {
        try {
            const subject = await Subject.findAll()
            res.render("subject-stu", { subject })
        } catch (error) {
            res.send(error)
        }
    }

    static async showChallenge(req, res) {
        try {
            const { SubjectId } = req.params
            const subject = await Subject.findByPk(SubjectId, {
                include: [Challenge]
            })
            // const challenges = await Challenge.findAll();
            res.render('question-stu', { subject });
        } catch (error) {
            res.send(error)
        }
    }

    static async submitAnswer(req, res) {
        try {
            // console.log(req.body);
            console.log(req.body.split(":"));
            

            //             {
            //   '1': 'C',
            //   '2': 'A',
            //   '3': 'C',
            //   '4': 'C',
            //   '5': 'D',
            //   '6': 'A',
            //   '7': 'B',
            //   '8': 'A',
            //   '9': 'A',
            //   '10': 'A',
            //   '11': 'B',
            //   '12': 'D',
            //   '13': 'C',
            //   '14': 'C',
            //   '15': 'D'
            // }

            res.redirect("/mindquest/student/subject")

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = StuController