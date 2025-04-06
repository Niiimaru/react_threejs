import './App.css'
import {Canvas} from "@react-three/fiber";
import ThreeScene from './components/three-fiber/ThreeScene';

function App() {
  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ThreeScene />
      </Canvas>

      <main>
        <h1>PortFolio</h1>
        <section>
          <h2>突き詰める</h2>
        </section>
        <section>
          <h2>私の作った作品です</h2>
        </section>
        <section>
          <h2>My Skills</h2>
          <p>HTML/CSS/JS</p>
        </section>
        <section>
          <h2>Enginner</h2>
          <p>好奇心</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>お問い合わせ</p>
          <button>こちらから</button>
        </section>
      </main>
    </>
  )
}

export default App
