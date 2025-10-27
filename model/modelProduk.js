import mongoose from "mongoose"

const produkSchema = new mongoose.Schema (
    {
        produkName : {
            type : String,
            required : [true, " User name wajib di isi"],
            unique : true,
            trim : true
        },
        review : {
            type : String,
            required : [true, "Email wajib di isi"],
            unique : true,
            trim : true
        },
        rating : {
            type : Number,
            required : [true, " Password wajib di isi"]
        }
    },
    {
        timestamps : true
    }
)

const modelProduk = mongoose.model("produk", produkSchema)

export default modelProduk