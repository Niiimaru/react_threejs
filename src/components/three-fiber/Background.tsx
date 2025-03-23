import React, { useEffect } from "react";
import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Background: React.FC = () => {
    // 画像は public フォルダ内に、たとえば scene-bg.jpg として置く
    const texture = useLoader(TextureLoader, '/scene-bg.jpg'); // 拡張子を追加
    const { scene } = useThree();

    useEffect(() => {
        scene.background = texture;
    }, [scene, texture]);

    return null;
};

export default Background;
