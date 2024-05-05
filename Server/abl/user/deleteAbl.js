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

        const userId = reqParams.id;

        console.log("Deleting user with ID:", userId);

        userDao.remove(userId);

        {
            const reqParams = req.query?.id ? req.query : req.body;
            const recipes = recipeDao.list()

            console.log("body ", req.body);
            console.log("Recipes to be checked:", recipes);

            recipes.forEach(element => {
                console.log(element.userId + "==" + req.body.id)
                if (element.userId == req.body.id) {
                    recipeDao.remove(element.recipeId)
                    console.log("RecipeId to be deleted is", element.recipeId);
                }
            })

        };


        res.json({});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = DeleteAbl;