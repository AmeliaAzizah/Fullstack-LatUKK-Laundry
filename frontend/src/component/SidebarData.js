import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
// import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Data Member",
        path: "/member",
        icon: <FaIcons.FaAddressCard/>,
        cName: "nav-text"
    },
    {
        title: "Data User",
        path: "/user",
        icon: <FaIcons.FaChalkboardTeacher />,
        cName: "nav-text"
    },
    {
        title: "Data Paket",
        path: "/paket",
        icon: <FaIcons.FaBox />,
        cName: "nav-text"
    },
    {
        title: "Transaksi",
        path: "/transaksi",
        icon: <AiIcons.AiOutlineSolution />,
        cName: "nav-text"
    },
]