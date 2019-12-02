import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment
} from "@material-ui/core";
import { AccountCircle, VpnKey, Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function LogIn() {
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">
          Nom d'utilisateur
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">
          Mot de passe
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}
