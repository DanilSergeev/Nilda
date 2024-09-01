import $api from "../http";

export default class IdeasService{
    static async getIdeas(){
        return $api.get("/ideas")
    }
    static async getIdea(id:number){
        return $api.get(`/idea/${id}`)
    }
    static async updateIdea(id:string, title:string, text:string){
        return $api.put(`/idea/update/${id}`, {title, text})
        .then((res:any)=>res.data)
    }
    static async createIdea(title:string, text:string){
        return $api.post(`/createIdea/`, {title, text})
        .then((res:any)=>res.data)
    }
    static async delIdea(id:number){
        return $api.delete(`/idea/${id}`)
    }
  
}