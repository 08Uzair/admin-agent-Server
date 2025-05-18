import { task } from "../models/task.js";

// Create Task
export const addTask = async (req, res) => {
  // const user = req.userId;
  const { name, phone, notes, assignedTo } = req.body;
  const saveData = new task({
    name,
    phone,
    notes,
    assignedTo,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Task Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Task by Id
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await task.findById(id).populate("agent");
    if (!tasks) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const {  name, phone, notes, assignedTo } = req.body;
  try {
    const updatedata = {
      name, phone, notes, assignedTo 
    };
    const updatedTask = await task.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res
      .status(200)
      .json({ result: updatedTask, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
