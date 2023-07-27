import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import SimpleEarthPlot from './SimpleEarthPlot';
import SatPlot from './SatPlot';
import { tlestring } from '@prisma/client';

interface Props {
  isEditmode : boolean
  isAutoAnimationExec : boolean;
  tlestrings : tlestring[];
}

export default function SatScreen({isEditmode, isAutoAnimationExec, tlestrings}: Props) {


  return (
      <Canvas
        gl={{ 
          antialias: true, 
          //outputEncoding : LinearEncoding,
          //toneMapping: NoToneMapping,
        }}
        onCreated={({ gl, scene }) => {
          //gl.toneMappingExposure = Math.pow(2, selectedArticle?.exposure ? selectedArticle.exposure : 0.0);
          scene.environment = null;

          scene.background = new Color("#111111")
        }}
        //linear={selectedArticle?.gammaOutput}        
        //flat={true}    
        camera={{ 
          fov:45
          ,position:[3,3,3]
          ,near:1
          ,far:6350000
          }} 
      >
      

      <OrbitControls
        enableDamping={false}
        attach="orbitControls"
        autoRotate={false}
        autoRotateSpeed={1}
        makeDefault
      />

        <ambientLight intensity={0.5} />
        {
        /*  
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        */
        }
        <axesHelper position={[-2, -2, -2]} args={[4]} />
        <SimpleEarthPlot />
        <SatPlot noradcatid={25544} tlestrings={tlestrings}/>
      </Canvas>
  );
};