import React, { useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { orderBy } from "lodash";

import Alert from "./Alert";
import { useRecursiveGet } from "../hooks/useApi";

function AlertsList({ classes, setAlertCount }) {
  const { datas, request } = useRecursiveGet("/alerts", 10000);
  const [orderedAlertsByTakenInCharge, setOrderedAlerts] = useState([]);

  useEffect(() => {
    request();
    const orderedAlerts = datas && orderBy(datas, ["takenCare"], ["asc"]);
    setOrderedAlerts(orderedAlerts);
  }, []);

  useEffect(() => {
    datas && setAlertCount(datas.length);
    const orderedAlerts = datas && orderBy(datas, ["takenCare"], ["asc"]);
    setOrderedAlerts(orderedAlerts);
  }, [datas]);

  return (
    <List>
      {orderedAlertsByTakenInCharge &&
        orderedAlertsByTakenInCharge.map(alert => (
          <>{!alert.resolved && <Alert alert={alert} classes={classes} />}</>
        ))}
    </List>
  );
}

export default AlertsList;
