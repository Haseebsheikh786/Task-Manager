import React, { useState } from "react";

const SubPhase = ({ subPhase, onSelectPhase }) => {
  const [showSubPhases, setShowSubPhases] = useState(false);

  const handleSubPhaseClick = () => {
    if (subPhase.subphases && subPhase.subphases.length > 0) {
      setShowSubPhases(!showSubPhases);
    }
  };

  return (
    <li className="">
      <button
        className="btn btn-primary btn-sm my-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title={subPhase.description}
        onClick={handleSubPhaseClick}
      >
        {subPhase.name}
      </button>
      {showSubPhases && subPhase.subphases && (
        <ol>
          {subPhase.subphases.map((nestedSubPhase, index) => (
            <SubPhase
              key={index}
              subPhase={nestedSubPhase}
              onSelectPhase={onSelectPhase}
            />
          ))}
        </ol>
      )}
    </li>
  );
};

export default SubPhase;
