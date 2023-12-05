"use client";
import { useState } from "react";
import { getBungieName } from "../endpoints/apiEndpoints";
import { useRouter } from "next/navigation";

export default function Search(props, { params }) {
    const router = useRouter();

    async function searchBungieName(name, id) {
        const getBungieNameResponse = await getBungieName(name, id);

        let foundProfile = undefined;
        try {
            const body = await getBungieNameResponse.json();
            foundProfile = body;
            router.push(
                `?membershipType=${foundProfile.membershipType}&membershipId=${foundProfile.membershipId}`
            );
        } catch (error) {
            const status = await getBungieNameResponse.status;
            console.log(error);
            if (status === 404) {
                props.setError("Could not find specified Destiny 2 player");
            }
            return;
        }
    }

    function handleChange(e) {
        props.setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (props.name.length > 0) {
            const nameIdArray = props.name.split("#", 2);

            if (nameIdArray == undefined || nameIdArray.length != 2) {
                props.setError(
                    `Error occurred when parsing Bungie Name. A Bungie Name should formatted similarly to "name#1234".`
                );
                return;
            }

            const bName = nameIdArray[0];
            const bId = nameIdArray[1];

            searchBungieName(bName, bId);
            props.resetAfterSubmission();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-name-input"
                className="input input__lg"
                name="text"
                placeholder="BungieName#1234"
                autoComplete="off"
                value={props.name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Search
            </button>
        </form>
    );
}
