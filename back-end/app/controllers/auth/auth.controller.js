const db = require("../../models");
const config = require("../../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
/**
* @description Signup
* @param req
* @param res
*/
exports.signup = (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
/**
* @description Signin
* @param req
* @param res
*/
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });
            let refreshToken = await RefreshToken.createToken(user);
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    accessToken: token,
                    refreshToken: refreshToken,
                    message: 'successfully logged in'
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
/**
* @description Logout
* @param req
* @param res
*/
exports.logout = (req, res) => {
    try {
        RefreshToken.destroy({ where: { userId: req.userId } });

        res.status(200).json({
            message: "Successfully logged out!",
        });
        return;
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
/**
* @description Refresh access-token
* @param req
* @param res
*/
exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }
    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
        console.log(refreshToken)
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }
        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};