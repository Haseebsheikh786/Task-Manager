const Phase = require("../models/PhaseModel");

exports.createPhase = async (req, res) => {
  try {
    const { name, description, subphases } = req.body;

    const phase = new Phase({
      name,
      description,
      subphases,
    });

    await phase.save();

    res.status(201).json({ success: true, data: phase });
  } catch (error) {
    console.error("Error creating phase:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getAllPhases = async (req, res) => {
  try {
    const phases = await Phase.find();
    res.status(200).json({ success: true, data: phases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deletePhaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const phase = await Phase.findOne({ _id: id });

    if (!phase) {
      return res.status(404).json({ success: false, error: "Phase not found" });
    }

    await Phase.deleteOne({ _id: id });
    res.status(200).json({ success: true, _id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.editPhase = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, subphases } = req.body;

    const phase = await Phase.findOneAndUpdate(
      { _id: id },
      { name, description, subphases },
      { new: true }
    );

    if (!phase) {
      return res.status(404).json({ success: false, error: "Phase not found" });
    }

    res.status(200).json({ success: true, data: phase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
