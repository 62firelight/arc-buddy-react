"use client"

export function ActivityFilter(props) {
    function handleChange(e) {
        props.setActivityFilter(e.target.value);
    }

    return (
        <div>
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
        </div>
    )
}