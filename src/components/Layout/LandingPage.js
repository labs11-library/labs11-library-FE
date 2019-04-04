import React, { Component } from 'react';
import BookList from '../Books/BookList';
import Mapview from '../Map/Mapview';
import { LandingPageWrapper, TabsWrapper, BooksWrapper, MapWrapper } from './styled.js';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class LandingPage extends Component {
    state = { 
        value: 0
     }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    render() {
        return ( 
            <div>
                <LandingPageWrapper>
                <TabsWrapper>
                    <Paper>
                        <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        variant="fullWidth"
                        >
                            <Tab label="List" />
                            <Tab label="Map" />
                        </Tabs>
                    </Paper>
                </TabsWrapper>
                    {/* <div>Book maps{" "}
                        <span role="img" aria-label="books">
                            📚
                        </span>
                        <span role="img" aria-label="map">
                            🗺
                        </span>
                    </div> */}
                    <BooksWrapper value={this.state.value}><BookList /></BooksWrapper>
                    <MapWrapper value={this.state.value}><Mapview /></MapWrapper>
                </LandingPageWrapper>
            </div>
         );
    }
}
 
export default LandingPage;