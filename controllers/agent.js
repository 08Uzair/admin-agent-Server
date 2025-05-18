import { agent } from "../models/agent.js";

// Create Agent
export const addAgent = async (req, res) => {
  const { name, email, password, phone, agentAdmin } = req.body;
  const saveData = new agent({
    name,
    agentAdmin,
    email,
    password,
    phone,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Agent Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await agent.find();
    res.status(200).json({ agents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Agent by Id
export const getAgentById = async (req, res) => {
  const { id } = req.params;
  try {
    const agents = await agent.findById(id);
    if (!agents) {
      return res.status(404).json({ message: "Agent Not Found" });
    }
    res.status(200).json(agents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Agent
export const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone } = req.body;
  try {
    const updatedata = {
      name,
      email,
      password,
      phone,
    };
    const updatedAgent = await agent.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent Not Found" });
    }
    res
      .status(200)
      .json({ result: updatedAgent, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Agent
export const deleteAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAgent = await agent.findByIdAndDelete(id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent Not Found" });
    }
    res.status(200).json({ message: "Agent Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
