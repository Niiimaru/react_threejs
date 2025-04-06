import React, { useRef } from "react";
import { PerspectiveCamera as DreiPerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { useFrame } from "@react-three/fiber";
import { Mesh } from 'three';
import Background from "./Background";
import AnimationController from "./AnimationController";

const ThreeScene: React.FC = () => {
    const boxRef = useRef<Mesh>(null);
    const torusRef = useRef<Mesh>(null);
    const cameraRef = useRef<ThreePerspectiveCamera>(null);

    const sizes = {
        width: innerWidth,
        height: innerHeight,
    };

    useFrame((_state, delta) => {
        if (boxRef.current) {
            boxRef.current.rotation.x += delta;
            boxRef.current.rotation.y += delta;
        }
    });

    return (
        <>
            <Background />
            <DreiPerspectiveCamera
                ref={cameraRef}
                makeDefault
                fov={75}
                aspect={sizes.width / sizes.height}
                near={0.1}
                far={1000}
                position={[0, 0, 5]}
            />

            <mesh position={[0, 0.5, -15]} ref={boxRef} castShadow receiveShadow>
                <boxGeometry
                    args={[5, 5, 5, 10]}
                />
                <meshNormalMaterial />
            </mesh>

            <mesh position={[0, 1, 10]} ref={torusRef}>
                <torusGeometry args={[8, 2, 16, 100]} />
                <meshNormalMaterial />
            </mesh>

            <AnimationController cameraRef={cameraRef} boxRef={boxRef} torusRef={torusRef}/>
        </>
    );
}

export default ThreeScene;
