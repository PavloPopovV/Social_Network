import { ConversationModel, MessageModel } from "../models/index.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const { message } = req.body;

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);


    // socket integration
    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId && io) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send messages error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages", 
      populate: [
        { path: "senderId", select: "profilePic _id firstName" },
        { path: "receiverId", select: "profilePic _id firstName" }
      ]
    });

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

