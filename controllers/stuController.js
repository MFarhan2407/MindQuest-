const { User, Profile, Subject, Challenge, Answer } = require('../models')

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
            // res.send(subject)
            // const challenges = await Challenge.findAll();
            res.render('question-stu', { subject });
        } catch (error) {
            res.send(error)
        }
    }


    static async submitAnswer(req, res) {
        try {
            console.log(req.body);
            /*
            {
                '46': 'D',
                '47': 'A',
                '48': 'A',
                '49': 'A',
                '50': 'A',
                '51': 'A',
                '52': 'A',
                '53': 'A',
                '54': 'A',
                '55': 'A',
                '56': 'A',
                '57': 'B',
                '58': 'A',
                '59': 'A',
                '60': 'A'
            }
            */

            const StudentId = req.session.userId;
            const { answers } = req.body;

            console.log('StudentId:', StudentId); // 3
            console.log('Answers:', answers); //undefined

            const challengeIds = Object.keys(answers)

            const challenges = await Challenge.findAll({
                where: {
                    id: challengeIds
                }
            });

            const correctAnswersToInsert = [];

            challenges.forEach(challenge => {
                const userAnswer = answers[challenge.id];

                if (userAnswer === challenge.correctAnswer) {
                    correctAnswersToInsert.push({
                        StudentId,
                        ChallengeId: challenge.id,
                        selectedOption: userAnswer
                    });
                }
            });

            await Answer.bulkCreate(correctAnswersToInsert);


            req.flash('success', `Kamu menjawab ${correctAnswersToInsert.length} soal dengan benar!`);

            res.redirect('/mindquest/student/subject');
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = StuController