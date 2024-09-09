import React from "react";
import "./Homepage.css";

const Homepage = () => {
    return (
        <>
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to MoneyMind</h1>
                    <p>Connecting Investors with Social Media-Based Entrepreneurs</p>
                    <img
                        src="https://img.freepik.com/premium-photo/quotdiverse-team-factory-workers-celebratingquot_1280275-237202.jpg?w=1060"
                        alt="Investment Opportunities"
                        className="hero-image"
                    />
                </div>
            </header>

            <section className="features-section">
                <h2>Why Choose MoneyMind?</h2>
                <div className="features">
                    <div className="feature-item">
                        <img
                            src="https://img.freepik.com/premium-photo/professionals-cluttered-desk_1030879-16895.jpg?ga=GA1.1.1012450790.1724142538&semt=ais_hybrid"
                            alt="Social Media Integration"
                        />
                        <h3>Social Media Integration</h3>
                        <p>Leverage the power of social media to discover and connect with promising entrepreneurs.</p>
                    </div>
                    <div className="feature-item">
                        <img
                            src="https://img.freepik.com/free-photo/photorealistic-money-concept_23-2151027565.jpg?ga=GA1.1.1012450790.1724142538&semt=ais_hybrid"
                            alt="Smart Investing"
                        />
                        <h3>Smart Investing</h3>
                        <p>Get insights and analytics to make informed investment decisions.</p>
                    </div>
                    <div className="feature-item">
                        <img
                            src="https://img.freepik.com/free-photo/stacks-coins-arranged-bar-graph_35913-2518.jpg?ga=GA1.1.1012450790.1724142538&semt=ais_hybrid"
                            alt="Secure Platform"
                        />
                        <h3>Secure Platform</h3>
                        <p>Your investments are safe with us, thanks to our state-of-the-art security measures.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 MoneyMind. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Homepage;
