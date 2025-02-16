import Footer from "../../Components/Footer/Footer";
import Feature from "../../Components/Feature/Feature";
import HeroSection from "../../Components/HeroSection/HeroSection"; 
import Bg_Blurry_blob from "../../Components/Bg_Blurry blob/Bg_Blurry blob";
import PropTypes from "prop-types";
const Landing_page = ({theme}) => {
    return (
        <div>
<section>
    <Bg_Blurry_blob duration={20}/>
    <HeroSection theme={theme}/>
    <Bg_Blurry_blob duration={10}/>
</section>
<Feature theme={theme}/>
<Footer theme={theme}/>
        </div>
    );
};

Landing_page.propTypes = {
    theme: PropTypes.string.isRequired,
};

export default Landing_page;