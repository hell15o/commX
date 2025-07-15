const User = require("../models/user.model");
const ConnectionRequestModel = require("../models/connectionRequest.model");


const getConnectionRequests = async (req, res) => {
    const userId = req.user._id;
    const user = User.findById(userId);
    if(! user){
        res.send("Invalid User");
    }

    const pendingRequests = ConnectionRequestModel.findMany({
        toUserId: userId,
        status: "pending"
    });

    return res.send(pendingRequests);


}

module.exports = {getConnectionRequests};