"use client";

import { Helper } from "../Helper";
import Stat from "./Stat";

export function StatSection(props) {

    let hasUndefined = true;
    const statList = Array.from(props.sectionStatNames.keys()).map((stat) => {
        // Only show stats that are known
        if (props.sectionStatNames.get(stat) !== undefined && props.stats[stat] !== undefined) {
            hasUndefined = false; // as there is at least one stat in this section
            return (
                <Stat
                    key={stat}
                    sectionStatNames={props.sectionStatNames}
                    name={stat}
                    value={props.stats[stat].basic.value}
                    displayValue={props.stats[stat].basic.displayValue}
                />
            );
        } else {
            return;
        }
    });

    // Hide section name if there are no known stats for it
    if (hasUndefined) {
        return;
    } else {
        return (
            <div className="stat-section-container">
                <h3>{props.sectionName}</h3>
                <hr />
                <div className="stat-section">{statList}</div>
            </div>
        );
    }
}
