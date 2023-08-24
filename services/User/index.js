const {User, Role} = require('../../models');
const jwt = require("jsonwebtoken");
const process = require("process");
const bcrypt = require("bcrypt");
const {Sequelize} = require("sequelize");
const env = require('dotenv').config().parsed;

async function loginUser(params) {

    const {email, password} = params;

    const user = await User.findOne({
        where: {
            email: email,
        },
        include:Role
    });

    if (!user) {
        return {
            error: 'Auth Failed..',
            message: 'Hatalı Kullanıcı Bilgileri.'
        }
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return {
            error: 'Auth Failed..',
            message: 'Hatalı Kullanıcı Bilgileri.'
        }

    }


    try {

        let user_token = await jwt.sign({email: user.email, UserId: user.id, role: user.Role.role}, env.ACCESS_SECRET, {expiresIn: '30d'});

        let userInfo = {
            email: user.email,
        }

        return {
            success: 'Token Generated!',
            access_token: user_token,
            user_info: userInfo

        }
    } catch (error) {
        if(error && error.errors.length)
            return error.errors[0].message
    }
}

async function addUser(params) {

    const {firstName, lastName, email, password} = params

    try {

        const user = await User.create({firstName, lastName, email, password})

        return {
            success: true,
            message: 'User created successfully',
            email: user.email
        }
    } catch (error) {
        if(error && error.errors.length)
            return error.errors[0].message
    }
}

async function getAllUsers(requestUser) {

    try {

        const users = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.ne]: requestUser.UserId,
                },
            },
            include: Role
        });

        return {
            success: true,
            message: 'All users',
            users
        }

    } catch (error) {
        if(error && error.errors.length)
        return error.errors[0].message
    }
}

async function updateUser(params) {
    const {id} = params

    delete params.id
    try {

        const user = await User.findByPk(id);

        if (!user) {
            return {
                error: true,
                message: "Kullanıcı bulunamadı"
            }
        }

        await user.update(params);

        return {
            error: false,
            message: "Kullanıcı güncelleme başarılı",
            user
        }

    } catch (error) {

        if(error && error.errors.length)
        return error.errors[0].message
    }
}

async function removeUser(params) {

    const {userId} = params

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return {
                error: true,
                message: "Kullanıcı bulunamadı"
            }
        }

        await user.destroy();

        return {
            error: false,
            message: "Kullanıcı başarılı bir şekilde silindi"
        }

    } catch (error) {
        if(error && error.errors.length)
        return error.errors[0].message
    }
}


module.exports = {loginUser, addUser, getAllUsers, updateUser, removeUser}
