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
          Log in
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <a href={`${baseUrl}/auth/google`}>
            <button class="loginBtn loginBtn--google">Login with Google</button>
          </a>
          <a href={`${baseUrl}/auth/facebook`}>
            <button class="loginBtn loginBtn--facebook">
              Login with Facebook
            </button>
          </a>
          <Link component={RouterLink} to="/signup">
            Don't have an account yet? Create an account here.
          </Link>
        </FormControl>
      </Paper>
    </div>
  );
};

export default Login;
