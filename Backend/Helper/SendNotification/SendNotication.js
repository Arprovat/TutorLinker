const Notification_Model = require("../../Models/Notification/Notification_Model")

const SendNotification=async(senderId,receiverId,message,type)=>{
    try {
        const notifyUser= {
                    senderId,
                    receiverId,
                    message,
                    type
                }
               const result= await Notification_Model.create(notifyUser)
               return result
    } catch (error) {
       throw new error('server error')
    }
}
module.exports =SendNotification