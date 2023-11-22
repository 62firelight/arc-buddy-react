"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import Stat from "./components/Stat";
import { Helper } from "./Helper";
import { StatSection } from "./components/StatSection";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");

    let statList = undefined;
    if (profile.mergedStats !== undefined) {
        statList = Array.from(Helper.sections.keys()).map((section) => (
            <StatSection
                key={section}
                sectionName={section}
                sectionStats={Helper.sections.get(section)}
                stats={profile.mergedStats}
            />
        ));

        // statList = Object.keys(profile.mergedStats).map((stat) => {
        //     // Only show stats that are known
        //     if (Helper.sections.get(stat) !== undefined) {
        //         return (
        //             <Stat
        //                 key={stat}
        //                 name={stat}
        //                 value={profile.mergedStats[stat].basic.value}
        //                 displayValue={
        //                     profile.mergedStats[stat].basic.displayValue
        //                 }
        //             />
        //         );
        //     }
        // });
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
