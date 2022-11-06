
const Op = require('Sequelize').Op;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require("../config/auth");
const User = require("../models/UserModels");
const n_datetime = require('node-datetime');

//key secret
const jwtKey = config.secret;

//datetime
const dt = n_datetime.create();
const datetime_now = dt.format('Y-m-d H:M:S');

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
            message = 'Username / E-mail anda kosong!';
            verify = false;
        }

        if (verify == true) {
            const result = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    [Op.or]: {
                        username: body.user,
                        email: body.user,
                    },
                    password: pwd
                },
            });
            if(result.length > 0){
                const token = jwt.sign({
                    id_users: result[0].id_users
                }, jwtKey, {
                    algorithm: "HS256",
                })
                result[0].token = token;
                res.send({
                    status: 200,
                    message: message,
                    data: result[0]
                });
            }else {
                res.send({
                    status: 401,
                    message: '(Username / E-mail) or password is wrong',
                });
            }
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
    var file = req.file;
    var pwd = crypto.createHash('md5').update(body.password).digest('hex');
    try {
        var message = 'success';
        var verify = false;
        if (body.username != null && body.username != '') {
            if (body.email != null && body.email != '') {
                if (body.password != null && body.password != '') {
                    if (file.filename != null && file.filename != '') {
                        verify = true;
                    } else {
                        message = 'Image anda kosong!';
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
            message = 'Username anda kosong!';
            verify = false;
        }

        if (verify == true) {
            var data = {
                username: body.username,
                email: body.email,
                password: pwd,
                image: file.filename,
                status_login: 'userpass',
                created_at: datetime_now,
                updated_at: datetime_now
            }
            await User.create(data);
            res.send({
                status: 200,
                message: message,
                data: data
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

exports.logsocial = async (req, res) => {
    let body = req.body;
    try {
        var user = body.email.split('@')[0] + Math.floor(Math.random() * 999);
        const cek_user = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                [Op.or]: {
                    username: user,
                    email: body.email,
                },
                status_login: !'userpass'
            },
        });
        var json = [];
        if (cek_user.length > 0) {
            const token = jwt.sign({ id_users: cek_user[0].id_user }, jwtKey, { algorithm: "HS256" });
            cek_user[0].token = token
            json = cek_user[0];
        } else {
            var data = {
                username: user,
                email: body.email,
                status_login: body.status_login,
                created_at: datetime_now,
                updated_at: datetime_now
            }
            const regis = await User.create(data);
            const token = jwt.sign({ id_users: regis.id_user }, jwtKey, { algorithm: "HS256" });
            var data_token = {
                token: token
            }
            await User.update(data_token, { where: { id_users: regis.id_users } });
            json = data;
            json.token = token;
        }
        res.send({
            status: 200,
            message: 'success',
            data: json
        });
    } catch (err) {
        console.log(err);
    }
}
