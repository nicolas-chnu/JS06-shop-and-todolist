export class Product {
    #id;
    name;
    price;
    imageId;

    constructor(name, price, imageId) {
        this.#id = crypto.randomUUID();
        this.name = name;
        this.price = price;
        this.imageId = imageId;
    }

    getId() {
        return this.#id;
    }
}