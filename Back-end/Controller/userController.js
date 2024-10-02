const dbConnection = require("../DB/dbConfig");
const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcrypt");
async function register(req,res){
    const { username, firstname, lastname, email, password } = req.body;
    if ( !username || !firstname || !lastname || !email || !password ){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({msg : "Please provide all required fields"})
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid FROM users WHERE username = ? or email = ?" , [username, email])
        // console.log(user[0].userid); 
        // console.log({user : });
        if (user.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({ msg : "You have already registered"});
        }
        if (password.length <= 8){
            return res.status(StatusCodes.BAD_REQUEST)
            .json({ msg : "Password must be at least 8 characters"});
        }
        // Password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        await dbConnection.query(
            "INSERT INTO users (username,firstname, lastname, email, password) VALUES (?,?,?,?,?)",
            [username,firstname,lastname,email,hashedPassword]
        );
        return res.status(StatusCodes.CREATED).json({msg : "User created successfully"});
    } catch (error) {
        console.log(error.message)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong" });
    }
    // res.send("Register user")
}
async function login(req,res){
    res.send("Log in user")
}
async function checkUser(req,res){
    res.send("Check user")
}
module.exports = {register, login, checkUser}