const { User, Profile, Challenge, Subject } = require('../models')


class eduController {
    static async dashBoard(req, res) {
        try {
            const id = req.session.userId
            const user = await User.findOne({
                where: { id }
            })

            const students = await User.findAll({
                where: {
                    role: "STUDENT"
                }
            })
            const profile = await Profile.findAll()
            const subjects = await Subject.findAll()
            const challenge = await Challenge.findAll()

            // console.log(challenge.length);


            res.render("edu-dashboard", { user, students, profile, subjects, challenge })
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
            const challenges = await Challenge.findAll({
                include: Subject
            })

            res.render("edu-area", { user, subject, challenges })
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

    static async myStudents(req, res) {
        try {

            const students = await User.findAll()
            const profile = await Profile.findAll()
            res.render("my-students", { students, profile })

        } catch (error) {
            res.send(error)
        }
    }

    static async deleteQuestion(req, res) {
        try {
            const { id } = req.params

            await Challenge.destroy({
                where: {
                    id: id
                }
            })

            res.redirect("/mindquest/educator/area")
        } catch (error) {
            res.send(error)
        }
    }

    static async showEditFormPage(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId
            
            const user = await User.findOne({
                include: {
                    model: Profile,
                    where: {
                        id: id
                    }
                }
            })
            
            const profile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            // console.log(profile);
            
            
            
            
            res.render("edu-profile-edit", { user, profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async editProfile(req, res) {
        try {

            const userId = req.params.id;
            const { name, email, address, bio } = req.body

            if (req.file) {
                avatarPath = '/uploads/' + req.file.filename;
            }


            const profile = await Profile.findOne({ where: { UserId: userId } });

            if (profile) {
                await profile.update({
                    name,
                    email,
                    address,
                    bio,
                    ...(avatarPath && { avatar: avatarPath })
                });
            }

            res.redirect('/mindquest/educator/profile');
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = eduController