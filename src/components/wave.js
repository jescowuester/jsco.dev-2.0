// inspired by https://dribbble.com/shots/6391796-Jellyfish-cuboids

import React, { useRef } from "react"
import { useSpring, a } from "react-spring/three"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import styled from "styled-components"

const Container = styled.div`
  canvas {
    width: 50vw;
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

const wave = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const matrix = wave.map(a => wave.map(n => n + a))

function Box({ delay, x, y }) {
  const squareWidth = 1
  const distanceBetweenSquares = 0.1

  const initialHeight = 1
  const heightDistance = 2.5

  function createDistance(n) {
    return (n - wave.length / 2) * (squareWidth + distanceBetweenSquares)
  }

  const { position } = useSpring({
    from: {
      position: [createDistance(x), initialHeight, createDistance(y)],
    },
    to: async next => {
      while (1) {
        await next({
          position: [
            createDistance(x),
            initialHeight - heightDistance,
            createDistance(y),
          ],
        })
        await next({
          position: [createDistance(x), initialHeight, createDistance(y)],
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
    <a.mesh position={position} scale={[squareWidth, 0.2, squareWidth]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial color="#fff" attach="material" />
    </a.mesh>
  )
}

export default function Wave() {
  return (
    <Container>
      <Canvas camera={{ position: [10, 10, 10] }}>
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
