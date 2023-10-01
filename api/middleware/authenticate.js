// set up token middleware here


import jwt from "jsonwebtoken";
import "dotenv/config.js"
const SECTRET_KEY = process.env.SECRET_KEY

function authenticate (req,res,next){

    const token = req.headers.authorization
    console.log("authen" ,token) 
    if(!token) {
        return res.status(401).json({
            message: "Authentication failed - missing token",
        });
    }

    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer,    SECTRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Authentication failed - invalid token",
            });
        }
        console.log("decedo" , decoded) 

        // attach the decoded token to the request object
        req.decoded = decoded;

        // continue with the request
        next();

    }
    );




}



export default authenticate
