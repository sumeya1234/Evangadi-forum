const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        console.log(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Authentication invalid"});
    }
    const token = authHeader.split(" ")[1]
    // console.log(authHeader)
    // console.log(token)
    try {
        const {username, userid} = jwt.verify(token, "secret");
        req.user = { username, userid}
        next();
    } 
    catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Authentication invalid"});
    }
}
module.exports = authMiddleware;