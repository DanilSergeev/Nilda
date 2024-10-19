import $api from "../http";

export default class AuthService{
    static async login(formData:FormData){
        return $api.post("/login", formData)
        .then(res=>res.data)
    }
    static async register(formData:FormData){
        return $api.post("/register", formData)
        .then(res=>res.data)
    }
    static async logout(){
        return $api.post("/logout")
        .then(res=>res.data)
    }
}