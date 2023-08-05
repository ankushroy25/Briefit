import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full flex justify-between items-center mb-4 pt-4">
        <img src={logo} className="object-contain" />
        <h1 className="head_text mr-8">BriefIt</h1>
        <button
          type="button"
          onClick={() => window.open("https://github.com/ankushroy25/briefit")}
        >
          <b className="text-2xl"> Code</b>
        </button>
      </nav>
      <h1 className="text-4xl md:text-5xl text-center font-bold blue_gradient pb-2">
        Summarize news, articles, blogs <br className="max-md:hidden" />
        <span>GPT powered</span>
      </h1>
      <h2 className="desc">
        Read your blogs and articles faster with our summarizer that makes it
        concise, crsip and clear
      </h2>
    </header>
  );
};

export default Hero;
