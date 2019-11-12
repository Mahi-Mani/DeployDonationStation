import React from "react";
// import Background from '../../images/bg.jpg';

function Jumbotron() {

    return (
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div className="jumbotron jumbotron-fluid shadow-lg bg-dark rounded img-responsive">
                    <h1 className="display-4 text-light"> Get more details on our donation station</h1>
                    <p className="lead text-light">Get more details!</p>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    )
}

export default Jumbotron;