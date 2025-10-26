import modelProduk from "../model/modelProduk.js";

export const createProduk = async (req, res) => {
  try {
   const request = req.body

        const response = await modelProduk.create({
            produkName : request.produkName,
            review : request.review,
            rating : request.rating
        })

        res.status(201).json({
            message : "Data berhasil dibuat",
            data : response
        })
        
    } catch (error) {
        res.status(500).json({
           message : error,
            data : null
        })
  }
};

export const listProduk = async (req, res) => {
  try {
    const data = await modelProduk.find({})

        res.status(200).json({
            message: "List Data",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            message : error,
            data : null
        })
  }
};

export const updateProduk = async (req, res) => {
  try {
    const id = req.params?.id
        const request = req.body

        if(!id){
            return res.status(500).json({
                message : "Id wajib diisi",
                data : null
            })
        }

         const response = await modelProduk.findByIdAndUpdate(id, {
            produkName : request.produkName,
            review : request.review,
            rating : request.rating
         })

        if(!response){
            return res.status(500).json({
                message : "Data gagal diupdate",
                data : null
            })
        }

        return res.status(200).json({
            message : "Data mahasiswa berhasil diupdate"
        })

    } catch (error) {
        res.status(500).json({
            message : error,
            data : null
        })
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const id = req.params.id
        if(!id){
            return res.status(500).json({
                message : "Id wajib diisi",
                data : null
            })
        }

        const response = await modelProduk.findByIdAndDelete(id)

        if(response){
            return res.status(200).json({
                message : "Data berhasil dihapus",
                data : null
            })
        }

        return res.status(404).json({
                message : "Data tidak ditemukan",
                data : null
            })

    } catch (error) {
        res.status(500).json({
            message : error,
            data : null
        })
  }

  
};