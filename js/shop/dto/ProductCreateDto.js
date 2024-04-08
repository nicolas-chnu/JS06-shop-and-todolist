export class ProductCreateDto {
    name;
    price;
    imageFile;

    constructor(name, price, imageFile) {
        this.name = name;
        this.price = price;
        this.imageFile = imageFile;
    }
}