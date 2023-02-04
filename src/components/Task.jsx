import React from "react";
import {MdDeleteForever} from "react-icons/all.js";

export default function Task(props) {

    const style= props.complete ? {textDecoration:'line-through'} : {textDecoration: 'none'}

    return(
        <div>
        <div className="task">
        <h3 style={style}>
            <button onClick={() => props.completed(props.id)} className="strike--button">❍</button>{props.text}
        </h3>
            <MdDeleteForever className="delete--button" onClick={() => props.delete(props.id)}/>
        </div>
            <hr className="line--break"/>
        </div>
    )
}
