import {Product} from "../models/Product.js";
import {ProductsInfoDto} from "../dto/ProductsInfoDto.js";
import {ProductDto} from "../dto/ProductDto.js";

export class ProductService {
    #productListId = 'shop_products';
    #localProducts = [];
    #isUpToDate = false;

    get(id) {
        this.#fetchProducts()

        const product = this.#localProducts.find(p => p.getId() === id)
        if (!product) {
            throw new Error('Not found')
        }

        return product
    }

    getProductsInfo(productNameFilter) {
        this.#fetchProducts()

        let products = this.#localProducts
            .map(p => new ProductDto(p.getId(), p.name, p.price, p.imageUrl))

        if (productNameFilter) {
            products = products
                .filter(p => p.name.toLowerCase().includes(productNameFilter.toLowerCase()))
        }

        const totalPrice = products.map(p => p.price).reduce((a, b) => a + b, 0)

        return new ProductsInfoDto(products, totalPrice)
    }

    add(dto) {
        if (!dto.name || dto.name.match(/^ *$/)) {
            throw new Error('Please enter the name')
        }

        if (isNaN(dto.price) || dto.price < 0) {
            throw new Error('Please enter the valid price')
        }

        if (!dto.imageUrl) {
            throw new Error('Please add the image URL')
        }

        this.#fetchProducts()

        if (this.#localProducts.find(p => p.name === dto.name)) {
            throw new Error('The name is already in use')
        }

        let product = Product.create(dto.name, dto.price, dto.imageUrl)
        this.#localProducts.push(product)

        this.#saveChanges();
    }

    update(dto) {
        if (!dto.name || dto.name.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new Error('Invalid product price')
        }

        if (!dto.imageUrl) {
            throw new Error('Please add the image URL')
        }

        let product = this.get(dto.id)

        product.name = dto.name
        product.price = dto.price
        product.imageUrl = dto.imageUrl

        this.#saveChanges()
    }

    delete(id) {
        const index = this.#localProducts.findIndex(p => p.getId() === id);
        this.#localProducts.splice(index, 1)

        this.#saveChanges()
    }

    #fetchProducts() {
        if (this.#isUpToDate) {
            return
        }

        let productsStr = localStorage.getItem(this.#productListId)
        this.#localProducts = productsStr
            ? JSON.parse(productsStr)
                .map(p => Product.fromObject(p))
            : []

        this.#isUpToDate = true
    }

    #saveChanges() {
        localStorage.setItem(this.#productListId, JSON.stringify(this.#localProducts))
    }
}