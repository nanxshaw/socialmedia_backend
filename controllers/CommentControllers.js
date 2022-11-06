
const jwt = require('jsonwebtoken');
const config = require("../config/auth");
const n_datetime = require('node-datetime');
const Comment = require('../models/CommentModels');

//key secret
const jwtKey = config.secret;

//datetime
const dt = n_datetime.create();
const datetime_now = dt.format('Y-m-d H:M:S');



exports.insert = async (req, res) => {
    try {
        let body = req.body;
        var token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtKey);
        var userId = decoded.id_users

        var data = {
            comment: body.comment,
            id_users: userId,
            id_content:body.id_content,
            created_at: datetime_now,
        }
        await Comment.create(data);
        res.send({
            status: 200,
            message: 'Success insert data!',
        });
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.destroy({ where: { id_comment: id } });
        res.send({
            status: 200,
            message: 'Success delete data!',
        });
    } catch (err) {
        console.log(err);
    }
}
