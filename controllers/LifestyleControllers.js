const DetailUser = require("../models/DetailUserModels");
const Lifestyle = require("../models/LifestyleModels");

exports.all = async (req, res) => {
    Lifestyle.hasMany(DetailUser, { foreignKey: 'id_lifestyle' });
    DetailUser.belongsTo(Lifestyle, { foreignKey: "id_lifestyle" });
    try {
        const result = await Lifestyle.findAll({
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
    Lifestyle.hasMany(DetailUser, { foreignKey: 'id_lifestyle' });
    DetailUser.belongsTo(Lifestyle, { foreignKey: "id_lifestyle" });
    try {
        const id = req.params.id;
        const result = await Lifestyle.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_lifestyle: id
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
    Lifestyle.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_lifestyle' });
    DetailUser.belongsTo(Lifestyle, { foreignKey: "id_lifestyle" });
    try {
        const result = await Lifestyle.findAll({
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
            var data_lifestyle = {
                looking_for: body.looking_for,
                pets: body.pets,
                exercise:body.exercise,
                smoking:body.smoking,
                drinking:body.drinking,
                off_day:body.off_day,
                diet:body.diet
            }
            const work = await Lifestyle.create(data_lifestyle);
            var data_detail_user = {
                id_lifestyle: work.id_lifestyle,
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
            looking_for: body.looking_for,
            pets: body.pets,
            exercise:body.exercise,
            smoking:body.smoking,
            drinking:body.drinking,
            off_day:body.off_day,
            diet:body.diet
        }
        await Lifestyle.update(data, {
            where: { id_lifestyle: req.body.id_lifestyle }
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
        await Lifestyle.destroy({
            where: { id_lifestyle: id }
        });
        var data_detail_user = {
            id_lifestyle: null,
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