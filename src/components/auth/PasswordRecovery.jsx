import React, { useState } from "react";
import axios from "axios";

const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/request-otp/", { email });
      setStep(2);
      setMessage("OTP sent to your email.");
    } catch (error) {
      setMessage("Failed to send OTP.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      await axios.post("http://localhost:8000/api/verify-otp/", { email, otp });
      setStep(3);
      setMessage("OTP verified. You can now reset your password.");
    } catch (error) {
      setMessage("Invalid OTP.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await axios.post("http://localhost:8000/api/reset-password/", { email, newPassword });
      alert("Password updated! You can now log in.");
      window.location.href = "/login";
    } catch (error) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Password Recovery</h3>
        {message && <div className="alert alert-info">{message}</div>}
        {step === 1 && (
          <div>
            <div className="mb-3">
              <label className="form-label">Enter your email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleEmailSubmit}>
              Send OTP
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleOtpVerify}>
              Verify OTP
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" onClick={handlePasswordReset}>
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
