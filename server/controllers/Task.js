const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const task = new Task({
      user: user._id,
      title,
      description,
      status: "In Progress",
    });

    const createdTask = await task.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { tasks: createdTask._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      task,
      message: "Task created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// update task
exports.updateTask = async (req, res) => {
    try {
        const { taskId, title, description, status } = req.body;
        
        if(!taskId){
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.statusa(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if(title){
            task.title = title;
        }
        if(description){
            task.description = description;
        }
        if(status){
            task.status = status;
        }

        await task.save();

        return res.status(200).json({
            success: true,
            task,
            message: "Task updated successfully",
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// get task details
exports.getTaskDetails = async (req, res) => {
    try {
        const { taskId } = req.body;

        if(!taskId){
            return res.status(400).json({
                success: false,
                message: "Please fill details",
            });
        }

        const task = await Task.findById(taskId).populate({path: "user"});

        task.user.password = undefined;

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            task,
            message: "Task fetched successfully",
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// get user's all task
exports.getAllTaskDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const allTasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      allTasks,
      message: "All tasks fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const userId = req.user.id;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { tasks: taskId },
      },
      { new: true }
    );

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};
