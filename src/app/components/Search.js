"use client";
import { useState } from "react";
import {
    getBungieName,
    getCharacters,
    getHistoricalStats,
} from "../endpoints/apiEndpoints";

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

            foundProfile.mergedStats = body.mergedStats;
            foundProfile.pveStats = body.pveStats;
            foundProfile.pvpStats = body.pvpStats;
            for (const character of body.characters) {
                // Characters are not always listed in the right order,
                // so we should manually match the character IDs just to
                // be 100% sure
                const matchedCharacter = foundProfile.characters.find(
                    (newCharacter) =>
                        character.characterId === newCharacter.characterId
                );

                matchedCharacter.mergedStats = character.mergedStats;
                matchedCharacter.pveStats = character.pveStats;
                matchedCharacter.pvpStats = character.pvpStats;
            }

            props.setProfile(foundProfile);
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
            props.reset();
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
