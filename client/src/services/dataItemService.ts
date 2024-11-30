import $api from "../http";

export default class DataItemService{
    static async getItems(){
        return $api.get("/items")
    }
    static async getItemsByHero(){
        return $api.get("/itemsHero")
    }
    static async getItemsByItem(){
        return $api.get("/itemsItem")
    }
    static async getItem(id:number){
        return $api.get(`/item/${id}`)
    }
    static async creatItem(formData:FormData){
        return $api.post(`/item/`, formData)
        .then((res:any)=>res.data)
    }
    static async updateItem(id:number, title:string, description:string, categoryId:number, countryId:number){
        return $api.put(`/item/update/${id}`, {title, description, categoryId, countryId})
        .then((res:any)=>res.data)
    }
    static async updateItemImages(formData:FormData){
        return $api.put(`/item/updateImage/`, formData)
        .then((res:any)=>res.data)
    }
    static async deleteItem(id:number){
        return $api.delete(`/item/${id}`)
    }
    static async deleteImagesOfItem(id:number, idImages: number[]){
        return $api.delete(`/item/deleteImages/${id}`, { data: { idImages } })
    }
  
  
}