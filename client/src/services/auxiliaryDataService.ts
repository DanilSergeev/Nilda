import $api from "../http";

interface Iinput {
    title: string,
    text: string,
}

export default class AuxiliaryDataServic{
    static async getCategorys(){
        return $api.get("/categorys")
    }
    static async getCountrys(){
        return $api.get("/countrys")
    }

    static async getCategory(id:number){
        return $api.get(`/category/${id}`)
    }
    static async getCountry(id:number){
        return $api.get(`/country/${id}`)
    }
    static async getImageOfItem(id:number){
        return $api.get(`/imageOfItem/${id}`)
    }

    static async createCategory(formData:Iinput){
        return $api.post(`/crateCategory/`, formData)
        .then((res:any)=>res.data)
    }
    static async createCountry(formData:Iinput){
        return $api.post(`/crateCountry/`, formData)
        .then((res:any)=>res.data)
    }

    static async deleteCategory(id:number){
        return $api.delete(`/deleteCategory/${id}`)
    }
    static async deleteCountry(id:number){
        return $api.delete(`/deleteCountry/${id}`)
    }

    
}