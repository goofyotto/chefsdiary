const eventDao = require("../../dao/recipe-dao.js");

async function ListAbl(req, res) {
    try {
        const recipeList = recipeDao.list();

        const recipeMap = recipeDao.recipeMap();

        recipeList.forEach((event) => {
            recipe.userMap = recipeMap[recipe.id] || {};
        });

        res.json(recipeList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;