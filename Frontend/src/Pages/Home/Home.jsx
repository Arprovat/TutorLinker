import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
    const [theme, setTheme] = useState("light");
    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <Outlet context={{theme}}/>
            
        </div>
    );
};

export default Home;