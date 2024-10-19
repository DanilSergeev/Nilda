import $api from "../http";

export default class UserService{
    static async getUsers(){
        return $api.get("/users")
    }
    static async getUser(id:number){
        return $api.get(`/user/${id}`)
    }

    static async updateUser(id:string, formData:FormData){
        return $api.put(`/user/${id}`, formData)
        .then((res:any)=>res.data)
    }
  
}