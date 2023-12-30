class UserDto {
    id;
    login;
    firstName;
    lastName;
    phone;
    email;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.login = model.login;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.phone = model.phone;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}

export default UserDto