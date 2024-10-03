import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [toggle,setToggle]=useState(false);
  const [isMobile, setIsMobile] = useState();
const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    let errors={};

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

    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.post("https://projectmangerbackend.onrender.com/api/login", {
        email,
        password,
      },{withCredentials:true});

      if (response.data.success) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        if (sessionStorage.getItem('accessToken')) {
          navigate("/dashboard");
        }
        setErrorMessage({});
      } else {
        setErrorMessage({ general: response.data.message || "Invalid credentials" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage({ general: "Invalid credentials" });
    }
  };
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768); // Consider `md` as 768px
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col relative">
      <div className="md:h-[65%] h-[45%] bg-[url('/login-bg-1.svg')] bg-cover bg-no-repeat bg-top flex flex-col items-center rounded-bl-[100px]  pt-12 pb-12 md:pb-0">
        {/* Adjusted background position */}
        <img src="/Logo.svg" alt="Logo" />
        <p className="text-white mt-4 text-[16px] leading-[22px]">
          Online Project Management
        </p>
      </div>
      <div className="md:h-[35%] h:[55%] bg-white">{/* Bottom half for background */}</div>
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

                <div className={`w-full lg:w-[337px] border ${errorMessage.email?'border-red-500':'border-[#979797]'} rounded-[4px] p-2 h-[48px] flex flex-col items-center justify-center`}>
                  <input type="text" className="w-full outline-none bg-transparent" onChange={(e) => setEmail(e.target.value)}/>
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

                <div className={`w-full lg:w-[337px] border ${errorMessage.password?'border-red-500':'border-[#979797]'}  rounded-[4px] p-2 flex items-center justify-center h-[48px]`}>
                  <input type={`${toggle?'text':'password'}`} className="w-full outline-none bg-transparent" onChange={(e) => setPassword(e.target.value)} />
                  <div onClick={()=>setToggle(!toggle)} type="buttom">
                  {
                    toggle ? <RemoveRedEyeOutlinedIcon className="text-[#5A5B5B] p-0"/>: <img src="/hide-password.svg" alt="" />
                  }                 
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                <p className="h-[14px] text-[12px] text-red-500">{errorMessage.password}</p>
                <p className="h-[14px] text-[12px] text-[#025AAB]">Forget Password</p>
                </div>
              </div>
            </div>
            {isMobile && <p className="h-[16px] text-[14px] text-red-500 lg:mt-12 mt-4">{errorMessage.general}</p>}
            <button
              type="submit"
              className="bg-[#035FB2] text-white py-2 px-4 rounded-[18px] lg:w-[169px] mt-8 w-full"
            >
              Login
            </button>
           
          </form>
        </div>
        {!isMobile && <p className="h-[16px] text-[14px] text-red-500 text-center lg:mt-12">{errorMessage.general}</p>}
        
      </div>
     
    </div>
  );
}

export default Login;
