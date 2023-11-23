"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import Stat from "./components/Stat";
import { Helper } from "./Helper";
import { StatSection } from "./components/StatSection";
import { ActivityFilter } from "./components/ActivityFilter";
import { CharacterFilter } from "./components/CharacterFilter";

export default function Home() {
    const [profile, setProfile] = useState({});
    const [characterFilter, setCharacterFilter] = useState(-1);
    const [activityFilter, setActivityFilter] = useState("all");
    const [error, setError] = useState("");

    function reset() {
        setError("");
        setCharacterFilter(-1);
        setActivityFilter("all");
    }

    function getDisplayedStats() {
        if (profile === undefined) {
            return undefined;
        }

        let character = profile;
        if (characterFilter >= 0) {
            character = profile.characters[characterFilter];
        }

        switch (activityFilter) {
            case "all":
                return character.mergedStats;
            case "pve":
                return character.pveStats;
            case "pvp":
                return character.pvpStats;
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

    const characterList =
        profile.characters === undefined
            ? undefined
            : profile.characters.map((character, index) => (
                  <option key={character.characterId} value={index}>
                      {character.race} {character.class} ({character.light})
                  </option>
              ));

    const profileName =
        profile.bungieGlobalDisplayName === undefined &&
        profile.bungieGlobalDisplayNameCode === undefined
            ? undefined
            : profile.bungieGlobalDisplayName +
              "#" +
              profile.bungieGlobalDisplayNameCode;

    return (
        <div>
            <h1>Arc Buddy</h1>
            <Search setProfile={setProfile} reset={reset} />
            <div className="error">{error}</div>

            <CharacterFilter
                characterList={characterList}
                characterFilter={characterFilter}
                setCharacterFilter={setCharacterFilter}
            />
            <ActivityFilter
                activityFilter={activityFilter}
                setActivityFilter={setActivityFilter}
            />
            <h2>{profileName}</h2>
            <div className="stats">{statSectionList}</div>
        </div>
    );
}
