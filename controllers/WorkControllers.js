const DetailUser = require("../models/DetailUserModels");
const Work = require("../models/WorkModels");

exports.all = async (req, res) => {
    Work.hasMany(DetailUser, { foreignKey: 'id_work' });
    DetailUser.belongsTo(Work, { foreignKey: "id_work" });
    try {
        const result = await Work.findAll({
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
    Work.hasMany(DetailUser, { foreignKey: 'id_work' });
    DetailUser.belongsTo(Work, { foreignKey: "id_work" });
    try {
        const id = req.params.id;
        const result = await Work.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_work: id
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
    Work.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_work' });
    DetailUser.belongsTo(Work, { foreignKey: "id_work" });
    try {
        const result = await Work.findAll({
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
            var data_work = {
                occupation: body.occupation,
                company: body.company,
                job_type:body.job_type
            }
            const work = await Work.create(data_work);
            var data_detail_user = {
                id_work: work.id_work,
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
            occupation: body.occupation,
            company: body.company,
            job_type:body.job_type
        }
        await Work.update(data, {
            where: { id_work: req.body.id_work }
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
        await Work.destroy({
            where: { id_work: id }
        });
        var data_detail_user = {
            id_work: null,
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