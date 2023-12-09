// HeroPage.tsx
//0f2332 
import React from 'react';
import './HeroPage.css';
import hero from './hero.jpeg'
import { Link } from 'react-router-dom';

const HeroPage: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="left-side">
        <h1>World's</h1>
        <h1>Most Adopted</h1>
        <h1>Healthcare AI</h1>
        <p className="text-center">AI For<br />Lung | Heart | Neuro | MSK</p>

        <Link to="/doctor">
        <button className="live-demo-button">Set up a Private Demo</button>
        </Link>

      </div>
      <div className="right-side">
        <img
          src={hero}
          alt="Logo"
          width="691"
          height="500"
        />
      </div>
    </div>
  );
};

export default HeroPage;
