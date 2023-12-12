"use client";

import { useSearchParams } from "next/navigation";
import { getProfile, getHistoricalStatsForAccount } from "../endpoints/apiEndpoints";
import { StatSection } from "./StatSection";
import { Helper } from "../Helper";
import { useMemo } from "react";
import { Oval } from "react-loader-spinner";

const classMap = {
    0: "Titan",
    1: "Hunter",
    2: "Warlock",
};

const raceMap = {
    0: "Human",
    1: "Awoken",
    2: "Exo",
};

export function Stats(props) {
    const searchParams = useSearchParams();
    const paramMembershipType = searchParams.get("membershipType");
    const paramMembershipId = searchParams.get("membershipId");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => fetchStats(), [paramMembershipId]);

    async function fetchStats() {
        if (paramMembershipType === null || paramMembershipId === null) {
            return;
        }

        let foundProfile = {
            membershipType: paramMembershipType,
            membershipId: paramMembershipId,
        };

        const getProfileResponse = await getProfile(
            foundProfile.membershipType,
            foundProfile.membershipId,
            {
                components: [100, 200]
            }
        );
        try {
            const body = await getProfileResponse.json();

            // fetch required details about Destiny profile
            let profile = body.Response.profile.data.userInfo;

            // fetch required details about each character
            const characters = body.Response.characters.data;
            let fetchedCharacters = [];
            for (let [index] of Object.entries(characters)) {
                const fetchedCharacter = characters[index];

                let newCharacter = {};
                newCharacter = {};
                newCharacter.characterId = fetchedCharacter.characterId;
                newCharacter.race = raceMap[fetchedCharacter.raceType];
                newCharacter.class = classMap[fetchedCharacter.classType];
                newCharacter.light = fetchedCharacter.light;
                newCharacter.emblem = `https://www.bungie.net${fetchedCharacter.emblemBackgroundPath}`;

                fetchedCharacters.push(newCharacter);
            }

            profile.characters = fetchedCharacters;
            foundProfile = profile;
        } catch (error) {
            const status = await getProfileResponse.status;
            console.log(error);
            if (status === 404) {
                props.setError(
                    "Could not find characters for specified Destiny 2 player"
                );
            }
            return;
        }

        const getHistoricalStatsForAccountResponse = await getHistoricalStatsForAccount(
            foundProfile.membershipType,
            foundProfile.membershipId
        );
        try {
            const body = await getHistoricalStatsForAccountResponse.json();

            foundProfile.mergedStats =
                body.Response.mergedAllCharacters.merged.allTime;
            foundProfile.pveStats =
                body.Response.mergedAllCharacters.results.allPvE.allTime;
            foundProfile.pvpStats =
                body.Response.mergedAllCharacters.results.allPvP.allTime;

            const characters = body.Response.characters;
            for (const character of characters) {
                if (character.deleted === false) {
                    // Characters are not always listed in the right order,
                    // so we should manually match the character IDs just to
                    // be 100% sure
                    const matchedCharacter = foundProfile.characters.find(
                        (newCharacter) =>
                            character.characterId === newCharacter.characterId
                    );

                    matchedCharacter.mergedStats = character.merged.allTime;
                    matchedCharacter.pveStats =
                        character.results.allPvE.allTime;
                    matchedCharacter.pvpStats =
                        character.results.allPvP.allTime;
                }
            }

            props.setProfile(foundProfile);
            props.setName("");
        } catch (error) {
            const status = await getHistoricalStatsForAccountResponse.status;
            console.log(error);
            if (status === 404) {
                props.setError(
                    "Could not find historical stats for specified Destiny 2 player"
                );
            }
            return;
        }
    }

    let profileName = undefined;
    if (props.profile !== undefined) {
        profileName = (
            <h2>
                {props.profile.bungieGlobalDisplayName}
                <span className="name-code">
                    #
                    {props.profile.bungieGlobalDisplayNameCode.toString()
                        .length === 3
                        ? "0"
                        : ""}
                    {props.profile.bungieGlobalDisplayNameCode}
                </span>
            </h2>
        );
    }

    let spinner = undefined;
    if (
        props.error.length <= 0 &&
        paramMembershipId !== null &&
        props.profile === undefined &&
        props.displayedStats === undefined
    ) {
        spinner = (
            <div className="spinner">
                <Oval color="darkblue" secondaryColor="cyan" />
                <span>Searching...</span>
            </div>
        );
    }

    let errorNoStatsFound = undefined;
    if (props.profile !== undefined && props.displayedStats === undefined) {
        errorNoStatsFound = (
            <div className="no-stats-found">
                No stats matching the filters were found.
            </div>
        );
    }

    let statSectionList = undefined;
    if (props.displayedStats !== undefined) {
        statSectionList = Array.from(Helper.sections.keys()).map((section) => (
            <StatSection
                key={section}
                sectionName={section}
                sectionStatNames={Helper.sections.get(section)}
                stats={props.displayedStats}
            />
        ));
    }

    return (
        <div className="stats">
            {profileName}
            {spinner}
            {errorNoStatsFound}
            {statSectionList}
        </div>
    );
}
