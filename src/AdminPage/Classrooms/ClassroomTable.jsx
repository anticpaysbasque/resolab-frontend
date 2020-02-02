import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import CustomizedSnackbars from "../../commonComponent/SnackBar";

const apiUrl = process.env.REACT_APP_API_URL;

function ClassroomTable({
  users,
  token,
  refresh,
  schools,
  classrooms,
  handleSnackBar
}) {
  const [schoolsList, setSchoolsList] = useState({});

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    let formatedSchools = {};
    for (let i = 0; i < schools.length; i++) {
      const key = schools[i].id;
      formatedSchools[key] = schools[i].name;
    }
    setSchoolsList(formatedSchools);
  }, [schools]);

  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/class_rooms/${id}`, config)
      .then(res => {
        handleSnackBar("La classe a été supprimée", "success");
        refresh();
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = (id, payload) => {
    axios
      .put(`${apiUrl}/class_rooms/${id}`, payload, config)
      .then(res => {
        handleSnackBar("La classe a été modifiée", "success");
        refresh();
      })
      .catch(err => console.log(err));
  };

  const handleCreate = payload => {
    axios
      .post(`${apiUrl}/class_rooms`, payload, config)
      .then(res => {
        handleSnackBar("La classe a été créée", "success");
        refresh();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "Classe",
            field: "name"
          },
          {
            title: "Etablissement",
            field: "school.id",
            lookup: schoolsList
          }
        ]}
        data={classrooms}
        title="List des Classes"
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const payload = {
                ...newData,
                school: `/api/schools/${newData.school.id}`
              };
              handleCreate(payload);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const payload = {
                ...newData,
                school: `/api/schools/${oldData.school.id}`
              };
              handleUpdate(oldData.id, payload);
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

export default ClassroomTable;
