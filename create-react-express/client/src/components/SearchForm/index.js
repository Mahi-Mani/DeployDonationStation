import React from "react";

function SearchForm(props) {
    return (
        <div className="input-group input-group-lg">
            <input className="form-control" type="text" {...props} />
        </div>
    )
}

export default SearchForm;