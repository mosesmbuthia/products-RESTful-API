
import express from 'express';
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();
const products = express();

products.use(express.json());

products.get("/products", (req, res) => {
    res.send("Getting all products")
})

products.get("/products/:productid", (req, res) => {
    res.send("Getting a specific product")
})

products.post("/products", async (req, res) => {
    try {
        const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;

        const newProduct = await client.product.create({
            data: {
                productTitle,
                productDescription,
                unitsLeft,
                pricePerUnit,
                isOnOffer
            }
        });

        res.status(201).json({
            status: "success",
            message: "New product added successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
            error: error.message
        });
    }
});
products.patch("/products/:productid", (req, res) => {
    res.send("Updating a product")
})

products.delete("/products/:productid", (req, res) => {
    res.send("Deleting a specific product")
})

let port = process.env.PORT || 3000
products.listen(port, () => {
    console.log(`Server is running on port 3000....`)
})