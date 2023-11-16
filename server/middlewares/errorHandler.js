const errorHandler = (err, req, res, next) => {
    console.log(err)
    switch (err.name) {
        case "Forbidden":
            res.status(403).json({message: "Forbidden Access"})
            break;
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: err.errors[0].message})
            break;
        case "InvalidEmail":
            res.status(400).json({message: "Please input email"})
            break;
        case "InvalidPassword":
            res.status(400).json({message: "Please input password"})
            break;
        case "ImageNotFound":
            res.status(400).json({message: "Image file not found"})
            break;
        case "InvalidToken":
        case "JsonWebTokenError":
            res.status(401).json({message: "Invalid Token"})
            break;
        case "UserMustLogin":
            res.status(401).json({message: "User must login"})
            break;
        case "Unauthenticated":
            res.status(401).json({message: "User Not Authorized"})
            break;
        case "DataNotFound":
            res.status(404).json({message: "Error Not Found"})
            break;
        case "InvalidParams":
            res.status(404).json({message: "Unknown parameter"})
        default:
            res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = errorHandler