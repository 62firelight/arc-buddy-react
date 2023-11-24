"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import { ActivityFilter } from "./components/ActivityFilter";
import { CharacterFilter } from "./components/CharacterFilter";
import { Stats } from "./components/Stats";
import { useRouter } from "next/navigation";

export default function Home() {
    const [profile, setProfile] = useState(undefined);
    const [characterFilter, setCharacterFilter] = useState(-1);
    const [activityFilter, setActivityFilter] = useState("all");
    const [error, setError] = useState("");

    const router = useRouter();

    function reset() {
        // Reset query params
        router.replace('/', undefined, { shallow: true });

        // Reset state
        setProfile(undefined);
        setError("");
        setCharacterFilter(-1);
        setActivityFilter("all");
    }

    function resetAfterSubmission() {
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

    const characterList =
        profile === undefined
            ? undefined
            : profile.characters.map((character, index) => (
                  <option key={character.characterId} value={index}>
                      {character.race} {character.class} ({character.light})
                  </option>
              ));

    return (
        <div>
            <h1 id="app-heading" onClick={reset}>Arc Buddy</h1>
            <Search setError={setError} resetAfterSubmission={resetAfterSubmission} />
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
            <Stats
                profile={profile}
                displayedStats={displayedStats}
                setProfile={setProfile}
                setError={setError}
            />
        </div>
    );
}
