const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        recipeName: { type: "string" },
        category: { type: "string" },
        img_url: { type: "string" },
        ingredients: [{ type: "string" }],
        instructions: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function UpdateAbl(req, res) {
    try {
        let recipe = req.body;

        const valid = ajv.validate(schema, recipe);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const updatedRecipe = recipeDao.update(recipe);
        if (!updatedRecipe) {
            res.status(404).json({
                code: "recipeNotFound",
                message: `Recipe ${recipe.id} not found`,
            });
            return;
        }

        res.json(updatedRecipe);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;