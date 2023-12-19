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
import { useWindowWidth } from "@react-hook/window-size";

export function StatSection(props) {
    const windowWidth = useWindowWidth();
    const [viewAsChart, setViewAsChart] = useState(false);
    const [weaponFilter, setWeaponFilter] = useState("all");

    function formatName(name) {
        return props.sectionStatNames.get(name);
    }

    function formatValue(displayValue, isSecondsPlayed = false) {
        // Show time played in hours
        if (isSecondsPlayed) {
            return Math.floor(displayValue / 3600) + " hours";
        }

        // Format numerical values
        const parsedValue = +displayValue;
        if (!isNaN(parsedValue)) {
            return parsedValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
        }

        return displayValue;
    }

    let hasUndefined = true;
    const statList = Array.from(props.sectionStatNames.keys()).map((stat) => {
        // Only show stats that are known
        if (
            props.sectionStatNames.get(stat) !== undefined &&
            props.stats[stat] !== undefined
        ) {
            hasUndefined = false; // as there is at least one stat in this section

            const formattedName = formatName(stat);

            let formattedDisplayValue = undefined;
            if (stat === "secondsPlayed") {
                formattedDisplayValue = formatValue(
                    props.stats[stat].basic.value,
                    true
                );
            } else {
                formattedDisplayValue = formatValue(
                    props.stats[stat].basic.displayValue
                );
            }

            return (
                <Stat
                    key={stat}
                    sectionStatNames={props.sectionStatNames}
                    formattedName={formattedName}
                    formattedDisplayValue={formattedDisplayValue}
                />
            );
        } else {
            return;
        }
    });

    let weaponChartData = undefined;
    if (props.sectionName === "Weapon Kills") {
        // using flat map to reduce the number of weapon types in the array (but only if filtered)
        weaponChartData = Array.from(props.sectionStatNames.keys()).flatMap(
            (stat) => {
                // Only show stats that are known
                if (
                    props.sectionStatNames.get(stat) !== undefined &&
                    props.stats[stat] !== undefined
                ) {
                    hasUndefined = false; // as there is at least one stat in this section

                    const formattedName = formatName(stat);

                    if (
                        weaponFilter === "all" ||
                        (weaponFilter === "primary" &&
                            Helper.primaryWeapons.has(formattedName)) ||
                        (weaponFilter === "special" &&
                            Helper.specialWeapons.has(formattedName)) ||
                        (weaponFilter === "power" &&
                            Helper.powerWeapons.has(formattedName))
                    ) {
                        return {
                            name: formattedName,
                            value: props.stats[stat].basic.value,
                        };
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            }
        );
    }

    function handleChange(e) {
        setWeaponFilter(e.target.value);
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
                    <div className="weapon-options">
                        <button onClick={() => setViewAsChart(!viewAsChart)}>
                            {viewAsChart === false
                                ? "View as Chart"
                                : "View as Text"}
                        </button>
                        {viewAsChart === true ? (
                            <select
                                name="weapon-chart-filter"
                                id="weapon-chart-filter-select"
                                value={weaponFilter}
                                onChange={handleChange}
                            >
                                <option value="all">All Types</option>
                                <option value="primary">Primary</option>
                                <option value="special">Special</option>
                                <option value="power">Power</option>
                            </select>
                        ) : (
                            ""
                        )}
                    </div>
                )}
                {viewAsChart === false ? (
                    <div className="stat-section">{statList}</div>
                ) : (
                    <ResponsiveContainer minWidth={320} minHeight={400}>
                        <BarChart data={weaponChartData}>
                            <XAxis
                                dataKey="name"
                                interval={0}
                                angle={windowWidth > 1024 ? -30 : -90}
                                textAnchor="end"
                                minTickGap={1000}
                                height={100}
                            />
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
