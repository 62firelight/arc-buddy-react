"use client";
import { useState } from "react";
import { getBungieName, getCharacters, getHistoricalStats } from "../endpoints/apiEndpoints";

export default function Search(props) {
    const [name, setName] = useState("");

    async function searchBungieName(name, id) {
        const getBungieNameResponse = await getBungieName(name, id);

        let foundProfile = undefined;
        try {
            const body = await getBungieNameResponse.json();
            foundProfile = body;
        } catch (error) {
            const status = await getBungieNameResponse.status;
            console.log(error);
            if (status === 404) {
                setError("Could not find specified Destiny 2 player");
            }
            return;
        }

        const getCharactersResponse = await getCharacters(
            foundProfile.membershipType,
            foundProfile.membershipId
        );
        try {
            const body = await getCharactersResponse.json();
            foundProfile = body;
        } catch (error) {
            const status = await getCharactersResponse.status;
            console.log(error);
            if (status === 404) {
                setError(
                    "Could not find characters for specified Destiny 2 player"
                );
            }
            return;
        }

        const getHistoricalStatsResponse = await getHistoricalStats(
            foundProfile.membershipType,
            foundProfile.membershipId
        );
        try {
            const body = await getHistoricalStatsResponse.json();

            let newProfile = {};
            newProfile.characters = body.characters;
            newProfile.mergedStats = body.mergedStats;
            newProfile.pveStats = body.pveStats;
            newProfile.pvpStats = body.pvpStats;

            foundProfile = _.merge(foundProfile, newProfile);
            props.setProfile(foundProfile);

            console.log(newProfile)
            console.log(foundProfile)
        } catch (error) {
            const status = await getHistoricalStatsResponse.status;
            console.log(error);
            if (status === 404) {
                setError(
                    "Could not find historical stats for specified Destiny 2 player"
                );
            }
            return;
        }
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (name.length > 0) {
            const nameIdArray = name.split("#", 2);

            if (nameIdArray == undefined || nameIdArray.length != 2) {
                props.setError(
                    `Error occurred when parsing Bungie Name. A Bungie Name should formatted similarly to "name#1234".`
                );
                return;
            }

            const bName = nameIdArray[0];
            const bId = nameIdArray[1];

            searchBungieName(bName, bId);
            setName("");
            props.setError("");
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
