const express = require("express")
const app = express()

// call model for user
const user = require("../models/index").user

// install md5
const md5 = require("md5")

// *** call auth ***
// panggil fungsi auth -> validasi token
// const {auth} = require("./login")

// fungsi auth dijadikan middleware
// app.use(auth)
// ---------------------------------

// middleware for allow the request from body (agar bisa membaca data yg di body)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// end-point akses data user dg method GET
app.get("/", async(req, res) => {
    user.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point akses data user berdasarkan 'id_user' tertentu dg method GET
app.get("/:id_user", async(req, res) => {
    user.findOne({where: {id_user: req.params.id_user}})
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point menambah new user dengan method POST
app.post("/", async(req, res) => {
    // tampung data request yang akan dimasukkan
    let newUser = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }

    // execute insert data
    user.create(newUser)
    .then(result => {
        res.json({
            message: "Data Success",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point mengubah data user dengan method PUT
app.put("/", async(req, res) => {
    // tampung data request yang akan diubah
    let data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        role: req.body.role
    }

    // key yg menunjukan data yg akan diubah
    let param = {
        id_user: req.body.id_user
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    // execute update data
    user.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point menghapus data user berdasarkan 'id_user' dg method DELETE
app.delete("/:id_user", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_user: req.params.id_user
    }

    // execute delete data
    user.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data Deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app