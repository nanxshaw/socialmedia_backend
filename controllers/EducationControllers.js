const DetailUser = require("../models/DetailUserModels");
const Education = require("../models/EducationModels");

exports.all = async (req, res) => {
    Education.hasMany(DetailUser, { foreignKey: 'id_education' });
    DetailUser.belongsTo(Education, { foreignKey: "id_education" });
    try {
        const result = await Education.findAll({
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
    Education.hasMany(DetailUser, { foreignKey: 'id_education' });
    DetailUser.belongsTo(Education, { foreignKey: "id_education" });
    try {
        const id = req.params.id;
        const result = await Education.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_education: id
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
    Education.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_education' });
    DetailUser.belongsTo(Education, { foreignKey: "id_education" });
    try {
        const result = await Education.findAll({
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
            var data_education = {
                school: body.school,
                IPK: body.IPK
            }
            const education = await Education.create(data_education);
            var data_detail_user = {
                id_education: education.id_education,
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
            school: body.school,
            IPK: body.IPK
        }
        await Education.update(data, {
            where: { id_education: req.body.id_education }
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
        await Education.destroy({
            where: { id_education: id }
        });
        var data_detail_user = {
            id_education: null,
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