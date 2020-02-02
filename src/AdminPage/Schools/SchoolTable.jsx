import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import CustomizedSnackbars from "../../commonComponent/SnackBar";

const apiUrl = process.env.REACT_APP_API_URL;

function SchoolTable({ token, refresh, schools, handleSnackBar }) {
  const [schoolsList, setSchoolsList] = useState({});
  const [classroomsList, setClassroomsList] = useState({});

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/schools/${id}`, config)
      .then(res => {
        handleSnackBar("L'établissement a été supprimé", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleUpdate = (id, payload) => {
    axios
      .put(`${apiUrl}/schools/${id}`, payload, config)
      .then(res => {
        handleSnackBar("L'établissement a été modifié");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleCreate = payload => {
    axios
      .post(`${apiUrl}/schools`, payload, config)
      .then(res => {
        handleSnackBar("L'établissement a été créé", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "Etablissement",
            field: "name"
          }
        ]}
        data={schools}
        title="Liste des Etablissements"
        editable={{
          isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              handleCreate(newData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleUpdate(oldData.id, newData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleDelete(oldData.id);
              resolve();
            })
        }}
      />
    </div>
  );
}

export default SchoolTable;
