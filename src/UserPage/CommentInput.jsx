import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { TextField, InputAdornment } from "@material-ui/core";

const CommentInput = ({ value, onChange, inputComment }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      id="input-with-icon-textfield"
      label="Ajouter un commentaire"
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon style={{ cursor: "pointer" }} onClick={inputComment} />
          </InputAdornment>
        )
      }}
    />
  );
};

export default CommentInput;