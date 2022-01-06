const { response } = require("express")
const express = require("express")
const app = express()
app.use(express.json())

// *** call auth ***
// panggil fungsi auth -> validasi token
const {auth} = require("./login")

// fungsi auth dijadikan middleware
app.use(auth)
// ---------------------------------

// call model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi

// endpoint get transaksi
app.get("/", async (request, response) => {
    let dataTransaksi = await transaksi.findAll({
        include: [
            { model: models.member, as: "member"},
            { model: models.user, as: "user"},
            { 
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: [
                    {model: models.paket, as:"paket"}
                ]
            }
        ]
    })
    return response.json(dataTransaksi)
})

// endpoint new transaksi       (kenapa pake json waktu input data ?) --> tanya waktu pas sekolah :)
app.post("/", (request, response) => {
    let newTransaksi = {
        id_member: request.body.id_member,
        tgl: request.body.tgl,
        batas_waktu: request.body.batas_waktu,
        tgl_bayar: request.body.tgl_bayar,
        status: 1,
        dibayar: request.body.dibayar,
        id_user: request.body.id_user
    }

    transaksi.create(newTransaksi)
    .then(result => {
        // jika insert transaksi berhasil, lanjut
        // insert data detail transaksinya
        let newIDTransaksi = result.id_transaksi

        let detail = request.body.detail_transaksi
        for (let i = 0; i < detail.length; i++) {
            // sebelumnya
            // nilai detail[i] hanya punya key id_paket
            // dan qty saja
            detail[i].id_transaksi = newIDTransaksi
        }

        // proses insert detail_transaksi
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            return response.json({
                message: `Data transaksi berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

app.put("/:id_transaksi", async (request,response) => {
    // tampung data utk update ke tbl transaksi
    let dataTransaksi = {
        id_member: request.body.id_member,
        tgl: request.body.tgl,
        batas_waktu: request.body.batas_waktu,
        tgl_bayar: request.body.tgl_bayar,
        status: request.body.status,
        dibayar: request.body.dibayar,
        id_user: request.body.id_user
    }
    // tampung parameter id_transaksi
    let parameter = {
        id_transaksi: request.params.id_transaksi
    }

    transaksi.update(dataTransaksi, {where: parameter})
    .then(async (result) => {
        // hapus data detail transaksi yg lama
        await detail_transaksi.destroy({where: parameter})
        
        // masukkan data detail yang baru
        let detail = request.body.detail_transaksi
        for (let i = 0; i < detail.length; i++) {
            // sebelumnya
            // nilai detail[i] hanya punya key id_paket
            // dan qty saja
            detail[i].id_transaksi = request.params.id_transaksi
        }

        // proses insert detail_transaksi
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            return response.json({
                message: `Data transaksi berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
   

})

app.delete("/:id_transaksi", (request, response) => {
    // tampung parameter id_transaksi
    let parameter = {
        id_transaksi: request.params.id_transaksi
    }

    // delete detail transaksi
    detail_transaksi.destroy({where: parameter})
    .then(result => {
        // hapus data transaksi nya
        transaksi.destroy({where: parameter})
        .then(hasil => {
            return response.json({
                message: `Data berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

// endpoint untuk mengubah status transaksi
app.post("/status/:id_transaksi", (request, response) => {
    // kita tampung nilai status
    let data = {
        status: request.body.status
    }

    // kita tampung parameter
    let parameter = {
        id_transaksi: request.params.id_transaksi
    }

    // proses update status transaksi
    transaksi.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: `Data status berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

// endpoint untuk mengubah status pembayaran
app.get("/bayar/:id_transaksi", (request, response) => {
    let parameter = {
        id_transaksi: request.params.id_transaksi
    }

    let data = {
        // mendapatkan tanggal yg saat ini berjalan
        tgl_bayar: new Date().toISOString().split("T")[0],
        dibayar: true
    }

    // proses ubah transaksi
    transaksi.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: `Transaksi berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})
module.exports = app