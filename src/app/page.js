"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");

    const statList =
        profile.mergedStats !== undefined
            ? Object.keys(profile.mergedStats).map((stat) => (
                  <li key={stat}>
                      {stat}: {profile.mergedStats[stat].basic.displayValue}
                  </li>
              ))
            : undefined;

    return (
        <div>
            <h1>Arc Buddy</h1>
            <Search setProfile={setProfile} setError={setError} />
            <div className="error">{error}</div>
            <ul>{statList}</ul>
        </div>
    );
}
