export class Home {
    title: string;
    description: string;
    streetAddress: string;
    city: string;
    country: string;
    postCode: string;
    image: string;
    userId: number;

    constructor(home: Home) {
        this.title = home.title;
        this.description = home.description;
        this.streetAddress = home.streetAddress;
        this.city = home.city;
        this.country = home.country;
        this.postCode = home.postCode;
        this.image = home.image;
        this.userId = home.userId;
    }

    getAddressLocation() {
        return this.postCode !== undefined && this.postCode !== null && this.postCode !== "" ? this.postCode : this.streetAddress;
    }
}