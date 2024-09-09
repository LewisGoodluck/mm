import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About MoneyMind</h1>
            <p className="about-text">
                MoneyMind is a platform designed to bridge the gap between investors and 
                social media-based entrepreneurs. We aim to provide investors with unique 
                opportunities by connecting them with innovative business minds who are 
                leveraging social media to grow their businesses.
            </p>
            <p className="about-text">
                Our mission is to empower both parties—investors and entrepreneurs—by 
                providing tools, insights, and a secure platform where they can collaborate 
                and achieve mutual success.
            </p>
            <img
                src="https://img.freepik.com/free-photo/business-hand-robot-handshake-artificial-intelligence-digital-transformation_53876-138972.jpg?ga=GA1.1.1012450790.1724142538&semt=ais_hybrid"
                alt="Connecting Investors and Entrepreneurs"
                className="about-image"
            />
        </div>
    );
};

export default About;
