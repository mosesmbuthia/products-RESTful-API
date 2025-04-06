import express, { response } from 'express';


const products = express();

products.get("/products", (req,res) => {
    res.send("Getting all products")
})

products.get("/products/:productid", (req, res) => {
    res.send("Getting a specific product")
})

products.post("/products", (req, res) => {
    res.send("Creating a Product")
})

products.patch("/products/:productid", (req, res) => {
    res.send("Updating a product")
})

products.delete("/products/:productid", (req, res) => {
    res.send("Deleting a specific task")
})

let port = process.env.PORT || 3000
products.listen(port, () => {
    console.log(`Server is running on port 3000....`)
})