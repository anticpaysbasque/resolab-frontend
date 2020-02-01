import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Layout from "../Layout/Layout";
import CreateUser from "./Users/CreateUser";

const apiUrl = process.env.REACT_APP_API_URL;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  tabWrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginTop: "143px"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

export default function AdminPage() {
  const history = useHistory();

  const handleExit = () => {
    history.push("/moderator");
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className={classes.tabWrapper}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label="Créer un utilisateur" {...a11yProps(0)} />
          <Tab label="Gérer les utilisateurs" {...a11yProps(1)} />
          <Tab label="Créer un établissement" {...a11yProps(2)} />
          <Tab label="Gérer les établissements" {...a11yProps(3)} />
          <Tab label="Créer une classe" {...a11yProps(4)} />
          <Tab label="Gérer les classes" {...a11yProps(5)} />
          <Button onClick={() => handleExit()}>Retour</Button>
        </Tabs>
        <TabPanel value={value} index={0}>
          <CreateUser />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </div>
    </Layout>
  );
}
