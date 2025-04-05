import express from 'express';


const products = express();

products.get("/products", (req,res) => {
    res.send("Getting all products")
})

// let port;
// if (process.env.PORT) {
//     port = process.env.PORT;

// } else {
//     port = 3000;
// }

let port = process.env.PORT || 3000
products.listen(port, () => {
    console.log(`Server is running on port 3000....`)
})