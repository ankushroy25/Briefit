import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full flex justify-between items-center mb-10 pt-4">
        <img src={logo} className="w-30 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/ankushroy25")}
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Brief articles,blogs <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT</span>
      </h1>
      <h2 className="desc">
        Read your blogs and articles faster with our summarizer that makes it
        concise, crsip and clear
      </h2>
    </header>
  );
};

export default Hero;
