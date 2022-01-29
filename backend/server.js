const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const user = require("./router/user")
const paket = require("./router/paket")
const member = require("./router/member")
const transaksi = require("./router/transaksi")
const { login } = require("./router/login")

app.use("/laundry/api/user", user)
app.use("/laundry/api/paket", paket)
app.use("/laundry/api/member", member)
app.use("/laundry/api/transaksi", transaksi)
app.use("/laundry/api/auth", login)

// untuk membaca folder image
app.use(express.static(__dirname))

app.listen(8000, () => {
    console.log(`Server run on port 8000`);
})
