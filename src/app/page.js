"use client";
import { useState } from "react";
import Search from "./components/Search";
import _ from "lodash";
import { ActivityFilter } from "./components/ActivityFilter";
import { CharacterFilter } from "./components/CharacterFilter";
import { Stats } from "./components/Stats";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Links from "./components/Links";

export default function Home() {
    const [profile, setProfile] = useState(undefined);
    const [characterFilter, setCharacterFilter] = useState(-1); // -1 = all characters
    const [activityFilter, setActivityFilter] = useState("all");
    const [error, setError] = useState("");

    const router = useRouter();

    function reset() {
        // Reset query params
        router.replace("/", undefined, { shallow: true });

        // Reset state
        setProfile(undefined);
        setError("");
        setCharacterFilter(-1);
        setActivityFilter("all");
    }

    function resetAfterSubmission() {
        setProfile(undefined);
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

    let characterList = undefined;
    if (profile !== undefined) {
        characterList = profile.characters.map((character, index) => (
            <div
                className="character"
                key={character.characterId}
                onClick={() => setCharacterFilter(index)}
            >
                <img
                    src={character.emblem}
                    alt="emblem"
                    className="character-emblem"
                />
                <div className="character-info">
                    <div className="character-class-light">
                        {character.class}

                        <div className="character-light">
                            <strong>{character.light}</strong>
                        </div>
                    </div>

                    <small>{character.race}</small>
                </div>
                {characterFilter !== index ? undefined : (
                    <div className="arrow-right"></div>
                )}
            </div>
        ));
    }

    return (
        <div>
            <h1 id="app-heading" onClick={reset}>
                Arc Buddy
            </h1>
            <Search
                setError={setError}
                resetAfterSubmission={resetAfterSubmission}
            />
            <div className="error">{error}</div>

            <div className="stats-container">
                {profile === undefined ? undefined : (
                    <div className="left-content">
                        <div className="filters">
                            <h2>Filters</h2>
                            <ActivityFilter
                                activityFilter={activityFilter}
                                setActivityFilter={setActivityFilter}
                            />
                            <CharacterFilter
                                characterList={characterList}
                                characterFilter={characterFilter}
                                setCharacterFilter={setCharacterFilter}
                            />
                        </div>
                        <Links 
                            membershipType={profile.membershipType}
                            membershipId={profile.membershipId}
                        />
                    </div>
                )}

                <div className="right-content">
                    <Stats
                        profile={profile}
                        displayedStats={displayedStats}
                        setProfile={setProfile}
                        error={error}
                        setError={setError}
                    />
                </div>
            </div>
        </div>
    );
}
