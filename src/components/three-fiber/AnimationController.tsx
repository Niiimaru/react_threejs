import React, {useState, useEffect} from "react";
import {Mesh, PerspectiveCamera} from "three";
import {useFrame} from "@react-three/fiber";


/**
 * useFrame とは？
 * react-three-fiber 独自のフックで、Three.js のレンダリングループ内で毎フレーム（大体1秒に60回）実行される関数を登録します。
 *
 * 使い方のイメージ:
 * たとえば、立方体を毎フレーム回転させたい場合、useFrame 内でその回転を更新します。
 */

interface AnimationControllerProps {
    cameraRef: React.RefObject<PerspectiveCamera | null>;
    boxRef: React.RefObject<Mesh | null>;
    torusRef: React.RefObject<Mesh | null>;
}

const AnimationController: React.FC<AnimationControllerProps> = ({ cameraRef, boxRef, torusRef }) => {
    const [scrollPercent, setScrollPercent] = useState(0);

    // 線形補間関数
    function lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    // スクロール割合を 0～1 の値にスケーリングする関数
    function scalePercent(scroll: number, start: number, end: number): number {
        return (scroll - start) / (end - start);
    }

    useEffect(() => {
        const handleScroll = () => {
            const scroll = document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollPercent((scroll / totalHeight) * 100);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        if (cameraRef.current && boxRef.current && torusRef.current) {
            const start = 0;
            const end = 40;

            const second_start = 40;
            const second_end = 100;

            if (scrollPercent > 0 && scrollPercent < 40) {
                // カメラが box を向くように
                cameraRef.current.lookAt(boxRef.current.position);
                // カメラの位置をスクロールに合わせて変える
                cameraRef.current.position.set(0, 1, 10);
                // box の位置を少しずつ前に動かす
                boxRef.current.position.z = lerp(-10, 2, scalePercent(scrollPercent, start, end));
                torusRef.current.position.z = lerp(10, -30, scalePercent(scrollPercent, start, end));
            }

            if (scrollPercent > 40) {
                cameraRef.current.lookAt(boxRef.current.position);
                cameraRef.current.position.x = lerp(0, 15, scalePercent(scrollPercent, second_start, second_end));
                cameraRef.current.position.y = lerp(1, 15, scalePercent(scrollPercent, second_start, second_end));
                cameraRef.current.position.z = lerp(10, 25, scalePercent(scrollPercent, second_start, second_end));
            }
        }
    })

    // 何もレンダリングしない場合は、必ず ReactNode (ここでは null) を返す
    return null;
}

export default AnimationController;