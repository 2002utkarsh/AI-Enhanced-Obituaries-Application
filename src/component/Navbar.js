import React from "react"

const Navbar = ({ showForm, setShowForm }) => {
  return (
    <nav>
      <div className="nav-center">
      <div className="nav-header">
      <div className="title">
      <h3>The Last Show</h3>
      </div>
      <div className="obituary-btn-container ">
      <button className="obituary-btn" onClick={() => setShowForm(true)}>New-Obituary</button>
      </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
