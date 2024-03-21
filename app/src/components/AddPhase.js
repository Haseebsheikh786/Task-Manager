import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPhaseAsync, editPhaseAsync } from "../store/PhaseSlice";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
const AddPhase = ({ toggle, modal, setModal, selectedPhase }) => {
  const dispatch = useDispatch();
  const [NestedModal, setNestedModal] = useState(false);
  const [phaseName, setPhaseName] = useState("");
  const [phaseDescription, setPhaseDescription] = useState("");
  const [subphases, setSubphases] = useState([]);
  const [nestedSubphases, setNestedSubphases] = useState([]);
  const [nestedSubphaseIndex, setNestedSubphaseIndex] = useState(null);

  useEffect(() => {
    if (selectedPhase) {
      setPhaseName(selectedPhase?.name || "");
      setPhaseDescription(selectedPhase?.description || "");
      setSubphases(selectedPhase?.subphases || []);
      setNestedSubphases([]);
      setNestedSubphaseIndex(null);
    }
  }, [selectedPhase]);

  const handleAddSubphase = () => {
    const newSubphase = { name: "", description: "", subphases: [] };
    setSubphases([...subphases, newSubphase]);
  };

  const handleRemoveSubphase = (index) => {
    const updatedSubphases = [...subphases];
    updatedSubphases.splice(index, 1);
    setSubphases(updatedSubphases);
  };

  const handleAddNestedSubphase = (index) => {
    const existingNestedSubphases = subphases[index].subphases;
    if (existingNestedSubphases && existingNestedSubphases.length > 0) {
      setNestedSubphases([...existingNestedSubphases]);
    } else {
      setNestedSubphases([{ name: "", description: "" }]);
    }
    setNestedSubphaseIndex(index);
    setNestedModal(true);
    setModal(false);
  };

  const handleRemoveNestedSubphase = (nestedIndex) => {
    const updatedNestedSubphases = [...nestedSubphases];
    updatedNestedSubphases.splice(nestedIndex, 1);
    setNestedSubphases(updatedNestedSubphases);
  };

  const handleSaveNestedSubphase = () => {
    const updatedSubphases = [...subphases];
    const parentSubphase = updatedSubphases[nestedSubphaseIndex];
    const newNestedSubphases = nestedSubphases.map((subphase) => ({
      ...subphase,
    }));

    parentSubphase.subphases = newNestedSubphases;

    setSubphases(updatedSubphases);
    setNestedModal(false);
    setModal(true);
  };

  const handleAddNestedSubphases = () => {
    setNestedSubphases([...nestedSubphases, { name: "", description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: phaseName.trim(),
      description: phaseDescription.trim(),
      subphases: subphases,
    };

    try {
      if (selectedPhase) {
        dispatch(editPhaseAsync({ id: selectedPhase._id, data }));
        toast("Edit Phase Successfully");
      } else {
        dispatch(createPhaseAsync(data));
        toast("Added Phase  successfully");
      }
      setModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!modal && !NestedModal) {
      setPhaseName("");
      setPhaseDescription("");
      setSubphases([]);
      setNestedSubphases([]);
      setNestedSubphaseIndex(null);
    }
  }, [modal, NestedModal]);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <h3 className="text-center my-2">Create new Phase</h3>
            <div className="mb-3">
              <label htmlFor="phaseName" className="form-label">
                Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="phaseName"
                value={phaseName}
                onChange={(e) => setPhaseName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phaseDescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                required
                id="phaseDescription"
                value={phaseDescription}
                onChange={(e) => setPhaseDescription(e.target.value)}
              />
            </div>
            <h5 className="my-3 text-center">Subphase</h5>
            {subphases.map((subphase, index) => (
              <div key={index} className="mb-3">
                <label className="form-label"> Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={subphase.name}
                  onChange={(e) => {
                    const updatedSubphases = [...subphases];
                    updatedSubphases[index] = {
                      ...updatedSubphases[index],
                      name: e.target.value,
                    };
                    setSubphases(updatedSubphases);
                  }}
                />
                <label className="form-label"> Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={subphase.description}
                  onChange={(e) => {
                    const updatedSubphases = [...subphases];
                    updatedSubphases[index] = {
                      ...updatedSubphases[index],
                      description: e.target.value,
                    };
                    setSubphases(updatedSubphases);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-secondary mt-2"
                  onClick={() => handleAddNestedSubphase(index)}
                >
                  Add Nested Subphase
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2 mx-1"
                  onClick={() => handleRemoveSubphase(index)}
                >
                  Remove Subphase
                </button>
              </div>
            ))}
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary my-2"
                onClick={handleAddSubphase}
              >
                Add Subphase
              </button>
            </div>
            <ModalFooter>
              <button type="submit" className="btn btn-secondary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>{" "}
      <Modal isOpen={NestedModal} toggle={() => setNestedModal(!NestedModal)}>
        <ModalBody>
          <h3 className="text-center my-2"> Create Nested Subphase</h3>

          {nestedSubphases.map((nestedSubphase, nestedIndex) => (
            <div key={nestedIndex} className="mt-2">
              <label className="form-label"> Name</label>
              <input
                type="text"
                required
                className="form-control"
                value={nestedSubphase.name}
                onChange={(e) => {
                  const updatedNestedSubphases = [...nestedSubphases];
                  updatedNestedSubphases[nestedIndex] = {
                    ...updatedNestedSubphases[nestedIndex],
                    name: e.target.value,
                  };
                  setNestedSubphases(updatedNestedSubphases);
                }}
              />
              <label className="form-label">Description</label>
              <input
                required
                type="text"
                className="form-control"
                value={nestedSubphase.description}
                onChange={(e) => {
                  const updatedNestedSubphases = [...nestedSubphases];
                  updatedNestedSubphases[nestedIndex] = {
                    ...updatedNestedSubphases[nestedIndex],
                    description: e.target.value,
                  };
                  setNestedSubphases(updatedNestedSubphases);
                }}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm mt-2"
                onClick={() => handleRemoveNestedSubphase(nestedIndex)}
              >
                Remove Nested Subphase
              </button>
            </div>
          ))}
          <div className="text-center mt-2">
            <button
              type="button"
              className="btn btn-primary btn-sm mt-2"
              onClick={handleAddNestedSubphases}
            >
              Add Nested Subphase
            </button>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleSaveNestedSubphase}
            disabled={nestedSubphases.some(
              (subphase) => subphase.name.trim() === ""
            )}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setNestedModal(false);
              setModal(true);
            }}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddPhase;
