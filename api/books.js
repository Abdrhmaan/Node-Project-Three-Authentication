// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express"

const rooter = express.Router()
import prisma from "./lib/index.js";

rooter.get("/", async (req, res) => {
    try {

        const books = await prisma.book.findMany();
        if(books.length === 0) {
            return res.status(404).json({status: 404, message: "Books not found!"})
        }

        res.json(books)

    } catch (error) {
        res.status(500).json({status: 500, error: error.message})
    }
});
rooter.get("/:id", async (req, res) => {
    try {
        
        const { id } = req.params;

        const author = await prisma.author.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!author) {
            return res.status(404).json({status: 404, message: "Author not found"})
        }

        res.json(author)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});



rooter.post('/create_book', async (req, res) => {
    try {
        
        const {authorId, bookstoreId, title, price, image} = req.body;


        const newBook =await prisma.book.create  ({
            data : {
                authorId, // Replace with the valid ID of an existing author
                bookstoreId, // Replace with the valid ID of an existing bookstore
                title,
                price,
                image,

            }
         
          });

         

          

        if(!newBook) {
            return res.status(400).json({status: 400, messsage: "Book was not created!"})
        }

        res.status(200).json({status: 200, message: "Book successFully created!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});



rooter.put('/update_author/:id',  async (req, res) => {
    try {
        
        const { id } = req.params;
        const {name} = req.body;

        const updateAuthor = await prisma.author.update({
            where: {
                id: Number(id),
            },
            
            data: {
                name,
            },
        });

        if(!updateAuthor) {
            return res.status(400).json({status: 400, message: "Author was not updated!"})
        }

        res.status(200).json({status: 200, message: "Author successFully updated!"})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});

rooter.delete('/delete_author/:id', async (req, res) => {
    try {
        
        const { id } = req.params;

        const deleteAuthor = await prisma.author.delete({
            where: {
                id: Number(id),
            },
        });

        if(!deleteAuthor) {
            return res.status(400).json({status: 400, message: "Author was not deleted!"})
        }

        res.status(200).json({status: 200, message: `Author ${id} successFully deleted`})

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
})
export default  rooter