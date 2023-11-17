"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [mergedStats, setMergedStats] = useState({});
    const [error, setError] = useState("");

    // API endpoints
    const serverUrl = "http://localhost:3000/";
    async function getBungieName(name, id) {
        const response = await fetch(`${serverUrl}api/players/${name}/${id}`);
        return response;
    }
    async function getCharacters(membershipType, membershipId) {
        const response = await fetch(
            `${serverUrl}api/players/character/${membershipType}/${membershipId}`
        );
        return response;
    }
    async function getHistoricalStats(membershipType, membershipId) {
        const response = await fetch(
            `${serverUrl}api/players/account/${membershipType}/${membershipId}`
        );
        return response;
    }

    async function searchBungieName(name, id) {
        const getBungieNameResponse = await getBungieName(name, id);
        try {
            const body = await getBungieNameResponse.json();
            setProfile(body);
        } catch (error) {
            const status = await getBungieNameResponse.status;
            console.log(error);
            if (status === 404) {
                setError("Could not find specified Destiny 2 player");
            }
            return;
        }

        const getCharactersResponse = await getCharacters(
            profile.membershipType,
            profile.membershipId
        );
        try {
            const body = await getCharactersResponse.json();
            setProfile(body);
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
            profile.membershipType,
            profile.membershipId
        );
        try {
            const body = await getHistoricalStatsResponse.json();

            let newProfile = {};
            newProfile.characters = body.characters;
            newProfile.mergedStats = body.mergedStats;
            newProfile.pveStats = body.pveStats;
            newProfile.pvpStats = body.pvpStats;

            setProfile(_.merge(profile, newProfile));
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
        console.log(profile);
        setMergedStats(profile.mergedStats);
    }

    const testObj = { stuff: "things", yes: "no", hot: "cold" };
    const statList = Object.keys(mergedStats).map((stat) => (
        <li key={stat}>
            {stat}: {mergedStats[stat].basic.displayValue}
        </li>
    ));
    console.log(statList);

    return (
        <div>
            <h1>Arc Buddy</h1>

            <Search searchBungieName={searchBungieName} setError={setError} />

            <div className="error">{error}</div>

            <ul>{statList}</ul>
        </div>
    );
}
