import React from "react";

export default function Searchsection(){
    return(
        <div className="searchsection">
            <div className="search--text">
                <h2>Work, Relax, Explore and Thrive Better.</h2>
                <p>Discover a balanced life with tools and tips for productivity, leisure, adventure, and personal growth.</p>
            </div>
            <div className="search--container">
                <div className="search--div">
                    <input type="text" placeholder="Search Products" />
                    <button >Search</button>
                </div>
            </div>
        </div>
    )
}