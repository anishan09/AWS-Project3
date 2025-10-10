import React from "react";
import Hero from "./Home/Hero";
import Service from "./Home/Services";
import Cleanliness from "./Home/Cleanliness";
import News from "./Home/News";


const Home = () =>{
    return (
        <div className="pt-6 ">
            <Hero />
            <Service />
            <Cleanliness />
            <News />
        </div>
    )
}
export default Home