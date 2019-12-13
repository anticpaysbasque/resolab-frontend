import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Favorite from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50vh"
  },

  footer: {
    padding: theme.spacing(6, 3),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Link
              color="inherit"
              href="https://www.wildcodeschool.com/fr-FR/campus/biarritz"
            >
              Made with <Favorite color="Secondary" /> by wild Code School
              Biarritz
            </Link>
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
