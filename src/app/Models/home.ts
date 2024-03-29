export class Home {
    id: number;
    title: string;
    description: string;
    streetAddress: string;
    city: string;
    county: string;
    country: string;
    postCode: string;
    image: string;
    userId: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    published: boolean;

    constructor(home: Home) {
        this.id = home.id;
        this.title = home.title;
        this.description = home.description;
        this.streetAddress = home.streetAddress;
        this.city = home.city;
        this.county = home.county;
        this.country = home.country;
        this.postCode = home.postCode;
        this.image = home.image;
        this.userId = home.userId;
        this.bathrooms = home.bathrooms;
        this.bedrooms = home.bedrooms;
        this.beds = home.beds;
        this.published = home.published;
    }

    getAddressLocation() {
        return this.postCode !== undefined && this.postCode !== null && this.postCode !== "" ? this.postCode : this.streetAddress;
    }
}