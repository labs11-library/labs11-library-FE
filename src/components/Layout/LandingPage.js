import React from 'react';
import Mapview from '../Map/Mapview';

const LandingPage = () => {
    return ( 
        <div>
            <div style={{textAlign: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "48px", margin: "20px"}}>Book maps{" "}
                <span role="img" aria-label="books">
                    📚
                </span>
                <span role="img" aria-label="map">
                    🗺
                </span>
            </div>
            <Mapview />
        </div>
     );
}
 
export default LandingPage;