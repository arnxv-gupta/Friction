import { Category } from "../../interfaces/category.interface";
import serverModel from "../../models/serverModel";

export default async function createCategory(serverID:Number, name:String) {
    try {
        let categoryObj:Category = {
            name: name
        }
    
        let nCategoryObj = await serverModel.updateOne({serverID: serverID}, {$push: {categories: categoryObj}});
    
        if(nCategoryObj.modifiedCount!=1) {
            return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
        } else {
            return {type: "SUCCESS", data: categoryObj.categoryID};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}