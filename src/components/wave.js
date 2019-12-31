// inspired by https://dribbble.com/shots/6391796-Jellyfish-cuboids

import * as THREE from "three"
import { render } from "react-dom"
import React, { useRef } from "react"
import { useSpring, a } from "react-spring/three"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import styled from "styled-components"

const Container = styled.div`
  canvas {
    width: 100%;
    height: 100vh;
  }
`

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function createDistance(n) {
  return (n - 5) * 1.1
}

const wave = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const matrix = wave.map(a => wave.map(n => n + a))

function Box({ delay, x, y }) {
  const { position } = useSpring({
    from: {
      position: [createDistance(x), -5, createDistance(y)],
    },
    to: async next => {
      while (1) {
        await next({
          position: [createDistance(x), -2.5, createDistance(y)],
        })
        await next({
          position: [createDistance(x), -5, createDistance(y)],
        })
      }
    },
    config: {
      mass: 5,
      tension: 80,
      friction: 15,
    },
    delay: delay * 100,
  })

  return (
    <a.mesh position={position} scale={[1, 0.2, 1]}>
      <boxBufferGeometry attach="geometry" />
      <meshToonMaterial color="#999" attach="material" />
    </a.mesh>
  )
}

export default function Wave() {
  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 25] }}>
        <ambientLight intensity={0.5} />
        <spotLight
          intensity={1}
          position={[30, 30, 50]}
          angle={1}
          penumbra={1}
        />
        <Controls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 2.5}
        />
        {matrix.map((array, y) =>
          array.map((delay, x) => <Box delay={delay} x={x} y={y} />)
        )}
      </Canvas>
    </Container>
  )
}
