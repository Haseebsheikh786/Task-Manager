import React, { useEffect, useState } from "react";
import PhaseDetail from "./PhaseDetail";
import SubPhase from "./SubPhase";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhaseAsync,
  fetchPhaseAsync,
  getAllPhase,
} from "../store/PhaseSlice";
import { Card, Table } from "reactstrap";
import AddPhase from "./AddPhase";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const toggleView = () => {
    setViewModal(!viewModal);
  };
  const [selectedPhase, setSelectedPhase] = useState(null);
  const phases = useSelector(getAllPhase);
  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
  };
  useEffect(() => {
    setViewModal(false);
    setSelectedPhase(null);
  }, []);

  const renderSubPhases = (subPhases) => {
    if (!subPhases || subPhases.length === 0) return null;
    return subPhases.map((subPhase, index) => (
      <SubPhase
        key={index}
        subPhase={subPhase}
        onSelectPhase={handlePhaseClick}
      />
    ));
  };

  useEffect(() => {
    dispatch(fetchPhaseAsync());
  }, [dispatch]);
  return (
    <div className="mx-3">
      <h1 className="font-bold text-center my-4">Task Manager</h1>

      <Card className="container col-sm-12 col-md-8 col-lg-5">
        <Table striped responsive borderless>
          <>
            <thead>
              <tr className="text-center">
                <th>
                  <strong>Phase Name</strong>
                </th>
                <th>
                  <strong>View</strong>
                </th>
                <th>
                  <strong>Edit</strong>
                </th>
                <th>
                  <strong>Delete</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {phases &&
                phases?.map((phaseData, index) => (
                  <tr className="text-center" key={index}>
                    <td
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={phaseData.description}
                    >
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          handlePhaseClick(phaseData);
                          toggleView();
                        }}
                      >
                        {" "}
                        {phaseData.name}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={() => {
                          handlePhaseClick(phaseData);
                          toggleView();
                        }}
                      >
                        <i class="fa fa-solid fa-eye"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => {
                          handlePhaseClick(phaseData);
                          toggle();
                        }}
                      >
                        <i class="fa fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => {
                          dispatch(deletePhaseAsync(phaseData._id));
                          toast("Phase deleted successfully");
                        }}
                      >
                        <i class="fa fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        </Table>
      </Card>

      <PhaseDetail
        selectedPhase={selectedPhase}
        renderSubPhases={renderSubPhases}
        modal={viewModal}
        toggle={toggleView}
      />
      <AddPhase
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedPhase={selectedPhase}
      />
    </div>
  );
};

export default Dashboard;
