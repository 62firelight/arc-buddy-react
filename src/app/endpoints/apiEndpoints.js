const serverUrl = "http://localhost:3000/";

export async function getBungieName(name, id) {
    const response = await fetch(`${serverUrl}api/players/${name}/${id}`);
    return response;
}

export async function getCharacters(membershipType, membershipId) {
    const response = await fetch(
        `${serverUrl}api/players/character/${membershipType}/${membershipId}`
    );
    return response;
}

export async function getHistoricalStats(membershipType, membershipId) {
    const response = await fetch(
        `${serverUrl}api/players/account/${membershipType}/${membershipId}`
    );
    return response;
}
