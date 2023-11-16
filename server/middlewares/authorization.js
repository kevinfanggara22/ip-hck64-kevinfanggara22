const { User, Article } = require("../models")

const authorizationAdmin = async(req, res, next) => {
    try {
        // console.log(req.user, "user")
        // console.log(req.params)
        // const {id} = req.params
        if(req.user.role === "Admin") {
            next()
        } else {
            const selectedUser = await Article.findByPk(req.params.id)
            if(!selectedUser) {
                throw { name: "DataNotFound"}
            }
            if(selectedUser.authorId === req.user.id) {
                next()
            } else {
                throw { name: "Forbidden"}
            }
           
        }
    } catch(error) {
        next(error);
    }
}

module.exports = {
    authorizationAdmin
}