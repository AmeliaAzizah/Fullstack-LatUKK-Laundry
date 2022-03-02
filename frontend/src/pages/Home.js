import React from "react"
import Navbar from "../component/Navbar"

// import axios
import axios from "axios"

// import base_url dari file config.js
import { base_url } from "../config"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            memberCount: 0,
            userCount: 0,
            paketCount: 0,
            transaksiCount: 0
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    /*
    arrow faunction header confiq --> untuk memberikan header berupa 'bearer token'
    sebagai request API sebelum mengakses data member, user, paket, dan transaksi
    */
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    /*
    function getMember --> untuk mengupdate state memberCount sesuai dg
    jumlah data member pada database
    */
    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({memberCount: res.data.length})
        })
        .catch(error => {
            if(error.res) {
                if(error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    /*
    function getUser --> untuk mengupdate state userCount sesuai dg
    jumlah data user pada database
    */
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({userCount: res.data.length})
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    /*
    function getPaket --> untuk mengupdate state paketCount sesuai dg
    jumlah data paket pada database
    */
    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({paketCount: res.data.length})
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    /*
    function getTransaksi --> untuk mengupdate state transaksiCount sesuai dg
    jumlah data transaksi pada database
    */
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({transaksiCount: res.data.length})
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    /*
    function getUser --> untuk mengupdate state adminName
    nama admin didapatkan dari localStorage
    */
    getUsers = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({adminName: user.nama_user})
    }

    /*
    sebelum hal.home di render -> program harus mendapatkan data dari
    function" diatas
    */
    componentDidMount() {
        this.getMember()
        this.getUser()
        this.getPaket()
        this.getTransaksi()
        this.getUsers()
    }

    render(){
        return(
            <div>
                {/* <Navbar /> */}
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome Back, {this.state.adminName}</strong>
                    </h3>
                    <div className="row">
                        {/* member count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Member Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.memberCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* user count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>User Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.userCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* paket count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Paket Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.paketCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* transaksi count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Transaksi Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.transaksiCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}