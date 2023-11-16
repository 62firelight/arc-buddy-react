"use client"
import Search from "./components/Search";

export default function Home() {
    function searchName(name) {
        console.log(name);
    }

    return (
        <div>
            <h1>Arc Buddy</h1>

            <Search searchName={searchName}/>
        </div>
    );
}
