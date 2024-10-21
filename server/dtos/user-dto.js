module.exports = class UserDto{
    id;
    email;
    name;
    role;
    isActivated;

    constructor(model){
        this.id = model.id
        this.email = model.email
        this.name = model.name
        this.role = model.role
        this.isActivated = model.isActivated
    }
}