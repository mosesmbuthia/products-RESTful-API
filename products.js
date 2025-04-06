
import express from 'express';
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();
const products = express();

products.use(express.json());

products.get("/products", async (req, res) => {
    try {
        const products = await client.product.findMany();
        res.status(200).json({
            status: "Success",
            message: "Succesfully fetched all the products",
            data: products
        })
    } catch(error) {
        console.error("Error fetching the products");
        res.status(500).json({
            status: "Error",
            message: "Something went wrong"
        })
    }
})

products.get("/products/:productid", async (req, res) => {
    const { productid } = req.params;

    try {
        const product = await client.product.findFirst({
            where: {
                id: productid,
            },
        });

        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: `Product with ID ${productid} not found!`,
            });
        }

        return res.status(200).json({
            status: "Success",
            data: product,
        });

    } catch (error) {
        console.error(`Error fetching product with ID ${productid}:`, error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong",
        });
    }
});


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
            
        });
    }
});

products.patch("/products/:productid", async (req, res) => {
    const { productTitle, productDescription, isOnOffer} = req.body;
    const {productid} = req.params;
    try {
         const updatedProduct = await client.product.update({
           where: {
            id: productid,
           },
           data: {
            productTitle: productTitle && productTitle,
            productDescription: productDescription && productDescription,
            isOnOffer: isOnOffer && isOnOffer
        }
            
         })
         res.status(200).json({
            status: "Success",
            message: "Product updated succesfully",
            data: updatedProduct
         })

    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Error updating the product"
        })

    }
})

products.delete("/products/:productid", async (req, res) => {
    const {productid} = req.params;
    try {
        const deletedproduct = await client.product.delete({
            where: {
                id: productid
            }
        })
        res.status(200).json({
            status: "Success",
            message:"Product deleted succesfully",
           
        })
    } catch(error) {
        res.status(500).json({
            status: "Error",
            message: "Error deleting the product"
        })
    }
})

let port = process.env.PORT || 3000
products.listen(port, () => {
    console.log(`Server is running on port 3000....`)
})