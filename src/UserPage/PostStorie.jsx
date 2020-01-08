import React from "react";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Button, Box } from "@material-ui/core";

function PostStorie() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button>
        <AddCircleOutlineIcon style={{ fontSize: 60 }} color="disabled" />
      </Button>
      <p>Ta storie</p>
    </Box>
  );
}

export default PostStorie;
