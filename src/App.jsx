import React from "react";
import Navbar from "./components/Navbar.jsx";
import MustDo from "./components/MustDo.jsx";
import ShouldDo from "./components/ShouldDo.jsx";
import CouldDo from "./components/CouldDo.jsx";
import MayDo from "./components/MayDo.jsx";

export default function App() {
    return(
        <div className="all--body">
            <div className="container">
                <Navbar />
                <section className="sections">
                    <MustDo />
                    <ShouldDo />
                    <CouldDo />
                    <MayDo />
                </section>
            </div>
        </div>
    )
}
