import Record from "../models/RecordModels.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getRecord = async(req, res) => {
    try {
        let response;
        response = await Record.findAll({
            attributes: ['uuid', 'nametype','category','amount', 'createdAt'],
            where:{
                userId: req.userId    
            },
            include:[{
                model:Users,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getRecordById = async(req, res) => {
    try {
        const record = await Record.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!record) return res.status(404).json ({msg: "Data not found"});
        let response;
        response = await Record.findOne({
            attributes: ['uuid', 'nametype','category','amount', 'createdAt'],
            where:{
                [Op.and]:[{id: record.id},{userId: req.userId}]
            },
            include:[{
                model: Users,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const addRecord = async(req, res) => {
    const {nametype, category, amount} = req.body;
    try {
        await Record.create({
            nametype:nametype,
            category: category,
            amount:amount,
            userId:req.userId
        });
        res.status(201).json({msg: "Record created successfully"});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deleteRecord = async(req, res) => {
    try {
        const record = await Record.findOne({
            where:{
                uuid: req.params.id
            }
        });
       if (!record) return res.status(404).json({msg: "Record Not Found"});
        const {nametype, category, amount} = req.body;
        if(req.userId !== record.userId) return res.status(403).json({msg: "Forbidden: Wrong Access"});
        await Record.destroy({
            where:{
                [Op.and]:[{id: record.id}, {userId: req.userId}]
            }
        });
        res.status(200).json({msg: "Record Deleted Successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAmount = async(req, res) => {
    try {
        const response = await Record.findAll({
            attributes:['amount'],
            where:{
                userId: req.userId    
            },
            include:[{
                model:Users,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

