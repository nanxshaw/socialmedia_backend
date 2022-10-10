const DetailUser = require("../models/DetailUserModels");
const Verification = require("../models/WorkModels");

exports.all = async (req, res) => {
    Verification.hasMany(DetailUser, { foreignKey: 'id_verification' });
    DetailUser.belongsTo(Verification, { foreignKey: "id_verification" });
    try {
        const result = await Verification.findAll({
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
    Verification.hasMany(DetailUser, { foreignKey: 'id_verification' });
    DetailUser.belongsTo(Verification, { foreignKey: "id_verification" });
    try {
        const id = req.params.id;
        const result = await Verification.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_verification: id
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
    Verification.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_verification' });
    DetailUser.belongsTo(Verification, { foreignKey: "id_verification" });
    try {
        const result = await Verification.findAll({
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
            var data_verification = {
                ktp:body.ktp,
                user_ktp:body.user_ktp,
                status_verification:body.status_verification,
            }
            const work = await Verification.create(data_verification);
            var data_detail_user = {
                id_verification: work.id_verification,
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
            ktp:body.ktp,
            user_ktp:body.user_ktp,
            status_verification:body.status_verification,
        }
        await Verification.update(data, {
            where: { id_verification: req.body.id_verification }
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
        await Verification.destroy({
            where: { id_verification: id }
        });
        var data_detail_user = {
            id_verification: null,
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