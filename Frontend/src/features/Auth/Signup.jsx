import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import Logo from '../../assets/images/logo PNG.png';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profilePicture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Password requirements
  const passwordRequirements = {
    minLength: formData.password.length >= 6,
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    hasUppercase: /[A-Z]/.test(formData.password),
  };

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    setFormData({ ...formData, profilePicture: null });
    document.getElementById('profilePicture').value = '';
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSendingOtp(true);

    try {
      const response = await axios.post("/api/v1/users/sendotp", { 
        email: formData.email 
      });

      console.log('OTP response: ', response);
      toast.success("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
      
    } catch (error) {
      let errorMessage = "Failed to send OTP. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        
        if (error.response.status === 409) {
          errorMessage = "User with this email already exists.";
        } else if (error.response.status === 400) {
          errorMessage = "Invalid email address.";
        } else if (error.response.status === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const response = await axios.post("/api/v1/users/verifyotp", { 
        email: formData.email, 
        otp: otp 
      });

      console.log('OTP verification response: ', response);
      toast.success("OTP verified successfully!");
      setStep(3); // Move to registration step
      await handleRegistration(); // Proceed with registration
      
    } catch (error) {
      let errorMessage = "OTP verification failed.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        
        if (error.response.status === 400) {
          errorMessage = "Invalid OTP. Please check and try again.";
        } else if (error.response.status === 410) {
          errorMessage = "OTP has expired. Please request a new one.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Step 3: Final Registration
  const handleRegistration = async () => {
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.post("/api/v1/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        
        if (error.response.status === 409) {
          errorMessage = "User with this email already exists.";
        } else if (error.response.status === 400) {
          errorMessage = "Invalid data provided. Please check your inputs.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      toast.error(errorMessage);
      setStep(1); // Go back to form if registration fails
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("/api/v1/users/sendotp", { 
        email: formData.email 
      });
      toast.success("New OTP sent to your email!");
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const goBackToForm = () => {
    setStep(1);
    setOtp("");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />

      <div className="bg-white max-w-2xl w-full rounded-lg p-6 shadow-sm border border-gray-200">
        <Link to="/" className="block text-center mb-4">
          <img className="h-12 mx-auto" src={Logo} alt="Logo" />
        </Link>

        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          {step === 1 && "Create Your Account"}
          {step === 2 && "Verify Your Email"}
          {step === 3 && "Creating Your Account"}
        </h2>
        
        <p className="text-center text-gray-600 text-sm mb-6">
          {step === 1 && "Join NewsApp for the latest updates"}
          {step === 2 && `Enter the OTP sent to ${formData.email}`}
          {step === 3 && "Please wait while we create your account..."}
        </p>

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="\d{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10-digit number"
                  required
                />
              </div>

              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center gap-3">
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImagePreview}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                      formData.confirmPassword ? 
                      (formData.password === formData.confirmPassword ? 'border-green-500' : 'border-red-500') : 
                      'border-gray-300'
                    }`}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className={`flex items-center text-xs ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordRequirements.minLength ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  Min 6 characters
                </div>
                <div className={`flex items-center text-xs ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordRequirements.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  One number
                </div>
                <div className={`flex items-center text-xs ${passwordRequirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordRequirements.hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  Special character
                </div>
                <div className={`flex items-center text-xs ${passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${passwordRequirements.hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  Uppercase letter
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingOtp || !allRequirementsMet || formData.password !== formData.confirmPassword}
              className={`w-full py-2 rounded font-medium transition-colors ${
                isSendingOtp || !allRequirementsMet || formData.password !== formData.confirmPassword
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSendingOtp ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center">
              
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-48 mx-auto px-4 py-3 text-center text-xl border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={goBackToForm}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isVerifyingOtp || otp.length < 6}
                  className={`px-6 py-2 rounded font-medium ${
                    isVerifyingOtp || otp.length < 6
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isVerifyingOtp ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Didn't receive code? Resend OTP
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">Creating your account...</p>
          </div>
        )}

        {/* Login Link */}
        {step === 1 && (
          <p className="text-center text-gray-600 text-sm pt-4">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;