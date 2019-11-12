import React from "react";

function Nav() {
  return (
    <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <nav className="navbar navbar-dark bg-dark shadow-lg p-3 mb-5 bg-dark rounded text-center">
                <div className="container">
                    <h1 className="display-4 text-light text-center">Donation Station</h1>
                </div>
            </nav>
        </div>
        <div className="col-md-2"></div>
    </div>
)
}

export default Nav;