// Setup Sign up and Login API for Owner

import express from "express"
import prisma from "./lib/index.js"
import bcrypte from "bcrypt"
 import  jwt  from "jsonwebtoken"
import authenticate from "./middleware/authenticate.js"
import "dotenv/config.js"
const SECTRET_KEY = process.env.SECRET_KEY

const rooter = express.Router()



rooter.post("/signup"  , async(req,res) => {

    try{
        const {name, email, password} = req.body
        console.log(req.body)

        const extingowner  = await   prisma.owner.findUnique({
            where : {
                email : email
            }
        })
        if(extingowner) {
              return res.status(409).json({status: 409, message: "Owner already exists"})
        }


         const hashedpassword =  await bcrypte.hash(password , 10)

         const newoner =  await  prisma.owner.create({
            data : {
                name:name,
                password : hashedpassword,
                email : email
            }
         })
         res.status(201).json({status: 201, message: "Owner created successFully", newoner})

    } catch(e){
        console.log(e)
    }
})


rooter.post("/login" , authenticate, async(req,res) => {
    try{

        const { email, password} = req.body
        const existingOwner =  await prisma.owner.findUnique({
            where:{
                email : email
            }
        })
        if(!existingOwner){
            return res.status(404).json({
                message: "Owner not found",
              });
        }

        const iscmparepsword =  await bcrypte.compare(password ,existingOwner.password)
        if (!iscmparepsword) {
            return res.status(401).json({
              message: "Invalid credentials",
            });
          }
          const token = jwt.sign(
            {id: existingOwner.id, email: existingOwner.email},
            SECTRET_KEY,
            {expiresIn: "1h"}
          )


          return res.status(200).json({
            message: "Owner logged in successfully",
            token: token,
          });
    } catch(e){
        console.log(e)
    }

})



export default rooter