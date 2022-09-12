"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 8000;
data_source_1.AppDataSource.initialize().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const ProductRepo = connection.getRepository(Product_1.Product);
    app.post('/product/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productSearch = yield ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    message: "San pham da ton tai"
                });
            }
            const productData = {
                name: req.body.name,
                price: req.body.price,
                author: req.body.author,
                avatar: req.body.avatar
            };
            const product = yield ProductRepo.save(productData);
            if (product) {
                res.status(200).json({
                    message: "Tao san pham moi thanh cong",
                    product: product
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }));
    app.put('/product/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let productSearch = yield ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    message: "San pham khong ton tai"
                });
            }
            const product = yield ProductRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "chinh sua thanh cong",
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }));
    app.delete('/product/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let productSearch = yield ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    message: "san pham khong ton tai"
                });
            }
            const product = yield ProductRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "delete thanh cong"
            });
        }
        catch (err) {
            message: err.message;
        }
    }));
    app.get('/product/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield ProductRepo.find();
            if (products) {
                res.status(200).json({
                    message: "success", products: products
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }));
    app.get('/product/detail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let productId = parseInt(req.query.productId);
            const product = yield ProductRepo.findOneBy({ id: productId });
            if (product) {
                res.status(200).json({
                    message: "success",
                    product
                });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }));
    app.listen(port, () => {
        console.log(`running at http://localhost:${port}`);
    });
}));
//# sourceMappingURL=index.js.map