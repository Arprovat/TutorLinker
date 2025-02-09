

class profile {

    static getProfile=(req, res) =>{
        res.json({
            message:"profile data",
            data : req.user
        })
    }

    static editProfile=(req, res) =>{}
}

module.exports = profile