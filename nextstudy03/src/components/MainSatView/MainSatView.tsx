import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
//import GoogleAd from '../../app/common/utils/GoogleAd';
import { useStore } from '../../app/stores/store';
import SatScreen from './SatScreen';
import LoadingComponent from '../layout/LoadingComponents';

export default observer(function MainSatView() {      

    
//    const { siteAnalyticsStore } = useStore();
    
    const { tlestringStore } = useStore();
    const { loadObjects, setSelectedTlestring, tlestringRegistry } = tlestringStore;
//    const { userStore: {user}} = useStore();
  
    useEffect(() => {
        if(tlestringRegistry.size <= 1) {
          loadObjects();
          setSelectedTlestring("56301");
        };
    },[tlestringRegistry.size, loadObjects])
  
  
    if(tlestringStore.loading) return <LoadingComponent content='Loading objects...' />


    return(
        <Container>
            <Row>
                <Col sm={8}>
                    <div style={{height: '50vh', width: '50vw'}} >
                        {
                        <SatScreen  isEditmode={false}  isAutoAnimationExec={false}/>
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
})