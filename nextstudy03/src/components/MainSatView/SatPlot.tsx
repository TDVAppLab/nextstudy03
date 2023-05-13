import * as satellite from 'satellite.js';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';


interface Props {
    noradcatid: number;
}

const line1 = () => {return '1 00000U 98067A   21260.38326868  .00002108  00000-0  47329-4 0  9995'};
const line2 = () => {return '2 00000  51.6436 246.8533 0003182  25.6729 121.4393 15.48402825302886'};




export default observer( function SatPlot ({noradcatid}: Props) {
  
  const { tlestringStore } = useStore();
  const { selectedTlestring, tlestringRegistry } = tlestringStore;
    
    const [satRec, setSatRec] = useState<satellite.SatRec>(satellite.twoline2satrec(line1(), line2()));



    const ref = useRef<THREE.Mesh>(null!);
    
    useEffect(()=> {

        if(noradcatid) {

          const temp = tlestringRegistry.get(noradcatid.toString());

          if(temp){
            setSatRec(satellite.twoline2satrec(temp.line1, temp.line2))
          }
        }

    }, [noradcatid])


    useFrame((state) => {

      const scale = 100;

      if(satRec.satnum !== "00000"){
        
        // 現在時刻の衛星の位置を計算
        const now = new Date();
        const { position: positionEci } = satellite.propagate(satRec, now);
        
        // 衛星位置の座標系を変換(ECI -> geodetic location)
        const gstime = satellite.gstime(now); // GMST(グリニッジ恒星時)に変換

        //@ts-ignore
        const positionGd = satellite.eciToGeodetic(positionEci, gstime);
        
        // 計算結果
        //console.log(positionGd.longitude*180/3.14); // 経度[rad]
        //console.log(positionGd.latitude*180/3.14); // 緯度[rad]
        //console.log(positionGd.height); // 高度[km]
        
        ref.current.position.x =   scale * 1.1 * Math.cos(positionGd.latitude)*Math.cos(positionGd.longitude);
        ref.current.position.y =   scale * 1.1 * Math.sin(positionGd.latitude);
        ref.current.position.z = - scale * 1.1 * Math.cos(positionGd.latitude)*Math.sin(positionGd.longitude);

      }
    });

    return (
      <mesh ref={ref} >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
})