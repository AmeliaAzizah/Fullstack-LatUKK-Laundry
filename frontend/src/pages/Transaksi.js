import React from "react"
// import Navbar from "../component/Navbar"

// import transaksiList
import TransaksiList from "../component/TransaksiLst"

// import base_url
import { base_url } from "../config"

// import jquery
import $ from "jquery"

// import axios
import axios from "axios"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            transaksi: [],
            members: [],
            users: [],
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: false,
            id_user: "",
            id_transaksi: "",
            detail_transaksi: [],
            pakets: [],
            id_paket: "",
            qty: 0,
            action: "",
            selectedItem: null
        }

        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
           if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    // header config -> untuk memberikan header berupa 'beare token' sebagai request API
    // sebelum mengakses data
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    // getTransaksi -> untuk mengakses API get transaksi
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transaksi: response.data})
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    // getMember -> untuk mengakses API get member
    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({members: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    // getUser -> untuk mengakses API get user
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({users: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    // getPaket -> untuk mengakses API get paket
    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pakets: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getTransaksi()
        this.getMember()
        this.getUser()
        this.getPaket()
    }

    // untuk mengakses API get dibayar
    getBayar = id => {
        let url = base_url + "/transaksi/bayar/" + id
        axios.get(url, this.headerConfig())
        .then(response => {
            // this.setState({this.getTransaksi()})
            this.getTransaksi()
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    // untuk mengedit status paket
    editStatus = (selectedItem) => {
        $("#modal_status").modal("show")
        // ---------------------
        this.setState({
            action: "update",
            id_transaksi: selectedItem.id_transaksi,
            status: selectedItem.status,
            dibayar: selectedItem.dibayar,
        })
    }

    // function saveStatus -> untuk menyimpan data status yang telah ditambahkan
    saveStatus = (event, id) => {
        event.preventDefault()
        $("#modal_status").modal("hide")
        let form = {
            status: this.state.status,
            dibayar: this.state.dibayar
        }

        let url = base_url + "/transaksi/status/" + id
        axios.post(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getTransaksi()
        })
        .catch(error => console.log(error))
    }

    // untuk tambah transaksi
    Add = () => {
        $("#modal_transaksi").modal("show")
        // ---------------------
        this.setState({
            action: "insert",
            id_transaksi: 0,
            id_member: this.state.members[0].id_member,
            tgl: "",
            batas_waktu: "",
            status: "",
            dibayar: "",
            id_user: this.state.users[0].id_user,
            id_paket: "",
            qty: 0,
            detail_transaksi: []
        })
    }

    // function saveTransaksi -> untuk menyimpan data transaksi yang telah ditambahkan
    saveTransaksi = (event) => {
        event.preventDefault()
        $("#modal_transaksi").modal("hide")
            // menampung data pada detail transaksi
            let detail = {
                id_paket: this.state.id_paket,
                qty: this.state.qty,                
            }

            //ambil array detail_transaksi
            let temp = this.state.detail_transaksi
            temp.push(detail)
            this.setState({ detail_transaksi: temp })

        // menampung data transaksi
        let newTransaksi = {
            id_transaksi: this.state.id_transaksi,
            id_member: this.state.id_member,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            status: this.state.status,
            dibayar: this.state.dibayar,
            id_user: this.state.id_user,
            detail_transaksi: this.state.detail_transaksi
        }
        
        let url = base_url + "/transaksi"
        if (this.state.action === "insert") {
            axios.post(url, newTransaksi, this.headerConfig())

            .then( response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
        }
    }

    // function delete -> untuk menghapus data transaksi
    delete = selectedItem => {
        if (window.confirm("Yakin mau dihapus ?")) {
            let url = base_url + "/transaksi/" + selectedItem.id_transaksi
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                {/* <Navbar /> */}
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Transaksi List</h3>
                    { this.state.transaksi.map(item => (
                        <TransaksiList
                        key = {item.id_transaksi}
                        id_transaksi = {item.id_transaksi}
                        nama_member = {item.member.nama_member}
                        alamat = {item.member.alamat}
                        status = {item.status}
                        dibayar = {item.dibayar}
                        tgl = {item.tgl}
                        tgl_bayar = {item.tgl_bayar}
                        paket = {item.detail_transaksi}
                        onBayar = {() => this.getBayar(item.id_transaksi)}
                        onEdit = {() => this.editStatus(item)}
                        onDrop = {() => this.delete(item)}
                         />
                    )) }
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Paket
                    </button>
                </div>

                {/* modal edit status */}
                <div className="modal fade" id="modal_status">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Edit Status</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveStatus(ev, this.state.id_transaksi)}>
                                    Status Paket
                                    <div className="form-group">
                                        <select name="status" id="status" className="form-control"
                                        onChange={ev => this.setState({status: ev.target.value})}
                                        id="exampleFormControlSelect1" value={this.state.status}>
                                            <option>--- Pilih Status Paket ---</option>     
                                            <option value="1">
                                                Baru
                                            </option>
                                            <option value="2">
                                                Proses
                                            </option>
                                            <option value="3">
                                                Selesai
                                            </option>
                                            <option value="4">
                                                Diambil
                                            </option>
                                        </select>
                                    </div>

                                    Status Bayar
                                    <div className="form-group">
                                        <select name="bayar" id="bayar" className="form-control"
                                        onChange={ev => this.setState({dibayar: ev.target.value})}
                                        id="exampleFormControlSelect1" value={this.state.dibayar}>
                                            <option>--- Pilih Status Bayar ---</option>     
                                            <option value="0">
                                                Belum Bayar
                                            </option>
                                            <option value="1">
                                                Sudah Bayar
                                            </option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal transaksi */}
                <div className="modal" id="modal_transaksi">
                        <div className="modal-dialog modal-md">
                            < div className="modal-content">
                                <div className="modal-header bg-info">
                                    <h4 className="text-white">
                                        Add transaksi
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => this.saveTransaksi(e)}>
                                        Nama Member
                                        <select className="form-control mb-2"
                                            value={this.state.id_member}
                                            onChange={e => this.setState({ id_member: e.target.value })}>
                                            <option value="">Pilih Nama</option>
                                            {this.state.members.map(member => (
                                                <option value={member.id_member}>
                                                    {member.nama_member}
                                                </option>
                                            ))}
                                        </select>
                                        
                                        Tanggal
                                        <input type="date" className="form-control mb-1" 
                                        value={this.state.tgl}
                                        onChange={ev => this.setState({tgl: ev.target.value})} />

                                        Batas Waktu
                                        <input type="date" className="form-control mb-1" 
                                        value={this.state.batas_waktu}
                                        onChange={ev => this.setState({batas_waktu: ev.target.value})} />

                                        Status Paket
                                        <div className="form-group">
                                            <select name="status" id="status" className="form-control"
                                            onChange={ev => this.setState({status: ev.target.value})}
                                            id="exampleFormControlSelect1" value={this.state.status}>
                                                <option>--- Pilih Status Paket ---</option>     
                                                <option value="1">
                                                    Baru
                                                </option>
                                                <option value="2">
                                                    Proses
                                                </option>
                                                <option value="3">
                                                    Selesai
                                                </option>
                                                <option value="4">
                                                    Diambil
                                                </option>
                                            </select>
                                        </div>

                                        Status Bayar
                                        <div className="form-group">
                                            <select name="bayar" id="bayar" className="form-control"
                                            onChange={ev => this.setState({dibayar: ev.target.value})}
                                            id="exampleFormControlSelect1" value={this.state.dibayar}>
                                                <option>--- Pilih Status Bayar ---</option>     
                                                <option value="0">
                                                    Belum Bayar
                                                </option>
                                                <option value="1">
                                                    Sudah Bayar
                                                </option>
                                            </select>
                                        </div>

                                        Nama User
                                        <select className="form-control mb-2"
                                            value={this.state.id_user}
                                            onChange={e => this.setState({ id_user: e.target.value })}>
                                            <option value="">Pilih Nama</option>
                                            {this.state.users.map(user => (
                                                <option value={user.id_user}>
                                                    {user.nama_user}
                                                </option>
                                            ))}
                                        </select>
                                        
                                        Jenis Paket
                                        <select className="form-control mb-2"
                                            value={this.state.id_paket}
                                            onChange={e => this.setState({ id_paket: e.target.value })}>
                                            <option value="">Pilih Paket</option>
                                            {this.state.pakets.map(paket => (
                                                <option value={paket.id_paket}>
                                                    {paket.jenis_paket}
                                                </option>
                                            ))}
                                        </select>

                                        Jumlah (Qty)
                                        <input type="number" className="form-control mb-2"
                                            value={this.state.qty}
                                            onChange={e => this.setState({ qty: e.target.value })} />

                                        <button type="submit" className="btn btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}