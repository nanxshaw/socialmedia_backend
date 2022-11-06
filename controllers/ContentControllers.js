
const Content = require('../models/ContentModels');
const Image = require('../models/ImageModels');
const jwt = require('jsonwebtoken');
const config = require("../config/auth");
const n_datetime = require('node-datetime');
const Comment = require('../models/CommentModels');

//key secret
const jwtKey = config.secret;

//datetime
const dt = n_datetime.create();
const datetime_now = dt.format('Y-m-d H:M:S');

exports.all = async (req, res) => {
    try {
        Content.hasMany(Image, { foreignKey: 'id_content' });
        Image.belongsTo(Content, { foreignKey: 'id_content' });

        Content.hasMany(Comment, { foreignKey: 'id_content' });
        Comment.belongsTo(Content, { foreignKey: 'id_content' });

        const result = await Content.findAll({
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                }
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
    try {
        const id = req.params.id;
        Content.hasMany(Image, { foreignKey: 'id_content' });
        Image.belongsTo(Content, { foreignKey: 'id_content' });

        Content.hasMany(Comment, { foreignKey: 'id_content' });
        Comment.belongsTo(Content, { foreignKey: 'id_content' });


        const result = await Content.findAll({
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                },
            ],
            where: {
                id_content: id
            },
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


exports.insert = async (req, res) => {
    try {
        let body = req.body;
        var file = req.files;
        var token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtKey);
        var userId = decoded.id_users

        var data_content = {
            desc: body.desc,
            id_users: userId,
            created_at: datetime_now,
            updated_at: datetime_now
        }
        const content = await Content.create(data_content);
        for (let i = 0; i < file.length; i++) {
            var data_image = {
                image: file[i].filename,
                id_content: content.id_content
            }
            await Image.create(data_image);
        }
        res.send({
            status: 200,
            message: 'Success insert data!',
        });
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        let body = req.body;
        var file = req.files;
        var data_content = {
            desc: body.desc,
            id_users: userId,
            created_at: datetime_now,
            updated_at: datetime_now
        }
        await Content.update(data_content, {
            where: { id_content: req.body.id }
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
        await Content.destroy({ where: { id_content: id } });
        await Image.destroy({ where: { id_content: id } });
        await Comment.destroy({ where: { id_content: id } });
        res.send({
            status: 200,
            message: 'Success delete data!',
        });
    } catch (err) {
        console.log(err);
    }
}