"use client";

import { Helper } from "../Helper";
import Stat from "./Stat";

export function StatSection(props) {
    const statList = Array.from(props.sectionStatNames.keys()).map((stat) => {
        // Only show stats that are known
        if (props.sectionStatNames.get(stat) !== undefined) {
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

    return (
        <div>
            <h2>{props.sectionName}</h2>
            <div className="stat-section">{statList}</div>
        </div>
    );
}
