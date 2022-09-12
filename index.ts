import { AppDataSource } from "./src/data-source";
import { Product } from "./src/entity/Product";
import express from "express";
import bodyParser from "body-parser";

const port = 8000;

AppDataSource.initialize().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Product);

    app.post('/product/create', async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    message: "San pham da ton tai"
                })
            }
            const productData = {
                name: req.body.name,
                price: req.body.price,
                author: req.body.author,
                avatar: req.body.avatar
            };
            const product = await ProductRepo.save(productData);
            if (product) {
                res.status(200).json({
                    message: "Tao san pham moi thanh cong",
                    product: product
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    app.put('/product/update', async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({ id: req.body.id })
            if (!productSearch) {
                res.status(500).json({
                    message: "San pham khong ton tai"
                })
            }
            const product = await ProductRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "chinh sua thanh cong",
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    app.delete('/product/delete', async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    message: "san pham khong ton tai"
                })
            }
            const product = await ProductRepo.delete({ id: req.body.id })
            res.status(200).json({
                message: "delete thanh cong"
            })
        } catch (err) {
            message: err.message
        }
    })

    app.get('/product/list', async (req, res) => {
        try {
            const products = await ProductRepo.find();
            if (products) {
                res.status(200).json({
                    message: "success", products: products
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

    app.get('/product/detail', async (req, res) => {
        try {
            let productId = parseInt(req.query.productId as string)
            const product = await ProductRepo.findOneBy({ id: productId })
            if (product) {
                res.status(200).json({
                    message: "success",
                    product
                })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    app.listen(port, () => {
        console.log(`running at http://localhost:${port}`);
    })
})