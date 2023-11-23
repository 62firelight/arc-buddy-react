"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import Stat from "./components/Stat";
import { Helper } from "./Helper";
import { StatSection } from "./components/StatSection";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [activityFilter, setActivityFilter] = useState("all");
    const [error, setError] = useState("");

    function getDisplayedStats() {
        if (profile === undefined) {
            return undefined;
        }

        switch (activityFilter) {
            case "all":
                return profile.mergedStats;
            case "pve":
                return profile.pveStats;
            case "pvp":
                return profile.pvpStats;
            default:
                break;
        }

        return undefined;
    }
    const displayedStats = getDisplayedStats();

    let statSectionList = undefined;
    if (displayedStats !== undefined) {
        statSectionList = Array.from(Helper.sections.keys()).map((section) => (
            <StatSection
                key={section}
                sectionName={section}
                sectionStatNames={Helper.sections.get(section)}
                stats={displayedStats}
            />
        ));
    }

    function handleChange(e) {
        setActivityFilter(e.target.value);
    }

    return (
        <div>
            <h1>Arc Buddy</h1>
            <Search setProfile={setProfile} setError={setError} />
            <div className="error">{error}</div>

            <label>Activity Filter: </label>
            <select
                name="activity-filter"
                id="activity-filter-select"
                defaultValue="all"
                onChange={handleChange}
            >
                <option value="all">All</option>
                <option value="pve">PvE</option>
                <option value="pvp">PvP</option>
            </select>
            <div className="stats">{statSectionList}</div>
        </div>
    );
}
