import React from "react"
import { Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar"
import Login from "./pages/Login"
import Member from "./pages/Member"
import User from "./pages/User"
import Paket from "./pages/Paket"
import Home from "./pages/Home"
import Transaksi from "./pages/Transaksi"

export default class App extends React.Component {
  render() {
    return (
      <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/member" component={Member} />
        <Route path="/user" component={User} />
        <Route path="/paket" component={Paket} />
        <Route path="/transaksi" component={Transaksi} />
      </Switch>
      </>
    )
  }
}