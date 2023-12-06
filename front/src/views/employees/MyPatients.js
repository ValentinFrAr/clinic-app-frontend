/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";

const MyPatients = () => {
  const { store, actions } = useContext(Context);
  const doctorID = store.employee.id;
  const [searchError, setSearchError] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    actions.loadMedicalAppointments(doctorID);
  }, []);

  const headers = [
    { field: "id", label: "ID" },
    { field: "firstname", label: "Nombre" },
    { field: "lastname", label: "Apellido" },
    { field: "dni", label: "DNI" },
    { field: "address", label: "Dirección" },
    { field: "birthday", label: "Fecha de nacimiento" },
    { field: "email", label: "Email" },
    { field: "createdAt", label: "Creado" },
    { field: "updatedAt", label: "Actualizado" },
    { field: "actions", label: "Acciones" },
  ];

  const renderRow = (patient) => (
    <React.Fragment key={patient.id}>
      <tr className="infos-contain">
        <td>{patient.id}</td>
        <td>{patient.firstname}</td>
        <td>{patient.lastname}</td>
        <td>{patient.dni}</td>
        <td>{patient.address}</td>
        <td>{actions.dateFormater(patient.birthday)}</td>
        <td>{patient.email}</td>
        <td>{actions.dateFormater(patient.createdAt)}</td>
        <td>
          {patient.updatedAt !== null
            ? actions.dateFormater(patient.updatedAt)
            : null}
        </td>
        <td>
          <button
            title="historial clínica"
            style={{ border: "none", background: "transparent" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-report-medical"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#36a2a3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ border: "none" }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M10 14l4 0" />
              <path d="M12 12l0 4" />
            </svg>
          </button>
        </td>
      </tr>
    </React.Fragment>
  );

  const handleSearch = (query) => {
    const filtered = store.patients.filter(
      (patient) =>
        patient.firstname.toLowerCase().includes(query.toLowerCase()) ||
        patient.lastname.toLowerCase().includes(query.toLowerCase())
    );
    // Set searchError to true if no employees found
    setSearchError(filtered.length === 0);
    setFilteredPatients(filtered);
  };

  return (
    <>
      <div className="admin-patient-content">
        <h1
          className="text-center font-bold my-4"
          style={{ fontSize: "2.5rem" }}
        >
          Lista de pacientes:
        </h1>
        <SearchBar onSearch={handleSearch} />
        {searchError && (
          <p className="text-center text-danger">
            No se encontraron pacientes.
          </p>
        )}
        <div
          className="table-responsive"
          style={{ width: "100%", margin: "0 auto" }}
        >
          <SortingTable
            headers={headers}
            data={
              filteredPatients.length > 0 ? filteredPatients : store.myPatients
            }
            renderRow={renderRow}
          />
        </div>
      </div>
    </>
  );
};

export default MyPatients;