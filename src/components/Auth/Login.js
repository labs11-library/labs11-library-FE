import React from "react";
import { Link as RouterLink } from "react-router-dom";
import baseUrl from "../../url";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
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
