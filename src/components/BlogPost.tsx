import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface BlogPostProps {
  position: [number, number, number];
  title: string;
  content: string;
  image: string;
  color: string;
  rotationSpeed?: number;
  scale?: number;
}

const BlogPost = ({ 
  position, 
  title, 
  content, 
  image, 
  color, 
  rotationSpeed = 0.3,
  scale = 1 
}: BlogPostProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { cardScale, rotation } = useSpring({
    cardScale: hovered ? scale * 1.1 : scale,
    rotation: hovered ? [0, Math.PI * 0.02, 0] : [0, 0, 0],
    config: { tension: 300, friction: 10 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <animated.group
      position={position}
      scale={cardScale}
      rotation={rotation as any}
    >
      <animated.mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Card base */}
        <boxGeometry args={[3.5, 4.5, 0.2]} />
        <meshPhongMaterial
          color={color}
          shininess={100}
          specular={new THREE.Color(0xffffff)}
        />

        {/* Glowing edge */}
        <mesh position={[0, 0, -0.11]}>
          <boxGeometry args={[3.7, 4.7, 0.01]} />
          <meshBasicMaterial
            color={hovered ? "#ffffff" : color}
            opacity={0.4}
            transparent
          />
        </mesh>

        {/* Content */}
        <group position={[0, 0, 0.11]}>
          {/* Title */}
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.35}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
          >
            {title}
          </Text>

          {/* Content */}
          <Text
            position={[0, 0, 0]}
            fontSize={0.18}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            lineHeight={1.5}
          >
            {content}
          </Text>

          {/* Read More Button */}
          <group position={[0, -1.8, 0]}>
            <mesh>
              <planeGeometry args={[2, 0.5]} />
              <meshBasicMaterial
                color={hovered ? "#ffffff" : "#ffffff"}
                opacity={0.2}
                transparent
              />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Read More →
            </Text>
          </group>
        </group>
      </animated.mesh>
    </animated.group>
  );
};

export default BlogPost;