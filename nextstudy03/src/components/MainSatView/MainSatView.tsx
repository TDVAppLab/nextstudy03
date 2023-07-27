import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SatScreen from './SatScreen';
import LoadingComponent from '../layout/LoadingComponents';
import agent from '@/app/agent';
import { tlestring } from '@prisma/client';

const defaultNo="56301";

export default function MainSatView() {    
    
    
    const [tlestrings, setTargetTle ] = useState<tlestring[]>([]);

    useEffect(() => {

        agent.SatelliteOrbitalElements.list().then((tlestrings) => {
            setTargetTle(tlestrings);
        });

    },[])
  

    if(tlestrings.length == 0) return <LoadingComponent content='Loading objects...' />

    return(
        <Container>
            <Row>
                <Col sm={8}>
                    <div style={{height: '50vh', width: '50vw'}} >
                        {
                        <SatScreen  isEditmode={false}  isAutoAnimationExec={false} tlestrings={tlestrings}/>
                        }
                    </div>
                    {
                    //<GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
                    }
                </Col>
                <Col sm={4}>
                    <h2>test</h2>
                </Col>
            </Row>
        </Container>

        
    )
}