import { list } from "../models/list.js";

// Create List
export const addList = async (req, res) => {
  const { dataArray, fileName ,fileLink } = req.body;

  if (!Array.isArray(dataArray)) {
    return res
      .status(400)
      .json({ message: "Invalid data format. Expected an array." });
  }

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required." });
  }
  if (!fileLink) {
    return res.status(400).json({ message: "fileLink is required." });
  }

  try {
    const formattedLists = dataArray.map((item) => ({
      fileName, 
      fileLink,
      taskList: item.taskList,
      assignedTo: item.assignedTo,
      createdAt: new Date().toISOString(),
    }));

    await list.insertMany(formattedLists);

    res
      .status(200)
      .json({ message: `${formattedLists.length} Lists Added Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error adding lists: ${error.message}` });
  }
};

export const getLists = async (req, res) => {
  try {
    const lists = await list.find().populate("assignedTo");
    res.status(200).json({ lists });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get List by Id
export const getListById = async (req, res) => {
  const { id } = req.params;
  try {
    const lists = await list.findById(id).populate("assignedTo");
    if (!lists) {
      return res.status(404).json({ message: "List Not Found" });
    }
    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update List
export const updateList = async (req, res) => {
  const { id } = req.params;
  const { tasklist, assignedTo } = req.body;
  try {
    const updatedata = {
      tasklist,
      assignedTo,
    };
    const updatedList = await list.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedList) {
      return res.status(404).json({ message: "List Not Found" });
    }
    res.status(200).json({ result: updatedList, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete List
export const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedList = await list.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ message: "List Not Found" });
    }
    res.status(200).json({ message: "List Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
