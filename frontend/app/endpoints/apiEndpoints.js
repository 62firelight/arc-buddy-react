const serverUrl = "http://localhost:3000/";

export async function searchDestinyPlayerByBungieName(name, id) {
    const response = await fetch(`${serverUrl}api/players/${name}/${id}`);
    return response;
}

export async function getProfile(membershipType, membershipId, components) {
    const response = await fetch(
        `${serverUrl}api/players/character/${membershipType}/${membershipId}?` + new URLSearchParams(components)
    );
    return response;
}

export async function getHistoricalStatsForAccount(membershipType, membershipId) {
    const response = await fetch(
        `${serverUrl}api/players/account/${membershipType}/${membershipId}`
    );
    return response;
}
