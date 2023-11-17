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
            const nameIdArray = name.split("#", 2);

            if (nameIdArray == undefined || nameIdArray.length != 2) {
                props.setError(`Error occurred when parsing Bungie Name. A Bungie Name should formatted similarly to "name#1234".`);
                return;
            }

            const bName = nameIdArray[0];
            const bId = nameIdArray[1];

            props.findBungieName(bName, bId);
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
