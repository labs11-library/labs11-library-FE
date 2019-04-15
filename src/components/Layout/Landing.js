import React from "react";
import Iframe from "react-iframe";
import bookLover from "../../images/landing/bookLover.svg";
import bibliophile from "../../images/landing/bibliophile.svg";
import readingList from "../../images/landing/readingList.svg";
import map from "../../images/landing/map.svg";
import beginChat from "../../images/landing/beginChat.svg";
import backendBaseUrl from "../../url";

const Landing = props => {
  return (
    <div>
      <section className="fdb-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="order-md-8 m-auto ml-lg-auto mr-lg-0 col-md-6 pt-2 pt-lg-0">
              <img alt="bibliophile" className="img-fluid" src={bibliophile} />
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-5">
              <h1 style={{ fontSize: "3.5rem" }}>Help Your Shelf.</h1>
              <p className="lead mb-5" style={{ margin: "20px auto" }}>
                Discover your next favourite book in your neighbor's bookshelf.
                No matter where you are, Bookmaps allows you to share books with
                the people around you.
              </p>
              <p className="h3 mt-4">
                <a
                  href="https://bookmaps.netlify.com/browse"
                  className="btn btn-primary"
                >
                  Browse books
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="fdb-block" style={{ backgroundColor: "#F3F2F2" }}>
        <div className="container">
          <div className="row text-left align-items-center pt-5 pb-md-5">
            <div className="col-8 col-md-5 m-auto">
              <img alt="reading-list" className="img-fluid" src={readingList} />
            </div>

            <div className="col-12 col-md-5 m-md-auto">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Share your books</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                laoreet dolor ut elit imperdiet, vitae aliquet tortor molestie.
                Aliquam sed quam metus.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5 pb-md-5">
            <div className="col-8 col-md-5 m-md-auto order-md-5 m-auto">
              <img alt="map" className="img-fluid" src={map} />
            </div>

            <div className="col-12 col-md-5">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Explore the books in your neighborhood</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; In at tincidunt odio. Vivamus ultricies a
                arcu eget suscipit. Nunc arcu mi, aliquam ut eros in, sagittis
                sollicitudin nisi.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5">
            <div className="col-8 col-md-5 m-auto">
              <img alt="begin-chat" className="img-fluid" src={beginChat} />
            </div>

            <div className="col-12 col-md-5 m-md-auto">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Connect with people in your area</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                {" "}
                Nullam at augue ut nibh sagittis gravida et in mi. Donec
                tincidunt elit sed felis feugiat consequat. Integer a bibendum
                mauris. Morbi in felis velit.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5 pb-md-5">
            <div className="col-8 col-md-5 m-md-auto order-md-5 m-auto">
              <img alt="book-lover" className="img-fluid" src={bookLover} />
            </div>

            <div className="col-12 col-md-5">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Expand your book collection</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; In at tincidunt odio. Vivamus ultricies a
                arcu eget suscipit. Nunc arcu mi, aliquam ut eros in, sagittis
                sollicitudin nisi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="fdb-block">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
              <div className="fdb-box fdb-touch">
                <div className="row">
                  <div className="col">
                    <h2 style={{ fontSize: "2.5rem" }}>Sign Up</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-4">
                    <a
                      href={`${backendBaseUrl}/auth/google`}
                      style={{ margin: "0 auto" }}
                    >
                      <button class="loginBtn loginBtn--google">
                        Signup with Google
                      </button>
                    </a>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <a
                      href={`${backendBaseUrl}/auth/facebook`}
                      style={{ margin: "0 auto" }}
                    >
                      <button class="loginBtn loginBtn--facebook">
                        Signup with Facebook
                      </button>
                    </a>
                    <p>
                      <a href="https://bookmaps.netlify.com/login">
                        Already have an account?
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
