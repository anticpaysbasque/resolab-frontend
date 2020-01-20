import React, { useEffect, useState } from "react";
import { List } from "@material-ui/core";
import axios from "axios";

import Alert from "./Alert";

const apiUrl = process.env.REACT_APP_API_URL;

function AlertsList({ classes }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await axios.get(`${apiUrl}/alerts`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      });
      setAlerts(res.data);
      setTimeout(() => {
        fetchDatas();
      }, 10000);
    };

    fetchDatas();
  }, []);

  return (
    <List>
      {alerts.reverse().map(alert => (
        <>{!alert.resolved && <Alert alert={alert} classes={classes} />}</>
      ))}
    </List>
  );
}

export default AlertsList;
