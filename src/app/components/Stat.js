"use client";

import { Helper } from "../Helper";

export default function Stat(props) {
    function convertFromCamelCase(string) {
        return string
        // insert a space before all caps
        .replace(/([A-Z])/g, " $1")
        // uppercase the first character
        .replace(/^./, function (str) {
            return str.toUpperCase();
        });
    }

    function formatName(name) {
        return props.sectionStats.get(name);
    }

    function formatValue(displayValue) {
        // Show time played in hours
        if (props.name === "secondsPlayed") {         
            return Math.floor(props.value / 3600) + " hours";
        }

        // Format numerical values
        const parsedValue = +displayValue;
        if (!isNaN(parsedValue)) {
            return parsedValue.toLocaleString(undefined, {maximumFractionDigits:2});
        }

        return displayValue;
    }

    const formattedName = formatName(props.name);
    const formattedDisplayValue = formatValue(props.displayValue);

    return (
        <div className="stat">
            <h3>{formattedName}</h3>
            {formattedDisplayValue}
        </div>
    );
}
