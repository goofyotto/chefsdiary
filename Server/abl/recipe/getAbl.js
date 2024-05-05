const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });


const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function GetAbl(req, res) {
    try {

        const reqParams = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const recipe = recipeDao.get(reqParams.id);
        if (!recipe) {
            console.log("recipeNotFound");
            res.status(404).json({
                code: "recipeNotFound",
                message: `Recipe ${reqParams.id} not found`,
            });
            return;
        }

        res.json(recipe);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = GetAbl;