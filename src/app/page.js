"use client"
import { useState } from "react";
import Search from "./components/Search";

export default function Home() {
    const [error, setError] = useState("");

    async function findBungieName(name, id) {
        const response = await fetch(`http://localhost:3000/api/players/${name}/${id}`);
        
        try {
            const body = await response.json();
            console.log(body);
        } catch (error) {
            const status = await response.status;
            
            if (status === 404) {
                setError("Could not find specified Destiny 2 player");
            }
        }

    }

    return (
        <div>
            <h1>Arc Buddy</h1>

            <Search findBungieName={findBungieName} setError={setError}/>

            <div className="error">{error}</div>
        </div>
    );
}
