import React from 'react';

const LandingPage = () => {
    return ( 
        <div style={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "48px"}}>
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