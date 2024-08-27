import $api from "../http";

interface Iinput {
    title: string,
    text: string,
}

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
    static async creatItem(formData:Iinput){
        return $api.post(`/creatItem/`, formData)
        .then((res:any)=>res.data)
    }
    static async updateItem(id:string, formData:Iinput){
        return $api.put(`/item/update/${id}`, formData)
        .then((res:any)=>res.data)
    }
    static async updateItemImages(id:string, formData:Iinput){
        return $api.put(`/item/updateImage/${id}`, formData)
        .then((res:any)=>res.data)
    }
    static async deleteItem(id:number){
        return $api.delete(`/item/${id}`)
    }
  
}