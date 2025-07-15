const ConnectionRequestModel = require("../models/connectionRequest.model.js");
const User = require("../models/user.model.js");

// api controller to send connection request

const connectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    if (status != "pending") {
      return res.send("Please send valid status");
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.send("User not found");
    }
    const validConnectionRequest = await User.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (validConnectionRequest) {
      return res.send("Connection request already exists!");
    }

    // const validConnectionRequest = await User.find({
    //   $or: [
    //     { fromUserId, toUserId },
    //     { fromUserId: toUserId, toUserId: fromUserId },
    //   ],
    // });

    // if(validConnectionRequest) {
    //     return res.send("Connection request already exist!")
    // }

    const newConnectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const data = await newConnectionRequest.save();
    res.send(data);
  } catch (err) {
    res.status(400).json({ message: "ERROR : " + err.message });
  }
};

// api controller to get all the pending connection requests of the user

const getConnectionRequests = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    res.send("Invalid User");
  }

  const pendingRequests = await ConnectionRequestModel.find({
    toUserId: userId,
    status: "pending",
  });

  return res.json(pendingRequests);
};

// api controller to accept or reject the connection request

const acceptOrRejectConnectionRequests = async (req, res) => {
  const userId = req.user._id;
  const user = User.findById(userId);
  if (!user) {
    return res.send("Invalid User");
  }

  const connectionRequestId = req.params.connectionId;

  const connectionRequest = await ConnectionRequestModel.findById(
    connectionRequestId
  );

  if (!connectionRequest) {
    return res.send("Invalid Connection ID");
  }

  const updatedStatus = req.params.status;

  const updatedConnection = await ConnectionRequestModel.findByIdAndUpdate(
    connectionRequestId,
    { status: updatedStatus }
  );

  await updatedConnection.save();

  return res.send(`Updated connection status : ${updatedStatus}`);
};

module.exports = {
  connectionRequest,
  getConnectionRequests,
  acceptOrRejectConnectionRequests,
};
