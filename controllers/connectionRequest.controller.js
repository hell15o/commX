const ConnectionRequestModel = require("../models/connectionRequest.model.js");
const User = require("../models/user.model.js");

const connectionRequest = async (req, res) => {

    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        if(status != "pending"){
            return res.send("Please send valid status")
        }

        const toUser = await User.findById(toUserId)

        if(!toUser){
            return res.send("User not found")
        }

        const validConnectionRequest = await User.find({
          $or: [{fromUserId, toUserId},{fromUserId:toUserId,toUserId:fromUserId}],
        });
        
        if(validConnectionRequest) {
            return res.send("Connection request already exist!")
        }

        const newConnectionRequest = new ConnectionRequestModel({fromUserId, toUserId, status});
        const data = await newConnectionRequest.save();
        res.send(data);
    } catch(err) {
        res.status(400).json({message:"ERROR : "+ err.message})
    }

}

module.exports = {connectionRequest};