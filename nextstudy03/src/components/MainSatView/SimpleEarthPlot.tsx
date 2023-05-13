import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const SimpleEarthPlot = () => {
  const gltf = useLoader(GLTFLoader, './EarthHologram.gltf')
  gltf.scene.position.set(0,0,0);
  gltf.scene.scale.set(100,100,100);
  return <primitive object={gltf.scene} />
}

export default SimpleEarthPlot;