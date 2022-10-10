
const Op = require('Sequelize').Op;
const DetailUser = require("../models/DetailUserModels");
const Education = require('../models/EducationModels');
const Image = require('../models/ImageModels');
const Interested = require('../models/InterestedModels');
const Lifestyle = require('../models/LifestyleModels');
const UserInformation = require('../models/UserInformationModels');
const Verification = require('../models/VerificationModels');
const Work = require('../models/WorkModels');


exports.all_user = async (req, res) => {
    try {

        DetailUser.hasMany(Image, { as: "image", foreignKey: 'id_detail_user' });
        Image.belongsTo(DetailUser, { foreignKey: 'id_detail_user' });

        Education.hasMany(DetailUser, { foreignKey: 'id_education' });
        DetailUser.belongsTo(Education, { as: "education", foreignKey: 'id_education' });

        Work.hasMany(DetailUser, { foreignKey: 'id_work' });
        DetailUser.belongsTo(Work, { as: "work", foreignKey: 'id_work' });

        UserInformation.hasMany(DetailUser, { foreignKey: 'id_user_information' });
        DetailUser.belongsTo(UserInformation, { as: "user_information", foreignKey: 'id_user_information' });

        Lifestyle.hasMany(DetailUser, { foreignKey: 'id_lifestyle' });
        DetailUser.belongsTo(Lifestyle, { as: "lifestyle", foreignKey: 'id_lifestyle' });

        Interested.hasMany(DetailUser, { foreignKey: 'id_interested' });
        DetailUser.belongsTo(Interested, { as: "interested", foreignKey: 'id_interested' });

        Verification.hasMany(DetailUser, { foreignKey: 'id_verification' });
        DetailUser.belongsTo(Verification, { as: "verification", foreignKey: 'id_verification' });

        const result = await DetailUser.findAll({
            include: [
                {
                    model: Image,
                    as: "image",
                },
                {
                    model: Education,
                    as: "education",
                },
                {
                    model: Work,
                    as: "work",
                },
                {
                    model: UserInformation,
                    as: "user_information",
                },
                {
                    model: Lifestyle,
                    as: "lifestyle",
                },
                {
                    model: Interested,
                    as: "interested",
                },
                {
                    model: Verification,
                    as: "verification",
                }
            ],
            where: {
                id_detail_user: { 
                    [Op.not]: req.userId 
                }
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