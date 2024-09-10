import $api from "../http";

export default class MailService {
    static async sendMassage(email:string, theam:string, message:string) {
        return $api.post("/mail-send", { email, theam, message })
            .then(res=>res.data)
    }
}