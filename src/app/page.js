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

    let statSectionList = undefined;
    if (profile.mergedStats !== undefined) {
        statSectionList = Array.from(Helper.sections.keys()).map((section) => (
            <StatSection
                key={section}
                sectionName={section}
                sectionStatNames={Helper.sections.get(section)}
                stats={profile.mergedStats}
            />
        ));
    }

    return (
        <div>
            <h1>Arc Buddy</h1>
            <Search setProfile={setProfile} setError={setError} />
            <div className="error">{error}</div>
            <div className="stats">{statSectionList}</div>
        </div>
    );
}
