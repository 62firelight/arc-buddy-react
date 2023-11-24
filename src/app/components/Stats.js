"use client"

import { useSearchParams } from "next/navigation";
import { getCharacters, getHistoricalStats } from "../endpoints/apiEndpoints";
import { StatSection } from "./StatSection";
import { Helper } from "../Helper";
import { useMemo } from "react";

export function Stats(props) {
    const searchParams = useSearchParams();
    const paramMembershipType = searchParams.get("membershipType");
    const paramMembershipId = searchParams.get("membershipId");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => fetchStats(), [paramMembershipId])

    async function fetchStats() {
        if (paramMembershipType === null || paramMembershipId === null) {
            return;
        }

        let foundProfile = {
            membershipType: paramMembershipType,
            membershipId: paramMembershipId,
        };

        const getCharactersResponse = await getCharacters(
            foundProfile.membershipType,
            foundProfile.membershipId
        );
        try {
            const body = await getCharactersResponse.json();
            foundProfile = body;
        } catch (error) {
            const status = await getCharactersResponse.status;
            console.log(error);
            if (status === 404) {
                props.setError(
                    "Could not find characters for specified Destiny 2 player"
                );
            }
            return;
        }

        const getHistoricalStatsResponse = await getHistoricalStats(
            foundProfile.membershipType,
            foundProfile.membershipId
        );
        try {
            const body = await getHistoricalStatsResponse.json();

            foundProfile.mergedStats = body.mergedStats;
            foundProfile.pveStats = body.pveStats;
            foundProfile.pvpStats = body.pvpStats;
            for (const character of body.characters) {
                // Characters are not always listed in the right order,
                // so we should manually match the character IDs just to
                // be 100% sure
                const matchedCharacter = foundProfile.characters.find(
                    (newCharacter) =>
                        character.characterId === newCharacter.characterId
                );

                matchedCharacter.mergedStats = character.mergedStats;
                matchedCharacter.pveStats = character.pveStats;
                matchedCharacter.pvpStats = character.pvpStats;
            }

            props.setProfile(foundProfile);
        } catch (error) {
            const status = await getHistoricalStatsResponse.status;
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
        profileName = props.profile.bungieGlobalDisplayName + "#" + props.profile.bungieGlobalDisplayNameCode;
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

    return <div className="stats"><h2>{profileName}</h2>{statSectionList}</div>;
}