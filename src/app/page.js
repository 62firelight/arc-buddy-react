"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import Stat from "./components/Stat";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");

    let statList = undefined;
    if (profile.mergedStats !== undefined) {
        statList = Object.keys(profile.mergedStats).map((stat) => (
            <Stat
                key={stat}
                name={stat}
                value={profile.mergedStats[stat].basic.displayValue}
            />
        ));
    }

    return (
        <div>
            <h1>Arc Buddy</h1>
            <Search setProfile={setProfile} setError={setError} />
            <div className="error">{error}</div>
            <div className="stats">{statList}</div>
        </div>
    );
}
