import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const interests = ["Technology", "Science", "Art", "Music", "Sports"];
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phoneNumber: "",
    state: "",
    nationality: "",
    profession: "",
    residenceType: "hostel", // Default value
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      return false;
    }
    if (Object.values(formData).some((value) => !value)) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          interests: selectedInterests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Signup successful
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred during signup");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className="flex column">
      <Navbar />
      <div id="signup" className="section flex row fb1 spaceAround">
        <div className="borderBox flex column centerb gap-8">
          <div className="sectionHeading">SIGN UP</div>
          {error && <div className="errorMsg">{error}</div>}

          {/* Name & Email */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g John Doe"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g abc@info.com"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Password</p>
              <div className="flex mobileRow align-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="flexItem"
                />
              </div>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Confirm Password</p>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
              />
            </div>
          </div>

          {/* Gender & Phone */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Phone No</p>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g 1234567890"
              />
            </div>
          </div>

          {/* State & Nationality */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Nationality</p>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="">Select Nationality</option>
                <option value="Nationality 1">Nationality 1</option>
                <option value="Nationality 2">Nationality 2</option>
                <option value="Nationality 3">Nationality 3</option>
              </select>
            </div>

            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">State</p>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="State 1">State 1</option>
                <option value="State 2">State 2</option>
                <option value="State 3">State 3</option>
              </select>
            </div>
          </div>

          {/* Profession & Residence */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Profession</p>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g Software Engineer"
              />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Interests</p>
              <div className="flex row fxwrap gap-8 fWidth">
                {interests.map((interest, idx) => (
                  <p
                    key={idx}
                    className={`interestCard ${
                      selectedInterests.includes(interest) ? "selected" : ""
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
            className="btn transparentBtn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
        <div
          id="loginLeftSection"
          className="section flex column centerb gap-12 noMobile"
        >
          <p className="largeText">
            Attend Events, <br /> Organize Events, <br /> Improve Events
          </p>
        </div>
      </div>
    </div>
  );
}
