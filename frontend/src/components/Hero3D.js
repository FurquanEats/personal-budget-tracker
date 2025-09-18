// In frontend/src/components/Hero3D.js

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Icosahedron, useScroll } from '@react-three/drei';

// NOTE: We have removed the <Canvas> from this file. 
// This component now assumes it will be rendered inside a Canvas.

const Hero3D = () => {
  const torusRef = useRef();
  const icoRef = useRef();

  // useScroll gives us the current scroll progress from the parent ScrollControls
  const scroll = useScroll();

  // useFrame runs on every single rendered frame, allowing for animation
  useFrame(() => {
    // Animate rotation based on the scroll offset (a value from 0 to 1)
    if (torusRef.current && icoRef.current) {
        torusRef.current.rotation.x = scroll.offset * Math.PI * 2;
        torusRef.current.rotation.y = scroll.offset * Math.PI * 1;
        
        icoRef.current.rotation.z = -scroll.offset * Math.PI * 2;
    }
  });

  return (
    // We add the lights here, as they are part of the scene itself
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <group>
        {/* A big, central torus shape */}
        <Torus ref={torusRef} args={[1.5, 0.3, 30, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" roughness={0.3} />
        </Torus>
        
        {/* A smaller, floating icosahedron shape */}
        <Icosahedron ref={icoRef} args={[0.5, 0]} position={[3, 1, -2]}>
          <meshStandardMaterial color="#ec4899" roughness={0.5} />
        </Icosahedron>
      </group>
    </>
  );
};

export default Hero3D;