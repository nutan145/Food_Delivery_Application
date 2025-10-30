import React from "react"
import { Link } from "react-router-dom"

const Menubar=({togglesidebar})=>{
    return(
         <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button className="btn btn-primary" id="sidebarToggle" onClick={togglesidebar}>
                         <Link to='/list'><i className="bi bi-list text-white">&nbsp;Food List</i></Link>
                        </button>
                    </div>
                </nav>
         </div>
    )
}

export default Menubar