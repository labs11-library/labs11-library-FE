import React from "react";
import { Link as RouterLink } from "react-router-dom";
import backendBaseUrl from '../url'
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
        <form>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Log in
          </Button>
        </form>
        <FormControl margin="normal" required fullWidth>
          <Link component={RouterLink} to="/signup">
            Sign up
          </Link>
          <a href={`${backendBaseUrl}/auth/google`}>
            <button class="loginBtn loginBtn--google">Login with Google</button>
          </a>
          <a href={`${backendBaseUrl}/auth/facebook`}>
            <button class="loginBtn loginBtn--facebook">
              Login with Facebook
            </button>
          </a>
        </FormControl>
      </Paper>
    </div>
  );
};

export default Login;
