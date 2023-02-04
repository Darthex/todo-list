import React from "react";

export default function Navbar() {
    const date = new Date()
    return(
        <div className="navbar">
            <h1>To Do List</h1>
            <div className="date">
                <h2 className="date--heading">Date: </h2>
                <h2>{date.toLocaleDateString()}</h2>
            </div>
        </div>
    )
}