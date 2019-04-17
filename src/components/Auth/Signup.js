import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./signup.css";
import backendBaseUrl from "../../url";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

class Signup extends Component {
  render() {
    return (
      <div
        className="signupContainer"
        style={{ margin: "0 auto", width: "400px" }}
      >
        <Paper>
          <Typography component="h1" variant="h5">
            <div
              style={{
                margin: "0 0 0 40%",
                fontWeight: "300",
                padding: "14px 0 0"
              }}
            >
              Sign up
            </div>
          </Typography>
          <FormControl margin="normal" required fullWidth>
            <a
              href={`${backendBaseUrl}/auth/google`}
              style={{ margin: "0 0 0 23%" }}
            >
              <button class="loginBtn loginBtn--google">
                Signup with Google
              </button>
            </a>
            <a
              href={`${backendBaseUrl}/auth/facebook`}
              style={{ margin: "0 0 0 21%" }}
            >
              <button class="loginBtn loginBtn--facebook">
                Signup with Facebook
              </button>
            </a>
            <Link
              component={RouterLink}
              to="/login"
              style={{
                margin: "0 auto",
                padding: "10px 0 6px",
                fontSize: ".8rem",
                textAlign: "center"
              }}
            >
              Already have an account? Click here to login.
            </Link>
          </FormControl>
        </Paper>
      </div>
    );
  }
}

export default Signup;
