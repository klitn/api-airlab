import './Hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="text-primary">AirLabs</span> Flight Tracker
                </h1>

                <p className="hero-description">
                    Search for real-time flight information from around the world
                </p>
            </div>
        </div>
    );
};

export default Hero;
