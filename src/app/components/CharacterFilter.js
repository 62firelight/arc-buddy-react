"use client";

export function CharacterFilter(props) {
    function handleChange(e) {
        props.setCharacterFilter(e.target.value);
    }

    return (
        <div className="filter">
            <label>Character Filter</label>
            <button onClick={() => props.setCharacterFilter(-1)}>
                All Characters
            </button>
            <div className="characters">{props.characterList}</div>
        </div>
    );

    // return (
    //     <div className="filter">
    //         <label>Character Filter</label>
    //         <select
    //             name="character-filter"
    //             id="character-filter-select"
    //             value={props.characterFilter}
    //             onChange={handleChange}
    //         >
    //             <option value="-1">All Characters</option>
    //             {props.characterList}
    //         </select>
    //     </div>
    // );
}
