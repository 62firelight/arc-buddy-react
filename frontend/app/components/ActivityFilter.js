"use client"

export function ActivityFilter(props) {
    function handleChange(e) {
        props.setActivityFilter(e.target.value);
    }

    return (
        <div className="filter">
            <select
                name="activity-filter"
                id="activity-filter-select"
                value={props.activityFilter}
                onChange={handleChange}
            >
                <option value="all">All (PvE + PvP)</option>
                <option value="pve">PvE</option>
                <option value="pvp">PvP</option>
            </select>
        </div>
    )
}