"use client";

export default function Stat(props) {
    return (
        <div className="stat">
            <h4>{props.formattedName}</h4>
            {props.formattedDisplayValue}
        </div>
    );
}
