/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import HistoryByPatient from "../../components/HistoryByPatient";
import CreateHistoric from "../../components/employees/CreateHistoric";
import Navbar from "../../components/Navbar";
const PatientHistory = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [createHistoric, setCreateHistoric] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const isCreating = () => {
    setCreateHistoric(true);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handlePatientTreatments = async () => {
    try {
      const PatientTreatements = await actions.getTreatmentsPatient(id);
      store.employee.id
        ? navigate(`/patient-treatments/${id}`)
        : navigate(`/mi-tratamiento/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getPatientData = async () => {
    try {
      const patientDetails = await actions.getPatientById(id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, [id]);

  return (
    <>
      <Navbar />
      {store.patientData && store.patientData.patientData && (
        <div
          className="container-fluid d-flex mx-auto row justify-content-center text-center"
          key={store.patientData.patientData.id}
        >
          <h2>
            Ficha personal de {store.patientData.patientData.firstname}{" "}
            {store.patientData.patientData.lastname}
          </h2>
          <button
            className="btn button1 btn-dark text-black m-3 w-50"
            onClick={() => handlePatientTreatments(id)}
          >
            Ver tratamientos
          </button>
          <div>{createHistoric && <CreateHistoric id={id} />}</div>
          {!createHistoric &&
          ["enfermero", "enfermera"].includes(store.employee.specialist) ? (
            <button className="button1 text-black w-50" onClick={isCreating}>
              Crear nueva historia
            </button>
          ) : null}
          <p>
            Sexo:{" "}
            <span>
              {store.patientData.patientData.sex.toUpperCase() === "H"
                ? "Masculino"
                : "Femenino"}
            </span>{" "}
          </p>
          <p>
            Telefono: <span>{store.patientData.patientData.phone}</span>{" "}
          </p>
          <p>
            Fecha de nacimiento:{" "}
            <span>
              {actions.dateFormater(store.patientData.patientData.birthday)}
            </span>{" "}
          </p>
          <p>
            DNI: <span>{store.patientData.patientData.dni}</span>{" "}
          </p>
          <p>
            Dirección: <span>{store.patientData.patientData.address}</span>{" "}
          </p>
          <p>
            Grupo sanguíneo:{" "}
            <span>
              {store.patientData.patientData.blood_group.toUpperCase()}
            </span>{" "}
          </p>
          <div className="rounded pb-1 mb-5">
            <h3>Historia Clinica: </h3>
            <button
              onClick={handleShow}
              className="button1 btn-dark text-black w-50 mb-3"
            >
              {show ? "Ocultar" : "Ver"}
            </button>
            {show && <HistoryByPatient />}
          </div>
        </div>
      )}
    </>
  );
};

export default PatientHistory;
