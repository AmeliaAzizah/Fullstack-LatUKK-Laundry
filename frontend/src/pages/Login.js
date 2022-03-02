import React from "react"
// import Navbar from "../component/Navbar"

// import axios
import axios from "axios"

// import base_url dari file config.js
import { base_url } from "../config"

export default class Login extends React.Component{
    constructor(){
        super()
        // tambah state sesuai kebutuhan
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }

    // arrow function -> untuk menjalankan fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/auth"

        axios.post(url, sendData)
        .then(res => {
            this.setState({logged: res.data.logged})
            if (this.state.logged) {
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: res.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-8 card my-5">
                    <div className="card-header bg-primary text-white text-center">
                        <h4>Laundry</h4>
                        <strong className="text-warning">Admin Sign In</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                            {/* username */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control mb-1" value={this.state.username}
                                    onChange={ev => this.setState({username: ev.target.value})} />
                                </div>
                            </div>

                            {/* password */}
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control mb-1" value={this.state.password}
                                    onChange={ev => this.setState({password: ev.target.value})}
                                    utoComplete="false" />
                                </div>
                            </div>

                            <button className="btn btn-block btn-primary mb-1" type="submit">
                                Sign In
                            </button>

                            <a href="" className="small justify-right">Daftar Akun</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}