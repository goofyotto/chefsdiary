const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");
const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function DeleteAbl(req, res) {
    try {
        const reqParams = req.body;

        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const recipeMap = recipeDao.userMap();
        if (recipeMap[reqParams.id]) {
            res.status(400).json({
                code: "userHasRecipes",
                message: `User ${reqParams.id} has recipes`,
            });
            return;
        }
        userDao.remove(reqParams.id);

        res.json({});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = DeleteAbl;