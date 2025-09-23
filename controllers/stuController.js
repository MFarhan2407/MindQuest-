class StuController{
    static async readQuestion(req, res){
        try {
            res.render('student-dashboard')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = StuController