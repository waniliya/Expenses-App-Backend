import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['uuid', 'name', 'email','income']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}
export const getUserById= async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid','income'],
            where:{
                uuid: req.params.id   
            }
            
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const newUser = async(req, res) => {
    const {name, email, password, confPassword, income} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password and confirm password are not match"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name:name,
            email:email,
            password:hashPassword,
            income:income
        });
        res.status(201).json({msg: "Register Completed"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) => {
    
}

export const addIncome = async(req, res) => {
    const user = await Users.findOne({
        attributes:['uuid','name','email','income'],
        where: {
            uuid:req.session.userId
        }
    });
    const {income} = req.body;
    try {
        await Users.update({
            income:income,
            userId:req.userId
        });
        res.status(201).json({msg: "Income inserted successfully"});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getIncome = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['income','uuid'],
            where:{
                uuid: req.params.id   
            }
            
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const editIncome = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    const {income} = req.body;
    try {
        await Users.update({
            income:income
        },{
            where:{
                id:user.id
            }
        })
        res.status(200).json({msg: "Income Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

