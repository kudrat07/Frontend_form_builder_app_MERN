import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Landing.css";
import svgFormBot from "../../assets/SVG.png";
import triangleSvg from "../../assets/triangular-svg.png";
import curlySvg from "../../assets/curly-svg.png";
import mainImg from "../../assets/Container.png";
import footerSvg from "../../assets/footer-svg.png";
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/dashboard")
    }

  }, [navigate])

  return (
    <div className="landing-container">
      <nav className="landing-nav--container">
        <div className="landing-nav--wrapper">
          <div className="landing-icon--wrapper">
            <img src={svgFormBot} alt="icon" className="landing-nav--icon" />
            <p className="landing-nav--text">FormBot</p>
          </div>

          <div className="nav-btn--wrapper">
            <button className="nav-btn btn-signIn">
              <Link to="login" className="landing-nav--link nav-link--signIn">
                Sign in
              </Link>
            </button>
            <button className="nav-btn btn-signUp">
              <Link
                to="/register"
                className="landing-nav--link nav-link--signUp"
              >
                Create a FormBot
              </Link>
            </button>
          </div>
        </div>
      </nav>
      <section className="hero-section">
        .
        <img src={triangleSvg} alt="triangle-svg" className="icon-1" />
        <img src={curlySvg} alt="curly-svg" className="icon-2" />
        <div className="hero-container">
          <h1 className="hero-title">Build advanced chatbots visually</h1>
          <p className="hero-description">
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
          <button className="hero-btn">
            <Link to="/login" className="hero-link">
              Create a FormBot for free
            </Link>
          </button>
        </div>
      </section>
      <main className="main-img--wrapper">
        <img src={mainImg} alt="main img" className="main-img" />
      </main>
      <footer>
        <div className="footer-container">
          <div className="row">
            <div className="footer-icon--wrapper">
              <img src={svgFormBot} alt="svg form bot" className="svg-footer" />
              <p className="footer-title">FormBot</p>
            </div>
            <p className="footer-text">
              Made with ❤️ by 
            </p>
            <span className="footer-span">@cuvette</span>
          </div>
          <div className="row">
            <p className="footer-row--title">Product</p>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Status</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Documentation</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Roadmap</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Pricing</p>
              
            </div>
          </div>
          <div className="row">
            <p className="footer-row--title">Community</p>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Discord</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">GitHub repository</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Twitter</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">LinkedIn</p>
              <img src={footerSvg} alt="svg" className="footer-svg" />
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">OSS Friends</p>
              
            </div>
          </div>
          <div className="row">
            <p className="footer-row--title">Company</p>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">About</p>
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Contact</p>
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Terms of Service</p>
            </div>
            <div className="footer-list--wrapper">
              <p className="footer-row--list">Privacy Policy</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
