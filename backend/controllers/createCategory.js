const serverModel = require("../models/serverModel");

async function createCategory(req) {
    
    let categoryObj = {
        name: req.body.name
    }

    let nCategoryObj = await serverModel.updateOne({serverID: req.body.serverID}, {$push: {categories: categoryObj}});

    if(nCategoryObj.modifiedCount!=1) {
        return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
    } else {
        return {type: "SUCCESS", data: categoryObj.categoryID};
    }
}

module.exports = createCategory;