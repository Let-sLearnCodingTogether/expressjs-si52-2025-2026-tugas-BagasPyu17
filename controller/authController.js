import { compare } from "bcrypt";
import UserModel from "../model/userModel.js";
import { hash } from "../utils/hashUtils.js";
import { jwtSignUtils } from "../utils/jwtSignUtils.js";

export const register = async (req, res) => {
    try {
        // Mengambil data dari body request
        const registerData = req.body;

        console.log(registerData);

        // Pastikan fungsi hash bersifat async dan gunakan await
        const hashedPassword = await hash(registerData.password);

        await UserModel.create({
            username: registerData.username,
            email: registerData.email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Berhasil register, silakan login",
            data: null,
        });
    } catch (e) {
        res.status(500).json({
            message: e.message,
            data: null,
        });
    }
};

export const login = async (req, res) => {
    try {
        const loginData = req.body;

        const user = await UserModel.findOne({
            email: loginData.email,
        });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
                data: null,
            });
        }

        // Bandingkan password dengan yang di database
        const isPasswordMatch = await compare(loginData.password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Password salah",
                data: null,
            });
        }

        // Jika password cocok
        return res.status(200).json({
            message: "Login berhasil",
            data: {
                username: user.username,
                email: user.email,
                token: jwtSignUtil(user), // Membuat JWT token
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};
