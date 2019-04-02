import React from 'react';

const LandingPage = () => {
    return ( 
        <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "24px"}}>
            <div>Book maps{" "}
                <span role="img" aria-label="books">
                    📚
                </span>
                <span role="img" aria-label="map">
                    🗺
                </span>
            </div>
        </div>
     );
}
 
export default LandingPage;