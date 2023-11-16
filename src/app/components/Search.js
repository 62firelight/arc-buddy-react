"use client";
import { useState } from "react";

export default function Search(props) {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (name.length > 0) {
            props.searchName(name);
            setName("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-name-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Search
            </button>
        </form>
    );
}
