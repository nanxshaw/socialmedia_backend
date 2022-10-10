const DetailUser = require("../models/DetailUserModels");
const Interested = require("../models/InterestedModels");

exports.all = async (req, res) => {
    Interested.hasMany(DetailUser, { foreignKey: 'id_interested' });
    DetailUser.belongsTo(Interested, { foreignKey: "id_interested" });
    try {
        const result = await Interested.findAll({
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
    Interested.hasMany(DetailUser, { foreignKey: 'id_interested' });
    DetailUser.belongsTo(Interested, { foreignKey: "id_interested" });
    try {
        const id = req.params.id;
        const result = await Interested.findAll({
            include: [
                {
                    model: DetailUser,
                    attributes: []

                },
            ],
            where: {
                id_interested: id
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
    Interested.hasMany(DetailUser, { as: 'detail_user', foreignKey: 'id_interested' });
    DetailUser.belongsTo(Interested, { foreignKey: "id_interested" });
    try {
        const result = await Interested.findAll({
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
            var data_interested = {
                sport: body.sport,
                food: body.food,
                music:body.music,
                movie: body.movie,
                books: body.books,
                travel:body.travel,
                other: body.other
            }
            const work = await Interested.create(data_interested);
            var data_detail_user = {
                id_interested: work.id_interested,
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
            sport: body.sport,
            food: body.food,
            music:body.music,
            movie: body.movie,
            books: body.books,
            travel:body.travel,
            other: body.other
        }
        await Interested.update(data, {
            where: { id_interested: req.body.id_interested }
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
        await Interested.destroy({
            where: { id_interested: id }
        });
        var data_detail_user = {
            id_interested: null,
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