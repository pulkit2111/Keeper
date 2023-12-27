import React from "react";

function Footer(){
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="footer">
            <h2 className="footer-content">Copyright © {year}</h2>
        </div>
    )
}

export default Footer;