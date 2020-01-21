import React, { useEffect } from "react";
import { List } from "@material-ui/core";

import Alert from "./Alert";
import { useRecursiveGet } from "../hooks/useApi";

function AlertsList({ classes, setAlertCount }) {
  const { datas, request } = useRecursiveGet("/alerts", 10000);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    datas && setAlertCount(datas.length);
  }, [datas]);

  return (
    <List>
      {datas &&
        datas
          .reverse()
          .map(alert => (
            <>{!alert.resolved && <Alert alert={alert} classes={classes} />}</>
          ))}
    </List>
  );
}

export default AlertsList;
