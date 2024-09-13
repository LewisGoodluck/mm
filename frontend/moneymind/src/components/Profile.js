import React, { useState } from "react";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { csrfToken } from "../utility";

const Profile = () => {
    const csrfTokens = csrfToken()
    const username = sessionStorage.getItem("username")

    const [investor,setInvestor] =useState({
        dob:"",
        income_means:"",
        income_range:"",
        acc:""
    });
    const [customer,setCustomer] = useState({
        dob:"",
        ig:"",
        tin:"",
        business:""
    })

    const handleInvestorForm = (e) =>{
        setInvestor({
            ...investor,
            [e.target.name]:e.target.value
        })
    }

    const handleCustomerForm = (e) =>{
        setCustomer({
            ...customer,
            [e.target.name]:e.target.value
        })
    }

    const navigate = useNavigate()
    const [formType, setFormType] = useState(null); // State to control which form to show

    // Handler for button clicks
    const handleButtonClick = (type) => {
        setFormType(type);
    };

    const handleSubmitInvestor = async (e) =>{
        e.preventDefault()
        try{
            const investorData = await fetch("/investorData/",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "X-CSRFToken": csrfTokens
                },
                body:JSON.stringify({...investor,username})
            })
            if(investorData.ok){
                navigate('/investorProfile')
            }else{
                console.log("error occured on the data")
            }
        }catch(err){
            console.log("error",err)
        }
    }

    const handleSubmitCustomer = async (e) =>{
        e.preventDefault()
        try{
            const customerData = await fetch("/customerData/",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "X-CSRFToken" : csrfTokens
                },
                body:JSON.stringify({...customer,username})
            })
            if(customerData.ok){
                navigate('/customerProfile')
            }else{
                console.log("error occured on the data")
            }
        }catch(err){
            console.log("error",err)
        }
    }
  
    return (
        <div className="profile-container">
            <h1 className="setup-message">Let's Set Up Your Profile</h1>
            <div className="button-group">
                <button 
                    onClick={() => handleButtonClick("investor")} 
                    className={formType === "investor" ? "active-btn" : ""}
                >
                    I'm an Investor
                </button>
                <button 
                    onClick={() => handleButtonClick("looking")} 
                    className={formType === "looking" ? "active-btn" : ""}
                >
                    Looking for an Investor
                </button>
            </div>

            {formType === "investor" && (
                <div className="form-wrapper">
                    <h1 className="profile-title">I am an Investor</h1>
                    <form className="profile-form" onSubmit={handleSubmitInvestor}>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob"
                                name="dob"
                                value={investor.dob}
                                onChange={handleInvestorForm}
                                required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="income-means">Means of Income</label>
                            <select id="income-means"
                                name="income_means"
                                value={investor.income_means}
                                onChange={handleInvestorForm}
                                required>
                                <option value="">Select Income Means</option>
                                <option value="salary">Salary</option>
                                <option value="business">Business</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="income-range">Income Range per Month (in TZS)</label>
                            <select id="income-range"
                                name="income_range"
                                value={investor.income_range}
                                onChange={handleInvestorForm}
                                required>
                                <option value="">Select Income Range</option>
                                <option value="under_1m">Under 1,000,000 TZS</option>
                                <option value="1m_to_5m">1,000,000 - 5,000,000 TZS</option>
                                <option value="over_5m">Over 5,000,000 TZS</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="acc">CRDB card number</label>
                            <input type="number" id="acc"
                                name="acc"
                                value={investor.acc}
                                onChange={handleInvestorForm}
                                placeholder="e.g., 01934*****" required />
                        </div>
                        <div className="button-group">
                            <button type="reset" className="clear-btn">Clear Data</button>
                            <button type="submit" className="create-btn" onClick={()=>{console.log({mydata:{...investor,username}})}}>Create Profile</button>
                        </div>
                    </form>
                </div>
            )}

            {formType === "looking" && (
                <div className="form-wrapper">
                    <h1 className="profile-title">Looking for an Investor</h1>
                    <form className="profile-form" onSubmit={handleSubmitCustomer}>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob"
                            name="dob"
                            value={customer.dob}
                            onChange={handleCustomerForm}
                            required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="instagram">Instagram Account Link</label>
                            <input type="url" id="instagram" 
                            name="ig"
                            value={customer.ig}
                            onChange={handleCustomerForm}
                            placeholder="e.g., https://instagram.com/yourprofile" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tin">TIN Number</label>
                            <input type="text" id="tin" 
                            name="tin"
                            value={customer.tin}
                            onChange={handleCustomerForm}
                            placeholder="e.g., 123-456-789" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="business-item">Major Business Item</label>
                            <select id="business-item"
                            name="business"
                            value={customer.business}
                            onChange={handleCustomerForm}
                            required>
                                <option value="">Select Business Item</option>
                                <option value="tech">Technology</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                            </select>
                        </div>
                        <div className="button-group">
                            <button type="reset" className="clear-btn">Clear Data</button>
                            <button type="submit" className="create-btn">Submit Request</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
