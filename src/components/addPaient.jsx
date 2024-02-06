import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import  styled  from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { addPatient } from '../actions/patientActions.';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = styled('form')`
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
const AddPatientForm = () => {
  const dispatch = useDispatch();
  const [isSidebar, setIsSidebar] = useState(true);
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    sex: '',
    contact: '',
    date: '',
    time: '',
    doctor: ''
  });

  const handleChange = (event) => {
    setPatient({
      ...patient,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(addPatient(patient));
      toast.success('Patient added successfully');
      setPatient({
        name: '',
        age: '',
        sex: '',
        contact: '',
        date: '',
        time: '',
        doctor: '',
      });
    } catch (error) {
      toast.error('Error adding patient');
    }
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <StyledTextField name="name" label="Name" value={patient.name} onChange={handleChange} />
      <StyledTextField name="age" label="Age" value={patient.age} onChange={handleChange} />
      <StyledTextField name="sex" label="Sex" value={patient.sex} onChange={handleChange} />
      <StyledTextField name="contact" label="Contact" value={patient.contact} onChange={handleChange} />
      <StyledTextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} value={patient.date} onChange={handleChange} />
      <StyledTextField name="time" label="Time" type="time" InputLabelProps={{ shrink: true }} value={patient.time} onChange={handleChange} />
      <StyledTextField name="doctor" label="Doctor" value={patient.doctor} onChange={handleChange} />
      <StyledButton type="submit">Add Patient</StyledButton>
    </Form>
    <ToastContainer />
    </>
  );
};

export default AddPatientForm;