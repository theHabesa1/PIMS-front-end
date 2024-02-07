// actions/patientActions.js (continued)
import axios from 'axios';

export const FETCH_PATIENTS_REQUEST = 'FETCH_PATIENTS_REQUEST';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';

export const ADD_PATIENT_REQUEST = 'ADD_PATIENT_REQUEST';
export const ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS';
export const ADD_PATIENT_FAILURE = 'ADD_PATIENT_FAILURE';

export const EDIT_PATIENT_REQUEST = 'EDIT_PATIENT_REQUEST';
export const EDIT_PATIENT_SUCCESS = 'EDIT_PATIENT_SUCCESS';
export const EDIT_PATIENT_FAILURE = 'EDIT_PATIENT_FAILURE';

export const DELETE_PATIENT_REQUEST = 'DELETE_PATIENT_REQUEST';
export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
export const DELETE_PATIENT_FAILURE = 'DELETE_PATIENT_FAILURE';

export const fetchPatientsRequest = () => ({
  type: FETCH_PATIENTS_REQUEST,
});

export const fetchPatientsSuccess = (patients) => ({
  type: FETCH_PATIENTS_SUCCESS,
  payload: patients,
});

export const fetchPatientsFailure = (error) => ({
  type: FETCH_PATIENTS_FAILURE,
  payload: error,
});


const addPatientRequest = () => ({
  type: ADD_PATIENT_REQUEST,
});

const addPatientSuccess = (patient) => ({
  type: ADD_PATIENT_SUCCESS,
  payload: patient,
});

const addPatientFailure = (error) => ({
  type: ADD_PATIENT_FAILURE,
  payload: error,
});

const editPatientRequest = () => ({
  type: EDIT_PATIENT_REQUEST,
});

const editPatientSuccess = (updatedPatient) => ({
  type: EDIT_PATIENT_SUCCESS,
  payload: updatedPatient,
});

const editPatientFailure = (error) => ({
  type: EDIT_PATIENT_FAILURE,
  payload: error,
});

const deletePatientRequest = () => ({
  type: DELETE_PATIENT_REQUEST,
});

const deletePatientSuccess = (deletedPatientId) => ({
  type: DELETE_PATIENT_SUCCESS,
  payload: deletedPatientId,
});

const deletePatientFailure = (error) => ({
  type: DELETE_PATIENT_FAILURE,
  payload: error,
});

const apiUrl = process.env.REACT_APP_API_BASE_URL;


export const fetchPatients = () => {
  return async (dispatch) => {
    dispatch(fetchPatientsRequest());
    try {
      const response = await axios.get(`${apiUrl}/patients`);
      dispatch(fetchPatientsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPatientsFailure(error.message));
    }
  };
};

export const addPatient = (patient) => {
  return async (dispatch) => {
    dispatch(addPatientRequest());
    try {
      const response = await axios.post(`${apiUrl}/patients`, patient);
      dispatch(addPatientSuccess(response.data));
      dispatch(fetchPatientsRequest());
    } catch (error) {
      dispatch(addPatientFailure(error.message));
    }
  };
};

export const editPatient = (patient) => {
  return async (dispatch) => {
    dispatch(editPatientRequest());
    try {
      const response = await axios.put(`${apiUrl}/patients/${patient.id}`, patient);
      dispatch(editPatientSuccess(response.data));
    } catch (error) {
      dispatch(editPatientFailure(error.message));
    }
  };
};

export const deletePatient = (patientId) => {
  return async (dispatch) => {
    dispatch(deletePatientRequest());
    try {
      await axios.delete(`${apiUrl}/patients/${patientId}`);
      dispatch(deletePatientSuccess(patientId));
    } catch (error) {
      dispatch(deletePatientFailure(error.message));
    }
  };
};