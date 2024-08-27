import $api from "../http";

interface Iinput {
    title: string,
    text: string,
}

export default class IdeasService{
    static async getIdeas(){
        return $api.get("/ideas")
    }
    static async getIdea(id:number){
        return $api.get(`/idea/${id}`)
    }
    static async updateIdea(id:string, formData:Iinput){
        return $api.put(`/idea/update/${id}`, formData)
        .then((res:any)=>res.data)
    }
    static async createIdea(formData:Iinput){
        return $api.post(`/createIdea/`, formData)
        .then((res:any)=>res.data)
    }
    static async delIdea(id:number){
        return $api.delete(`/idea/${id}`)
    }
  
}