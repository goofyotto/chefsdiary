const Ajv = require("ajv");
const ajv = new Ajv();

const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
    type: "object",
    properties: {
        recipeName: { type: "string" },
        category: { type: "string" },
        img_url: { type: "string" },
        ingredients: [{ type: "string" }],
        instructions: { type: "string" },

    },
    required: ["recipeName", "ingredients", "instructions"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
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

        recipe = recipeDao.create(recipe);
        res.json(recipe);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;