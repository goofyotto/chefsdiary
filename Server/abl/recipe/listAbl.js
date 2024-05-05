const recipeDao = require("../../dao/recipe-dao.js");

async function ListAbl(req, res) {
    try {
        console.log("List");
        const recipeList = recipeDao.list();
        
        res.json(recipeList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;