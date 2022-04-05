export class Product {
    _id?: string;
    name: string;
    category: string;
    location: string;
    price: number;
    quantity: number;

    constructor(name:string, category:string, location:string, price:number, quantity:number) {
        this.name = name;
        this.category = category;
        this.location = location;
        this.price = price;
        this.quantity = quantity;
    }
}
