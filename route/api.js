import express from "express";
import * as authController from "../controller/authController.js"
import * as produkController from "../controller/produkController.js";
import { protect } from "../middlewares/authMiddleware.js";
import * as profileController from "../controller/profileController.js";
const api = express.Router();

api.post('/register', authController.register);
api.post('/login', authController.login);

api.get("/produk", produkController.listProduk)
api.get("/produk/:id", produkController.listProduk)
api.post("/produk", produkController.createProduk)
api.put("/produk/:id", produkController.updateProduk)
api.delete("/produk/:id", produkController.deleteProduk)

api.get('/me', protect, profileController.privateProfile)

export default api