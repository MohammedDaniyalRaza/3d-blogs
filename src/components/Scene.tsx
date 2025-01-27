import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

const Scene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const getPosition = (index: number): [number, number, number] => {
    if (isMobile) {
      // Stack vertically on mobile
      return [0, 8 - (index * 4), 0];
    } else if (isTablet) {
      // 2x3 grid for tablet
      const row = Math.floor(index / 2);
      const col = index % 2;
      return [(col * 8) - 4, 4 - (row * 4), 0];
    } else {
      // Arc layout for desktop
      const angle = (index / 5) * Math.PI;
      const radius = 8;
      return [
        Math.sin(angle) * radius,
        Math.cos(angle) * 3,
        -Math.cos(angle) * (radius / 2)
      ];
    }
  };

  const getCameraPosition = (): [number, number, number] => {
    if (isMobile) return [0, 0, 20];
    if (isTablet) return [0, 0, 18];
    return [0, 0, 15];
  };

  const blogPosts = [
    {
      title: "Welcome to My 3D Blog",
      content: "Hi, I'm Daniyal! This is my innovative 3D blog where technology meets creativity. Explore the space by dragging and scrolling! 🚀",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      color: "#4f46e5",
      rotationSpeed: 0.3,
    },
    {
      title: "Modern Web Development",
      content: "Dive into the latest web technologies: React, Next.js, and TypeScript. Learn how modern frameworks are shaping the future of web development.",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2",
      color: "#7c3aed",
      rotationSpeed: 0.25,
    },
    {
      title: "AI & Machine Learning",
      content: "Explore the fascinating world of AI, from neural networks to practical applications in everyday technology.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#2563eb",
      rotationSpeed: 0.35,
    },
    {
      title: "Cloud Computing",
      content: "Understanding cloud architecture, AWS, Azure, and the infrastructure that powers modern applications.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#06b6d4",
      rotationSpeed: 0.28,
    },
    {
      title: "Cybersecurity Essentials",
      content: "Learn about the critical aspects of cybersecurity, from basic principles to advanced threat protection.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#3b82f6",
      rotationSpeed: 0.32,
    },
    {
      title: "Cybersecurity Essentials",
      content: "Learn about the critical aspects of cybersecurity, from basic principles to advanced threat protection.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#3b82f6",
      rotationSpeed: 0.32,
    },
    {
      title: "Cloud Computing",
      content: "Understanding cloud architecture, AWS, Azure, and the infrastructure that powers modern applications.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#06b6d4",
      rotationSpeed: 0.28,
    },
    {
      title: "Modern Web Development",
      content: "Dive into the latest web technologies: React, Next.js, and TypeScript. Learn how modern frameworks are shaping the future of web development.",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2",
      color: "#7c3aed",
      rotationSpeed: 0.25,
    },
    {
      title: "AI & Machine Learning",
      content: "Explore the fascinating world of AI, from neural networks to practical applications in everyday technology.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      color: "#2563eb",
      rotationSpeed: 0.35,
    },
    {
      title: "Modern Web Development",
      content: "Dive into the latest web technologies: React, Next.js, and TypeScript. Learn how modern frameworks are shaping the future of web development.",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2",
      color: "#7c3aed",
      rotationSpeed: 0.25,
    }
  ];

  return (
    <Canvas style={{ background: 'transparent' }}>
      <PerspectiveCamera 
        makeDefault 
        position={getCameraPosition()}
        fov={isMobile ? 75 : 60}
      />
      <OrbitControls 
        enableZoom={true}
        maxDistance={isMobile ? 30 : 25}
        minDistance={isMobile ? 15 : 10}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Stars 
        radius={100}
        depth={50}
        count={isMobile ? 3000 : 7000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {blogPosts.map((post, index) => (
        <BlogPost 
          key={index} 
          {...post} 
          position={getPosition(index)}
          scale={isMobile ? 0.8 : 1}
        />
      ))}
    </Canvas>
  );
};

export default Scene;