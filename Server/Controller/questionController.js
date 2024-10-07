const dbConnection = require("../DB/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4 : uuidv4} = require("uuid");  // Universally unique identifier
async function getAllQuestions(req,res){
    try{
        const [questions] = await dbConnection.query("SELECT * FROM questions");
        if(questions.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({ msg : "No questions found"})
        }
        return res.status(StatusCodes.OK).json({ msg : "All questions appeared", questions });       
    }
    catch (error) {
    console.log(error.message)
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong,Try again later" });
    }
}
async function getSingleQuestion(req, res) {
    const { question_id } = req.params;
    try{
        // const [singleQuestion] = await dbConnection.query("SELECT * FROM questions WHERE questionid =?", [question_id]);
        const [singleQuestion] = await dbConnection.query("SELECT * FROM questions WHERE id =?", [question_id]);
        if(singleQuestion.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({ msg : "The requested question could not be found."})
        }
        return res.status(StatusCodes.OK).json({ msg : "Here is the question", singleQuestion})
    }
    catch(error){
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong,Try again later" });
    }
}
async function postQuestion(req, res){
    const { title , description } = req.body;
    if(!title || !description){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg : "Please provide all required fields"});
    }
    try{
        const questionid = uuidv4();
        const userid = req.user.userid;
        await dbConnection.query(
            "INSERT INTO questions (userid, questionid, title, description) VALUES (?,?,?,?)",
            [userid, questionid, title, description] 
        );
        return res.status(StatusCodes.CREATED).json({ msg : "Your question is posted"});
    }
    catch(error){
        console.log(error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong,Try again later" });
    }
}

module.exports = { getAllQuestions, getSingleQuestion, postQuestion}