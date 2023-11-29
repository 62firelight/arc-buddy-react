"use client";

export function CharacterFilter(props) {
    return (
        <div className="filter">
            <div className="characters">
                <div className="character">
                    <button
                        className="all-characters-button"
                        onClick={() => props.setCharacterFilter(-1)}
                    >
                        All Characters
                    </button>
                    {props.characterFilter !== -1 ? undefined : <div className="arrow-right"></div>}
                </div>

                {props.characterList}
            </div>
        </div>
    );
}
