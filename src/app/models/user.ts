export class User {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    creditcard: string;
    password: string;

    constructor(name: string, address: string, phoneNumber: string, email: string, creditcard: string, password: string) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.creditcard = creditcard;
        this.password = password;
    }
}