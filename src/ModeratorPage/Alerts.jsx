import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "../Layout/Scroll.css";

function Alerts({ classes }) {
  return (
    <>
      <div className="scroll-alerts">
        {/* {children} */}
        <Card className={classes.card} />
        <CardHeader
          title={
            // <Box display="flex">
            //   {/* <Notifications /> */}
            <Typography>Notifications</Typography>
            // </Box>
          }
          style={{ padding: "2px" }}
        ></CardHeader>
      </div>
    </>
  );
}

export default Alerts;
