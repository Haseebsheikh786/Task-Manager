import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
const PhaseDetail = ({ selectedPhase, renderSubPhases, toggle, modal }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalBody>
        <h3 className="text-center mt-2 mb-4">
          {selectedPhase ? selectedPhase.name : ""}
        </h3>
        <ol className="mx-sm-3 ">
          {selectedPhase && renderSubPhases(selectedPhase.subphases)}
        </ol>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-danger" onClick={toggle}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default PhaseDetail;
