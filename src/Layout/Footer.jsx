import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Favorite from "@material-ui/icons/Favorite";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import gitlogo from "../Assets/github-gradient.png";
import linkedinlogo from "../Assets/linkedin-gradient.png";
import DeveloperInfo from "../commonComponent/DeveloperInfo";

const useStyles = makeStyles(theme => ({
  footer: {
    position: "fixed",
    bottom: "0px",
    width: "100%",
    textAlign: "center",
    height: "3rem",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  hover: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70vw"
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "800",
      display: "flex"
    }
  }
}));

function StickyFooter({ isAuth }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [developers] = useState([
    {
      name: "Stéphane Lavaud",
      linkedin: "",
      github: "",
      picture:
        "https://www.jeuxactu.com/datas/jeux/b/o/bob-l-eponge-bataille-pour-bikini-bottom-rehydrate/vn/bob-l-eponge-bataille-p-5cf7dcdf9da2f.jpg"
    },
    {
      name: "Clara Desperben",
      linkedin: "",
      github: "",
      picture: "https://risibank.fr/cache/stickers/d163/16370-full.jpg"
    },
    {
      name: "Angélique Wons",
      linkedin: "",
      github: "",
      picture:
        "https://yt3.ggpht.com/a/AGF-l78XxcqFiL60BYCbtsnLyLcf-DkydeJHN0JK3Q=s900-c-k-c0xffffffff-no-rj-mo"
    },
    {
      name: "Monia Polus",
      linkedin: "",
      github: "",
      picture:
        "https://www.netclipart.com/pp/m/391-3918324_vaporwave-aesthetic-patrickstar-patrick-spongebob-patrick-bob-l.png"
    },
    {
      name: "Anne-Claire Nanot",
      linkedin: "",
      github: "",
      picture:
        "https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/spongebob-squarepants/characters/gary-character-web-desktop.png?height=0&width=480&matte=true&crop=false"
    }
  ]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {!isAuth && (
        <div>
          <CssBaseline />
          <footer className={classes.footer}>
            <Container
              maxWidth="sm"
              onClick={handleOpenModal}
              className={classes.hover}
            >
              <Typography variant="body1" className="footer">
                Made with <Favorite color="Secondary" fontSize="small" /> by
                Wild Code School Biarritz
              </Typography>
            </Container>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <Grid
                  container
                  className={classes.paper}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {developers.map(dev => {
                    return <DeveloperInfo {...dev} />;
                  })}
                </Grid>
              </Fade>
            </Modal>
          </footer>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps)(StickyFooter);

// <Link
//     color="inherit"
//     href="https://www.wildcodeschool.com/fr-FR/campus/biarritz"
// >
// </Link>
