const basedir = require('../config/basedir');
const { deleteFile } = require('../middleware/Upload');
const Image = require('../models/ImageModels');


exports.all = async (req, res) => {
    try {
        const result = await Image.findAll();
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
        const result = await Image.findAll({
            where: {
                id_image: id
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
    try {
        const result = await Image.findAll({
            where: {
                id_detail_user: req.userId
            },
        });
        if (result.length <= 9) {
            var file = req.files;
            var total = 0;
            for (let i = 0; i < file.length; i++) {
                total = i + 1;
                var data_image = {
                    image: file[i].filename,
                    number: result.length + total,
                    id_detail_user: req.userId,
                }
                await Image.create(data_image);
            }
            if (total == file.length) {
                res.send({
                    status: 200,
                    message: 'File has been upload!',
                });
            }
        } else {
            res.send({
                status: 401,
                message: "Can't be more than 9",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        var file = req.files;
        var data_image = {
            image: file[0].filename,
            id_detail_user: req.userId,
        }
        await Image.update(data_image, {
            where: { id_image: req.body.id_image }
        });
        res.send({
            status: 200,
            message: 'File has been updated!',
        });
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Image.findAll({
            where: {
                id_image: id
            },
        });
        await Image.destroy({
            where: { id_image: id }
        });
        deleteFile(basedir.image_profile + result[0].image)
        res.send({
            status: 200,
            message: 'File has been deleted!',
        });
    } catch (err) {
        console.log(err);
    }
}