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
                Discover your next favorite book on your neighbor's bookshelf.
                No matter where you are, BookMaps allows you to share books with
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
                We believe that books are for reading, not for collecting dust. Post your unused books to your BookMaps library and give the gift of reading.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5 pb-md-5">
            <div className="col-8 col-md-5 m-md-auto order-md-5 m-auto">
              <img alt="map" className="img-fluid" src={map} />
            </div>

            <div className="col-12 col-md-5">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Discover the best books in your neighborhood</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                Use our integrated map system to find the other book worms in
                your area. Make new connections over your love of reading.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5">
            <div className="col-8 col-md-5 m-auto">
              <img alt="begin-chat" className="img-fluid" src={beginChat} />
            </div>

            <div className="col-12 col-md-5 m-md-auto">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>Secure Communication</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                {" "}
                BookMaps will never reveal your contact information to other
                users. Our integrated chat system makes communication simple.
                Get in touch with other users knowing that your privacy is
                protected.
              </p>
            </div>
          </div>

          <div className="row text-left align-items-center pt-5 pb-md-5">
            <div className="col-8 col-md-5 m-md-auto order-md-5 m-auto">
              <img alt="book-lover" className="img-fluid" src={bookLover} />
            </div>

            <div className="col-12 col-md-5">
              <h2 style={{ fontSize: "2.5rem" }}>
                <strong>BookMaps has a book-back guarantee</strong>
              </h2>
              <p className="lead" style={{ margin: "20px auto" }}>
                BookMaps is like the library. It's free unless you're late, and
                we will never charge you otherwise. Automatic late fees ensure
                that you'll get your book back on time or get reimbursed.
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
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "300" }}>
                      Sign Up
                    </h2>
                    <p className="lead" style={{ margin: "10px auto" }}>
                      Join the BookMaps community
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-4">
                    <a
                      href={`${backendBaseUrl}/auth/google`}
                      style={{ margin: "0 auto" }}
                    >
                      <button class="loginBtn loginBtn--google">
                        Sign up with Google
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
                      <button
                        style={{ marginBottom: ".8rem" }}
                        class="loginBtn loginBtn--facebook"
                      >
                        Sign up with Facebook
                      </button>
                    </a>
                    <p>
                      <a
                        style={{ fontSize: ".9rem" }}
                        href="https://bookmaps.netlify.com/login"
                      >
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
