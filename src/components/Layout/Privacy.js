import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
class Privacy extends React.Component {
  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    this.scrollToTop();
    return (
      <>
        <LandingPageContainer>
          <PrivacyContainer>
            <Typography variant="h2">Privacy Policy</Typography>
            <div>
            <p>
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <a href="https://bookmaps.netlify.com">bookmaps.netlify.com</a> (the “Site”).
            </p>
            <Typography variant="h3">Personal information we collect</Typography>
            <p>
                When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
            </p>
            <p>We collect Device Information using “Cookies” - data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org</a></p>
            <p>
                Additionally when you make a purchase or attempt to make your first book request through the Site, we collect your name, billing address, shipping address, payment information, email address, and phone number.  We refer to this information as “Order Information.”
            </p>
            <p>
                When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
            </p>
            <Typography variant="h3">How do we use your personal information?</Typography>
            <p>
                We use the Order Information that we collect generally to fulfill any books requested through the Site (including processing your late fees, arranging for book transfers, and providing you with transaction history).
            </p>
            <Typography variant="h3">Sharing your personal information</Typography>
            <p>
                We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
            <Typography variant="h3">Data retention</Typography>
            <p>
                When you place an order through the Site, we will maintain your Order Information for our records.
            </p>
            <Typography variant="h3">Changes</Typography>
            <p>
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
            <Typography variant="h3">Contact us</Typography>
            <p>
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:privacy@bookmaps.com">privacy@bookmaps.com</a> or by mail using the details provided below:
            </p>
            <p>381  Walton Street, Ogden, UT, 84401, United States</p>
            </div>
          </PrivacyContainer>
        </LandingPageContainer>
        <FooterContainer>
          <FooterItemsContainer>
            <Link to="/">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/team">Team</Link>
            <Link to="/privacy">Privacy</Link>
          </FooterItemsContainer>
        </FooterContainer>
      </>
    );
  }
}

export default Privacy;

const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  max-width: 1280px;
  background-color: white;
  box-sizing: border-box;
  padding-bottom: 20px;
  margin-bottom: 10px;
`;
const PrivacyContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin: 40px auto;
  background-color: white;
  padding: 30px 20px;
  box-sizing: border-box;
  h2 {
    font-size: 32px;
    margin: 10px 0;
    font-weight: bold;
    color: #009ee5;
  }
  h3 {
    font-size: 24px;
    margin: 10px 0;
    color: #009ee5;
  }
  p {
    font-size: 14px;
    margin: 10px 0;
  }
  li {
    color: #8892a0;
    font-size: 14px;
    margin: 10px 0;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 75px;
  position: sticky;
  top: 100%;
  svg {
    margin: 0 auto;
    font-size: 30px;
    cursor: pointer;
  }
`;

const FooterItemsContainer = styled.div`
  background-color: #009ee5;
  display: flex;
  color: white;
  justify-content: center;
  width: 100%;
  border-top: 2px solid white;
  a {
    font-size: 16px;
    font-weight: 500;
    padding: 16px 20px;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
  a:visited {
    color: white;
  }
`;
