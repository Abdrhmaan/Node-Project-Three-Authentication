import express from "express"

 import Owner from "./owner.js"


 import bookstoreRouter from './bookstores.js'
 import bookRouter from "./books.js"
 import authorRouter from './authors.js'

const server = express()


server.use(express.json())





server.use("/api/owners", Owner)


server.use("/api/bokk", bookstoreRouter)
server.use("/api/bokk", bookRouter)
server.use("/api/bokk", authorRouter)



export default server