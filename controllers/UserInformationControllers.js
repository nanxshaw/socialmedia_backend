const DetailUser = require("../models/DetailUserModels");
const UserInformation = require("../models/UserInformationModels");

exports.all = async (req, res) => {
    UserInformation.hasMany(DetailUser, { foreignKey: 'id_user_information' });
    DetailUser.belongsTo(UserInformation, { foreignKey: "id_user_information" });
    try {
        const result = await UserInformation.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
        });
        res.send({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (err) {
        console.log(err);
    }
}

exports.find_byId = async (req, res) => {
    UserInformation.hasMany(DetailUser, { foreignKey: 'id_user_information' });
    DetailUser.belongsTo(UserInformation, { foreignKey: "id_user_information" });
    try {
        const id = req.params.id;
        const result = await UserInformation.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_user_information: id
            },
        });
        res.send({
            status: 200,
            message: 'success',
            data: result[0]
        });
    } catch (err) {
        console.log(err);
    }
}

exports.insert = async (req, res) => {
    UserInformation.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_user_information' });
    DetailUser.belongsTo(UserInformation, { foreignKey: "id_user_information" });
    try {
        const result = await UserInformation.findAll({
            include: [
                {
                    model: DetailUser,
                    as: 'detail_user',
                    attributes: [],
                    required: true
                },
            ],
            where: {
                '$detail_user.id_detail_user$': req.userId,
            },
        });
        if (result.length < 1) {
            let body = req.body;
            var data_user_information = {
                weight: body.occupation,
                height: body.company,
                zodiac:body.job_type,
                blood_type:body.blood_type,
                vaccinated:body.vaccinated
            }
            const user_information = await UserInformation.create(data_user_information);
            var data_detail_user = {
                id_user_information: user_information.id_user_information,
            }
            await DetailUser.update(data_detail_user, { where: { id_detail_user: req.userId } });
            res.send({
                status: 200,
                message: 'Success insert data!',
            });
        } else {
            res.send({
                status: 401,
                message: "Can't be more than 1",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        let body = req.body;
        var data = {
            weight: body.occupation,
            height: body.company,
            zodiac:body.job_type,
            blood_type:body.blood_type,
            vaccinated:body.vaccinated
        }
        await UserInformation.update(data, {
            where: { id_user_information: req.body.id_user_information }
        });
        res.send({
            status: 200,
            message: 'Success update data!',
        });
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await UserInformation.destroy({
            where: { id_user_information: id }
        });
        var data_detail_user = {
            id_user_information: null,
        }
        await DetailUser.update(data_detail_user, { where: { id_detail_user: req.userId } });
        res.send({
            status: 200,
            message: 'Success delete data!',
        });
    } catch (err) {
        console.log(err);
    }
}