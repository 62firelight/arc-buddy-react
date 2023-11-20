"use client";

export default function Stat(props) {
    return (
        <div className="stat">
            <h2>{props.name}</h2> 
            {props.value}
        </div>
    );
}
