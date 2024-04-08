export class ProductUpdateDto {
    id;
    name;
    price;
    imageFile;

    constructor(id, name, price, imageFile = null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageFile = imageFile;
    }
}