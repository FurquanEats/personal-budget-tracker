// In frontend/src/pages/LandingPage.js

import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Hero3D from '../components/Hero3D';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* The 3D Canvas is now correctly placed here, at the top level */}
      <div className="hero-3d-canvas">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            {/* ScrollControls is now correctly placed INSIDE the Canvas */}
            <ScrollControls pages={1.5} damping={0.3}>
              <Hero3D />
            </ScrollControls>
          </Canvas>
        </Suspense>
      </div>

      {/* The text content remains the same, layered on top */}
      <div className="landing-content">
        <h1 className="landing-title">
          Financial Clarity, <br />
          Beautifully Visualized.
        </h1>
        <p className="landing-subtitle">
          BudgetApp is the modern way to track your expenses, manage groups,
          and achieve your financial goals.
        </p>
        <Link to="/login" className="landing-cta">
          Get Started <FiArrowRight />
        </Link>
      </div>
      
      {/* Invisible spacer to create scrollable area */}
      <div style={{ height: '150vh' }} /> 
    </div>
  );
};

export default LandingPage;