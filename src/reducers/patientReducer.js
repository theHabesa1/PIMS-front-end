// reducers/patientReducer.js
import {
    FETCH_PATIENTS_REQUEST,
    FETCH_PATIENTS_SUCCESS,
    FETCH_PATIENTS_FAILURE,
    ADD_PATIENT_REQUEST,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAILURE,
    EDIT_PATIENT_REQUEST,
    EDIT_PATIENT_SUCCESS,
    EDIT_PATIENT_FAILURE,
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    DELETE_PATIENT_FAILURE,
  } from "../actions/patientActions.";
  
  const initialState = {
    patients: [],
    loading: false,
    error: null,
  };
  
  const patientReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PATIENT_REQUEST:
      case EDIT_PATIENT_REQUEST:
      case DELETE_PATIENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case ADD_PATIENT_SUCCESS:
        return {
          ...state,
          loading: false,
          patients: [...state.patients, action.payload],
        };
  
      case EDIT_PATIENT_SUCCESS:
        const updatedPatients = state.patients.map((patient) =>
          patient.PatientId === action.payload.PatientId ? action.payload : patient
        );
        return {
          ...state,
          loading: false,
          patients: updatedPatients,
        };
  
      case DELETE_PATIENT_SUCCESS:
        const filteredPatients = state.patients.filter(
          (patient) => patient.PatientId !== action.payload
        );
        return {
          ...state,
          loading: false,
          patients: filteredPatients,
        };
  
      case ADD_PATIENT_FAILURE:
      case EDIT_PATIENT_FAILURE:
      case DELETE_PATIENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case FETCH_PATIENTS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_PATIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          patients: action.payload,
          error: null,
        };
      case FETCH_PATIENTS_FAILURE:
        return {
          ...state,
          loading: false,
          patients: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default patientReducer;
  