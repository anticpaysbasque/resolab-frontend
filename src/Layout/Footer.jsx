import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Favorite from "@material-ui/icons/Favorite";

import "./Footer.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50vh"
  },

  footer: {
    height: "3rem",
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
          <Typography variant="body1" className="footer">
            <Link
              color="inherit"
              href="https://www.wildcodeschool.com/fr-FR/campus/biarritz"
            >
              <p>
                Made with <Favorite color="Secondary" fontSize="small" /> by
                Wild Code School Biarritz
              </p>
            </Link>
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
