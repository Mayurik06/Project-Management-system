import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
      
  console.log("Email:", email);
  console.log("Password:", password);
    let errors={};

    // Validate form fields
    if (!email) {
      errors.email="Email is required"
    }
    if (!password) {
      errors.password="Password is required"
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    // If either field is empty, stop the form submission
    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        // setSuccess("Login successful!");
        console.log('Login successful:', response.data);
        setErrorMessage({});
        navigate("/dashboard");
        // Handle redirection or storing tokens if needed
      } else {
        setErrorMessage({ general: data.message || "Invalid credentials" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage({ general: "Invalid credentials" });
    }
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div className="lg:h-[65%] h-[25%] bg-[url('/login-bg-1.svg')] bg-cover bg-no-repeat bg-top flex flex-col items-center pt-16 rounded-bl-[100px]">
        {/* Adjusted background position */}
        <img src="/Logo.svg" alt="Logo" />
        <p className="text-white mt-4 text-[16px] leading-[22px]">
          Online Project Management
        </p>
      </div>
      <div className="lg:h-[35%] h:[75%] bg-white">{/* Bottom half for background */}</div>
      <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:mt-40 w-full">
        <div className="lg:bg-white py-[50px] px-[36px] rounded-[10px] lg:shadow-custom lg:z-10 lg:text-center">
          <p className="text-xl leading-[27px] text-[#3F3F3F]">
            Login to get started
          </p>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-[6px] mt-[30px]">
              <div className="flex flex-col items-start gap-1">
                <label
                  htmlFor="email"
                  className={`text-sm leading-[19px] ${errorMessage.email?'text-red-500':' text-[#767676]'}`}
                >
                  Email
                </label>

                <div className={`w-full lg:w-[337px] border ${errorMessage.email?'border-red-500':'border-[#979797]'}  rounded-[4px] p-2`}>
                  <input type="text" className="w-full outline-none" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <p className="h-[14px] text-[12px] text-red-500">{errorMessage.email}</p>
              </div>

              <div className="flex flex-col items-start gap-1">
                <label
                  htmlFor="password"
                  className={`text-sm leading-[19px] ${errorMessage.email?'text-red-500':' text-[#767676]'}`}
                >
                  Password
                </label>

                <div className={`w-full lg:w-[337px] border ${errorMessage.password?'border-red-500':'border-[#979797]'}  rounded-[4px] p-2 flex items-center justify-center`}>
                  <input type="password" className="w-full outline-none" onChange={(e) => setPassword(e.target.value)} />
                  <img src="/hide-password.svg" alt="" />
                </div>
                <div className="flex items-center justify-between w-full">
                <p className="h-[14px] text-[12px] text-red-500">{errorMessage.password}</p>
                <p className="h-[14px] text-[12px] text-[#025AAB]">Forget Password</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#035FB2] text-white py-2 px-4 rounded-[18px] lg:w-[169px] mt-8 w-full"
            >
              Login
            </button>
           
          </form>
        </div>
        <p className="h-[16px] text-[14px] text-red-500 text-center lg:mt-12">{errorMessage.general}</p>
      </div>
     
    </div>
  );
}

export default Login;
