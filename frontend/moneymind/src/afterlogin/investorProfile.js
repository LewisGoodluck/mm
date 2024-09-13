import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { csrfToken } from "../utility";
import './investorProfile.css'; // Import the CSS file

const InvestorProfile = () => {
    const { username } = useContext(Context);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/customer/view', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken()
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfiles(data);  // Set the profiles state with the array of profiles
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [username]);

    if (loading) {
        return <div className="status-message loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="status-message error-message">Error: {error}</div>;
    }

    if (profiles.length === 0) {
        return <div className="status-message">No profile data available.</div>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-header">Welcome {username}</h2>
            <table className="profile-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Date of Birth</th>
                        <th>IG Account</th>
                        <th>Type of Business</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile.username}>
                            <td>{profile.username}</td>
                            <td>{profile.dob}</td>
                            <td><a href={profile.ig} target="_blank" rel="noopener noreferrer">{profile.ig}</a></td>
                            <td>{profile.business}</td>
                            <td><button onClick={()=>alert("one step richer")}>INVEST</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvestorProfile;
