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

    static async showScore(req, res) {
        try {
            const StudentId = req.session.userId

            const correctAnswers = await Answer.findAll({
                where: { StudentId },
                include: [{
                    model: Challenge,
                    include: [Subject]
                }]
            });

            const scoreBySubject = {};
            correctAnswers.forEach(answer => {
                const subjectTitle = answer.Challenge.Subject.title;
                if (!scoreBySubject[subjectTitle]) {
                    scoreBySubject[subjectTitle] = 0;
                }
                scoreBySubject[subjectTitle]++;
            });

            const totalCorrect = correctAnswers.length;


            res.render('score-stu', { scoreBySubject, totalCorrect, correctAnswers })
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
            const StudentId = req.session.userId;
            const { answers } = req.body;
            const { SubjectId } = req.params;

            const subject = await Subject.findByPk(SubjectId, {
                include: [{
                    model: Challenge,
                    order: [['id', 'ASC']]
                }]
            })

            const challenges = subject.Challenges

            // const correctAnswersToInsert = [];

            answers.forEach((userAnswer, index) => {
                if (challenges[index]) {
                    const challenge = challenges[index];

                    if (userAnswer === challenge.correctAnswer) {
                        correctAnswersToInsert.push({
                            StudentId,
                            ChallengeId: challenge.id,
                            selectedOption: userAnswer
                        });
                    }
                }
            });

            if (correctAnswersToInsert.length > 0) {
                await Answer.bulkCreate(correctAnswersToInsert);
            }

            // req.flash('success', `Kamu menjawab ${correctAnswersToInsert.length} soal dengan benar!`);

            // res.redirect('/mindquest/student/subject');
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = StuController