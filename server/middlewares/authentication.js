const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const { authorization } = req.headers;

        if(!authorization) throw { name: "UserMustLogin" }

        const rawToken = authorization.split(' ')
        if(rawToken.length < 2) {
            throw { name: "InvalidToken", message: "Token malformed" }
        }

        if(rawToken[0] !== "Bearer") {
            throw { name: "InvalidToken", message: "Wrong auth schemes"}
        }
        const token = rawToken[1];
        const payload = decodeToken(token);
        const user = await User.findByPk(payload.id);
        if(!user) {
            throw { name: "InvalidToken", message: "User Not Found"}
        }

        req.user = user
        // console.log(payload)
        next()
    } catch(error) {
        console.log(error)
        next(error)
    }
}

module.exports = authentication