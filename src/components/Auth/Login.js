import React from "react";
import { Link as RouterLink } from "react-router-dom";
import baseUrl from "../../url";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Login = () => {
  return (
    <div style={{ margin: "0 auto", width: "400px" }}>
      <Paper>
        <Typography component="h1" variant="h5">
            <div style={{margin:"0 0 0 40%"}}>
              Log in
            </div>
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <a href={`${baseUrl}/auth/google`} style={{margin:"0 0 0 23%"}}>
            <button class="loginBtn loginBtn--google">Login with Google</button>
          </a>
          <a href={`${baseUrl}/auth/facebook`} style={{margin:"0 0 0 21%"}}>
            <button class="loginBtn loginBtn--facebook">
              Login with Facebook
            </button>
          </a>
          <Link component={RouterLink} to="/signup" style={{margin:"0 0 0 20%"}}>
            Don't have an account yet? Create an account here.
          </Link>
        </FormControl>
      </Paper>
    </div>
  );
};

export default Login;
