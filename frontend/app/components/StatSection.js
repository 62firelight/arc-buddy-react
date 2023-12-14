"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Helper } from "../Helper";
import Stat from "./Stat";
import { useState } from "react";

export function StatSection(props) {
    const [viewAsGraph, setViewAsGraph] = useState(false);

    let hasUndefined = true;
    const statList = Array.from(props.sectionStatNames.keys()).map((stat) => {
        // Only show stats that are known
        if (
            props.sectionStatNames.get(stat) !== undefined &&
            props.stats[stat] !== undefined
        ) {
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

    let weaponGraphData = undefined;
    if (props.sectionName === "Weapon Kills") {
        weaponGraphData = Array.from(props.sectionStatNames.keys()).map(
            (stat) => {
                // Only show stats that are known
                if (
                    props.sectionStatNames.get(stat) !== undefined &&
                    props.stats[stat] !== undefined
                ) {
                    hasUndefined = false; // as there is at least one stat in this section
                    return {
                        name: stat,
                        value: props.stats[stat].basic.value,
                    };
                } else {
                    return;
                }
            }
        );
    }

    // Hide section name if there are no known stats for it
    if (hasUndefined) {
        return;
    } else {
        return (
            <div className="stat-section-container">
                <h3>{props.sectionName}</h3>
                <hr />
                {props.sectionName === "Weapon Kills" && (
                    <button onClick={() => setViewAsGraph(!viewAsGraph)}>
                        {viewAsGraph === false
                            ? "View as Graph"
                            : "View as Text"}
                    </button>
                )}
                {viewAsGraph === false ? (
                    <div className="stat-section">{statList}</div>
                ) : (
                    <ResponsiveContainer minWidth={400} minHeight={400}>
                        <BarChart data={weaponGraphData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        );
    }
}
