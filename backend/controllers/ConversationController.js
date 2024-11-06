import { ConversationModel, MessageModel, UserModel } from "../models/index.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation){
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
      await Promise.all([
        await UserModel.findByIdAndUpdate(senderId, {$push: { conversations: conversation._id }}),
        await UserModel.findByIdAndUpdate(receiverId, {$push: { conversations: conversation._id }})
      ]);
    }
    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId && io) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newConversation", conversation);
		}
    
    return res.status(201).json(conversation);
  } catch (error) {
    console.error("Create conversation error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getUserConversations = async (req, res) => {
  try {
    const senderId = req.user.id;
    let conversations = await ConversationModel.find({
      participants: senderId
    }).populate("participants", "profilePic _id firstName lastName");

    if (!conversations) return res.status(200).json([]);

    const filteredConversations = conversations.map(conversation => {
      const otherParticipant = conversation.participants.find(
        participant => participant._id.toString() !== senderId
      );
      return {
        ...conversation.toObject(),
        participants: otherParticipant
      };
    });

    return res.status(200).json(filteredConversations);
  } catch (error) {
    console.error("Get user conversations error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const deleteConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: conversationId } = req.params;

    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation)
      return res.status(404).json({ message: "Converssation not found" });

    const senderParticipant = conversation.participants.find(id => id.toString() === userId.toString())
    if(!senderParticipant)
        return res.status(404).json({ message: "Participent not found" });
      
    const receiverParticipant = conversation.participants.find(id => id.toString() !== userId.toString())

    await Promise.all([
        ConversationModel.findByIdAndDelete(conversationId),
        UserModel.findByIdAndUpdate(userId, {$pull: { conversations: conversationId }}),
        UserModel.findByIdAndUpdate(receiverParticipant, {$pull: { conversations: conversationId }}),
        MessageModel.deleteMany({
          $or: [
            { senderId: userId, receiverId: receiverParticipant },
            { senderId: receiverParticipant, receiverId: userId }
          ]
        })
    ]);


    res.send({ message: "Successfully delete conversation" });
  } catch (error) {
    console.error("Delete conversation error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
