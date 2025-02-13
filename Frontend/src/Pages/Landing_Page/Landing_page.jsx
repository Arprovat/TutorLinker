import Footer from "../../Components/Footer/Footer";
import Feature from "../../Components/Feature/Feature";
import Navbar from "../../Components/Navber/Navber";
import HeroSection from "../../Components/HeroSection/HeroSection"; 
import { useState } from "react";
import Bg_Blurry_blob from "../../Components/Bg_Blurry blob/Bg_Blurry blob";
const Landing_page = () => {
    const [theme, setTheme] = useState("dark");
    return (
        <div>
<section>
    <Bg_Blurry_blob/>
    <Navbar theme={theme} setTheme={setTheme}/>
    <HeroSection theme={theme}/>
</section>
<Feature theme={theme}/>
<Footer theme={theme}/>
        </div>
    );
};

export default Landing_page;