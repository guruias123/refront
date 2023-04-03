import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../Assets/logo white.png'

const NewHome = () => {
    const [signup, setSignup] = useState(true);
    const [themeIndex, setThemeIndex] = useState(0)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDOB] = useState("");
    const [mailSent, setMailSent] = useState(false);
    const [videoPopup, setVideoPopup] = useState(false);

    const [otp, setOTP] = useState("")
    const [verified, setVerified] = useState(false)

    const themes = [
        {
            style:"Login_style"
        },
        {
            style:""
        }
        
    ]


    const navigate = useNavigate();


    const changeVideoPopup = (e, val) => {
        e.preventDefault();
        setVideoPopup(val)
    }

    const sendOTP = async(e) => {
        e.preventDefault();
        console.log(e)
        const d = {
            email,
        }
        if(email == "") {
            return;
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/send-verification-mail`, d)
            if(data.success) {
              console.log("Mail Sent SuccessFully");
              setMailSent(true);
              toast.success(data.msg, {
                position: 'top-right',
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                progressStyle: { background: '#E8DFD0' },
                theme: 'colored',
                style: { background: 'grey', fontSize: "1.6rem" },
              });
            } else {
                console.log(data)
                setMailSent(false)
                toast.error(data.msg, {
                    position: 'top-right',
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    progressStyle: { background: '#E8DFD0' },
                    theme: 'colored',
                    style: { background: 'grey', fontSize: "1.6rem" },
                  });
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const signupVerifyOTP = async(e) => {
        e.preventDefault();
        const d = {
            verifyType: "register",
            otp
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/verify-otp`, d)
            if(data.success) {
              console.log("verification SuccessFully");
              setVerified(true)
              toast.success(data.msg, {
                position: 'top-right',
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                progressStyle: { background: '#E8DFD0' },
                theme: 'colored',
                style: { background: 'grey', fontSize: "1.6rem" },
              });
            } else {
                setMailSent(false)
                toast.error(data.msg, {
                    position: 'top-right',
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    progressStyle: { background: '#E8DFD0' },
                    theme: 'colored',
                    style: { background: 'grey', fontSize: "1.6rem" },
                  });
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
        localStorage.setItem('gmail', email)
        console.log(verified);
        if(!verified) {
            return toast.error("please verify email", {
                position: 'top-right',
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                progressStyle: { background: '#E8DFD0' },
                theme: 'colored',
                style: { background: 'grey', fontSize: "1.6rem" },
              });
        }
        const d = {
            firstName,
            lastName,
            email,
            mobile,
            dob,
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/signup`, d);
           
            console.log(data);
            if(data.success) {
                localStorage.setItem("token", data.token);
                navigate('/dashboard');
                toast.success(data.msg, {
                    position: 'top-right',
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    progressStyle: { background: '#E8DFD0' },
                    theme: 'colored',
                    style: { background: 'grey', fontSize: "1.6rem" },
                  });
                } else {
                    setMailSent(false)
                    toast.error(data.msg, {
                        position: 'top-right',
                        autoClose: 15000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                        progressStyle: { background: '#E8DFD0' },
                        theme: 'colored',
                        style: { background: 'grey', fontSize: "1.6rem" },
                      });
                }
        } catch (error) {
            console.log(error);
        }
    }

    const signinVerifyOTP = async(e) => {
        e.preventDefault();
        localStorage.setItem('gmail', email)
        const d = {
            email,
            otp,
            verifyType: "login"
        }
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/verify-otp`, d)
          
            if(data.success) {
              console.log("verification SuccessFully");
              setVerified(false);
              localStorage.setItem("token", data.token);
              navigate('/dashboard');
            } else {
                toast.error(data.msg, {
                    position: 'top-right',
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    progressStyle: { background: '#E8DFD0' },
                    theme: 'colored',
                    style: { background: 'grey', fontSize: "1.6rem" },
                  });
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const changeSignup = (e) => {
        e.preventDefault();
        setSignup(!signup);
        setThemeIndex((prevIndex) => (prevIndex + 1) % 2);
    }
    const currentTheme = themes[themeIndex];
    return ( 
        <>
            <ToastContainer />
        <div className={`NewHome ${currentTheme.style}`} >
            <div class="home-logo" >
                <img src={Logo} />
            </div>
            {/* <div className="home-content">Competitive tolls for comprtitive life</div> */}
            <div className="home-signup-signin" style={{position: "relative"}}>
                {!signup && <div className="home-signup" >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="container">
                    <div className="row">
                        <div className="col-25">
                            <label for="fname">First Name</label>
                        </div>
                        <div className="col-55">
                            <input autocomplete="off" onfocus="this.value='';" type="search" id="fname" name="firstname" placeholder="Your name.." onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="lname">Last Name</label>
                        </div>
                        <div className="col-55">
                            <input autoComplete="off"  type="text" id="lname" name="lastname" placeholder="Your last name.." onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-25">
                            <label for="email">Email</label>
                        </div>
                        <div className="col-55" style={{position: 'relative'}}>
                            <input autoComplete="off" type="email" id="email" name="email" placeholder="Your email.." onChange={(e) => setEmail(e.target.value)} required/>
                            <i class="fa fa-arrow-circle-o-right" aria-hidden="true" onClick={e => sendOTP(e)} style={{fontSize: "3rem"}}></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="email">Email OTP</label>
                        </div>
                        <div className="col-55" style={{position: 'relative'}}>
                            <input autoComplete="off" type="text" id="email" name="email" placeholder="Enter OTP" onChange={(e) => setOTP(e.target.value)}/>
                           <i class="fa fa-arrow-circle-o-right" aria-hidden="true" onClick={e => signupVerifyOTP(e)} style={{fontSize: "3rem"}}></i>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-25" style={{position: 'relative'}}>
                            <label for="mobile">Mobile</label>
                        </div>
                        <div className="col-55" style={{position:"relative"}}>
                            <input autoComplete="off" type="text" id="mobile" name="mobile" placeholder="Your mobile.." onChange={(e) => setMobile(e.target.value)}/>
                            <i class="fa fa-arrow-circle-o-right" aria-hidden="true" style={{fontSize: "3rem"}}></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25" style={{position: 'relative'}}>
                            <label for="mobile">Mobile OTP</label>
                        </div>
                        <div className="col-55" style={{position:"relative"}}>
                            <input autoComplete="off" type="text" id="mobile" name="mobile" placeholder="Your mobile.." />
                            <i class="fa fa-arrow-circle-o-right" aria-hidden="true" style={{fontSize: "3rem"}}></i>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-25">
                            <label for="dob">DOB</label>
                        </div>
                        <div className="col-55">
                            <input autoComplete="off" type="date" id="dob" name="dob" placeholder="Your date of birth.." onChange={(e) => setDOB(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row button-row">
                        <button>Submit</button>
                    </div>
                    </div>
                </form>
                <div className="home-signup-signin-link">Already have an account ? <span onClick={e => changeSignup(e)}>Login</span></div>
                </div>
                    }
                {signup && 
                    <div className="home-signup" >
                        <form >
                        <div className="container" >
                            <div className="row">
                                <div className="col-25">
                                    <label for="email">Email</label>
                                </div>
                                <div className="col-55" style={{position: 'relative'}}>
                                    <input autoComplete="off" type="email" id="email" name="email" placeholder="Your email.." onChange={(e) => setEmail(e.target.value)} required/>
                                    <i class="fa fa-arrow-circle-o-right" aria-hidden="true" onClick={e => sendOTP(e)} style={{fontSize: "3rem"}}></i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label for="email">Email OTP</label>
                                </div>
                                <div className="col-55" style={{position: 'relative'}}>
                                    <input autoComplete="off" type="text" id="email" name="email" placeholder="Enter OTP" onChange={(e) => setOTP(e.target.value)}/>
                                <i class="fa fa-arrow-circle-o-right" aria-hidden="true" onClick={e => signinVerifyOTP(e)} style={{fontSize: "3rem"}}></i>
                                </div>
                            </div>
                        </div>
                        </form>
                        <div className="home-signup-signin-link">Create account ? <span onClick={e => changeSignup(e)}>Signup</span></div>
                    </div>
                }
            </div>
                {videoPopup && <div className="youtube-video" style={{ position: "absolute", top: "20px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
                    <video width="60%" controls preload="metadata" >
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    </video>
                    <i class="fa fa-times-circle-o" aria-hidden="true" onClick={e => changeVideoPopup(e, false)} style={{ fontSize: "3rem", color: "grey", position: 'absolute', top: 0, right: "26rem" }}></i>
                </div>}
            </div>
            <div className="footer-links">
                <div onClick={e => changeVideoPopup(e, true)}>Video Tutorial</div>
                <Link to="/support">Support</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/terms-of-use">Terms Of Use</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            </>
     );
}
 
export default NewHome;