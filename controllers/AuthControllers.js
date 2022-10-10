
const Op = require('Sequelize').Op;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require("../config/auth");
const DetailUser = require("../models/DetailUserModels");
const Image = require('../models/ImageModels');
const User = require("../models/UserModels");
const n_datetime = require('node-datetime');
const nodemailer = require('nodemailer');

//key secret
const jwtKey = config.secret;

//datetime
const dt = n_datetime.create();
const datetime_now = dt.format('Y-m-d H:M:S');

//expired JWT
const jwtExpirySeconds = 86400;

exports.login = async (req, res) => {
    let body = req.body;
    var pwd = crypto.createHash('md5').update(body.password).digest('hex');
    var verify = false;
    var message = "success";
    try {
        if (body.user != null && body.user != '') {
            if (body.password != null && body.password != '') {
                verify = true;
            } else {
                message = 'Password anda kosong!';
                verify = false;
            }
        } else {
            message = 'Username / No Telp / E-mail anda kosong!';
            verify = false;
        }
        User.belongsTo(DetailUser, { as: "detail_user", foreignKey: 'id_detail_user' });
        DetailUser.hasMany(User, { foreignKey: "id_detail_user" });

        User.hasMany(Image, { as: "image", foreignKey: 'id_detail_user' });
        Image.belongsTo(User, { foreignKey: 'id_detail_user' });

        if (verify == true) {
            const result = await User.findAll({
                attributes: {
                    exclude: ['password', 'password_old']
                },
                include: [
                    {
                        model: DetailUser,
                        as: "detail_user",
                        required: true,
                    },
                    {
                        model: Image,
                        as: "image",
                    }
                ],
                where: {
                    [Op.or]: {
                        username: body.user,
                        email: body.user,
                        phone: body.user,
                    },
                    password: pwd
                },
            });
            const token = jwt.sign({
                id_detail_user: result[0].id_detail_user
            }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            result[0].token = token;
            res.send({
                status: 200,
                message: message,
                data: result[0]
            });
        } else {
            res.send({
                status: 401,
                message: message,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.register = async (req, res) => {
    let body = req.body;
    var pwd = crypto.createHash('md5').update(body.password).digest('hex');
    try {
        const token = jwt.sign({ username: body.username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        var message = 'success';
        var verify = false;
        if (body.username != null && body.username != '') {
            if (body.phone != null && body.phone != '') {
                if (body.email != null && body.email != '') {
                    if (body.password != null && body.password != '') {
                        if (body.first_name != null && body.first_name != '') {
                            if (body.last_name != null && body.last_name != '') {
                                if (body.birthday != null && body.birthday != '') {
                                    if (body.gender != null && body.gender != '') {
                                        if (body.city != null && body.city != '') {
                                            if (body.image != null && body.image != '') {
                                                verify = true;
                                            } else {
                                                message = 'Image anda kosong!';
                                                verify = false;
                                            }
                                        } else {
                                            message = 'City anda kosong!';
                                            verify = false;
                                        }
                                    } else {
                                        message = 'Gender anda kosong!';
                                        verify = false;
                                    }
                                } else {
                                    message = 'Birthday anda kosong!';
                                    verify = false;
                                }
                            } else {
                                message = 'Last Name anda kosong!';
                                verify = false;
                            }
                        } else {
                            message = 'First Name anda kosong!';
                            verify = false;
                        }
                    } else {
                        message = 'Password anda kosong!';
                        verify = false;
                    }
                } else {
                    message = 'E-mal anda kosong!';
                    verify = false;
                }
            } else {
                message = 'No Telp anda kosong!';
                verify = false;
            }
        } else {
            message = 'Username anda kosong!';
            verify = false;
        }

        if (verify == true) {
            var data_detail_user = {
                first_name: body.first_name,
                last_name: body.last_name,
                birthday: body.birthday,
                gender: body.gender,
                city: body.city,
                created_date: datetime_now,
                updated_date: datetime_now
            }
            const detail_user = await DetailUser.create(data_detail_user);
            var data_user = {
                username: body.username,
                phone: body.phone,
                email: body.email,
                password: pwd,
                password_old: pwd,
                id_detail_user: detail_user.id_detail_user,
                token
            }
            var data_image = {
                image: body.image,
                number: 1,
                id_detail_user: detail_user.id_detail_user,
            }
            await User.create(data_user);
            await Image.create(data_image);
            data_user.detail_user = data_detail_user;
            data_user.image = data_image;
            res.send({
                status: 200,
                message: message,
                data: data_user
            });
        } else {
            res.send({
                status: 401,
                message: message,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.forgot_password = async (req, res) => {
    let body = req.body;
    try {
        const token = jwt.sign({ username: body.username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        var message = 'success';
        var verify = false;
        if ((body.username != null && body.username != '') || (body.phone != null && body.phone != '') || (body.email != null && body.email != '')) {
            verify = true;
        } else {
            message = 'Username / No Telp / E-mail anda kosong!';
            verify = false;
        }

        if (verify == true) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dynamicheard@gmail.com',
                    pass: 'f1reguart'
                }
            });

            var mailOptions = {
                from: 'dynamicheard@gmail.com',
                to: 'nanxshaw@gmail.com',
                subject: 'Sending Email using Nodejs',
                text: 'That was easy!'
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                console.log('Email sent: ' + info.response);
                res.send({
                    status: 200,
                    message: message,
                });
            });
        } else {
            res.send({
                status: 401,
                message: message,
            });
        }
    } catch (err) {
        console.log(err);
    }
}