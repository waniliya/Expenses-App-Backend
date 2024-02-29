import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Wrong Access"})
    }
    const user = await Users.findOne({

        where: {
            uuid:req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg:"User Unregistered"});
    req.userId = user.id;
    next();
}