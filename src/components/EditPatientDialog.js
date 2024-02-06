// components/EditPatientDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import  styled  from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { editPatient,fetchPatients } from '../actions/patientActions.';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  margin: auto;
`;

const StyledTextField = styled(TextField)`
  .MuiInputBase-input {
    color: #333;
  }
  .MuiFormLabel-root {
    color: #666;
  }
`;
const StyledButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;
const EditPatientDialog = ({ open, handleClose, editedPatient }) => {

  const dispatch = useDispatch();
  const [editedFields, setEditedFields] = useState({
    name: editedPatient ? editedPatient.name : '',
    age: editedPatient ? editedPatient.age : '',
    sex: editedPatient ? editedPatient.sex : '',
    contact: editedPatient ? editedPatient.contact : '',
    date: editedPatient ? editedPatient.date : '',
    time: editedPatient ? editedPatient.time : '',
    doctor: editedPatient ? editedPatient.doctor : '',
  });

  useEffect(() => {
    // Update editedFields when the editedPatient changes
    setEditedFields({
      name: editedPatient ? editedPatient.name : '',
      age: editedPatient ? editedPatient.age : '',
      sex: editedPatient ? editedPatient.sex : '',
      contact: editedPatient ? editedPatient.contact : '',
      date: editedPatient ? formatReverseDate(editedPatient.date) : '',
      time: editedPatient ? editedPatient.time : '',
      doctor: editedPatient ? editedPatient.doctor : '',
    });
  }, [editedPatient]);

  const formatReverseDate = (originalDate) => {
    const dateObject = new Date(originalDate);
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const year = dateObject.getFullYear();
  
    return `${year}-${month}-${day}`;
  };

  const handleFieldChange = (field, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };



  const handleSave = async () => {
    try {
      // Dispatch the editPatient action to update the patient in the backend
      const formattedDate = new Date(editedFields.date).toLocaleDateString('en-CA');
      await dispatch(editPatient({ id: editedPatient.id, ...editedFields,date: formattedDate }));
      dispatch(fetchPatients());
      toast.success('Patient information updated successfully');
      handleClose();
    } catch (error) {
      toast.error('Failed to update patient information');
      console.error(error);
    }
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent>
      <StyledForm>
          <StyledTextField
            label="Name"
            value={editedFields.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
          <StyledTextField
            label="Age"
            type="number"
            value={editedFields.age}
            onChange={(e) => handleFieldChange('age', e.target.value)}
          />
          <StyledTextField
            label="Sex"
            value={editedFields.sex}
            onChange={(e) => handleFieldChange('sex', e.target.value)}
          />
          <StyledTextField
            label="Contact"
            value={editedFields.contact}
            onChange={(e) => handleFieldChange('contact', e.target.value)}
          />
          <StyledTextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editedFields.date}
            onChange={(e) => handleFieldChange('date', e.target.value)}
          />
          <StyledTextField
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={editedFields.time}
            onChange={(e) => handleFieldChange('time', e.target.value)}
          />
          <StyledTextField
            label="Doctor"
            value={editedFields.doctor}
            onChange={(e) => handleFieldChange('doctor', e.target.value)}
          />
          {/* Add other fields as needed */}
        </StyledForm>
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
      <StyledButton onClick={handleSave}>Save</StyledButton>
        <Button onClick={handleClose}>Cancel</Button>
        
      </DialogActions>
    </Dialog>
    <ToastContainer />
    </>
  );
};

export default EditPatientDialog;
