import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { VpnKey, Person, Error } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(4)
  }
}));

export default function LogIn() {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLogginError, setIsLogginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleLogin = () => {
    // checking if input are filled

    if (login === "") {
      setIsLogginError(true);
    } else {
      setIsLogginError(false);
    }

    if (password === "") {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
    // call API for authentification
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>Connectes toi à Résolab</Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl className={classes.margin} required>
          <InputLabel htmlFor="userLogin">Ton nom d'utilisateur</InputLabel>
          <Input
            id="userLogin"
            error={isLogginError}
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl className={classes.margin} required>
          <InputLabel htmlFor="password">Ton mot de passe</InputLabel>
          <Input
            id="password"
            type="password"
            error={isPasswordError}
            startAdornment={
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            }
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin()}
        >
          Se connecter
        </Button>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.margin}
        >
          {isLogginError || isPasswordError ? (
            <>
              <Error />
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item>
          {isLogginError ? (
            <Typography color="error" align="center">
              Attention, tu as oublié de saisir ton nom d'utilisateur. <br />
              Remplis ton nom d'utilisateur, et essaie à nouveau
            </Typography>
          ) : (
            <></>
          )}
          {isPasswordError ? (
            <Typography color="error" align="center">
              Attention, tu as oublié de saisir ton mot de passe. <br />
              Remplis ton mot de passe, et essaie à nouveau
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
