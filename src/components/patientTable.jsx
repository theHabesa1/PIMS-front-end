import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients,deletePatient  } from '../actions/patientActions.';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditPatientDialog from './EditPatientDialog';
import { useState } from 'react';


const DataTable = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patientReducer.patients);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const rows = patients.map((patient,index) => ({
    id: patient.PatientId || patient.id || index,
    name: patient.Name,
    age: patient.Age,
    sex: patient.Sex,
    contact: patient.Contact,
    date: patient.date,
    time: patient.time,
    doctor: patient.doctor,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'sex', headerName: 'Sex', width: 90 },
    { field: 'contact', headerName: 'Contact', width: 130 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 120 },
    { field: 'doctor', headerName: 'Doctor', width: 150 },
    {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
          <div>
            <a
              href="#"
              style={{
                color: "blue",
                textDecoration: "underline",
                fontSize: "1.1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                handleEdit(params.row);
              }}
            >
               <MdEdit />

            </a>
            {" | "}
            <a
              href="#"
              style={{
                color: "red",
                textDecoration: "underline",
                fontSize: "1.1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                handleDelete(params.row);
              }}
            >
              <MdDelete />
            </a>
          </div>
        ),
      },
  ];

  const handleDelete = (selectedPatient) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedPatient.name}?`);
    if (confirmDelete) {
      dispatch(deletePatient(selectedPatient.id));
    }
  };

  const handleEdit = (editedPatient) => {
    setEditedPatient(editedPatient);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedPatient(null);
  };


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

<EditPatientDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        editedPatient={editedPatient}
      />
    </div>
  );
};

export default DataTable;
