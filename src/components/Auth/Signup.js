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
      <div style={{ margin: "0 auto", width: "400px" }}>
        <Paper>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormControl margin="normal" required fullWidth>
            <a href={`${backendBaseUrl}/auth/google`}>
              <button class="loginBtn loginBtn--google">
                Signup with Google
              </button>
            </a>
            <a href={`${backendBaseUrl}/auth/facebook`}>
              <button class="loginBtn loginBtn--facebook">
                Signup with Facebook
              </button>
            </a>
            <Link component={RouterLink} to="/login">
              Already have an account? Click here to login.
            </Link>
          </FormControl>
        </Paper>
      </div>
    );
  }
}

export default Signup;
