import {Product} from "./Product.js";
import {ProductsInfoDto} from "./ProductsInfoDto.js";

export class ProductsService {
    #productListId = 'shop_products';
    #localProducts = [];
    #isUpToDate = false;

    get(id) {
        this.#fetchProducts()
        let product = this.#localProducts.find(p => p.getId() === id)

        if (!product) {
            throw new Error('Not found')
        }
        return product
    }

    getProductsInfo(productNameFilter) {
        this.#fetchProducts()

        let products = productNameFilter
            ? this.#localProducts
                .filter(p => p.name.toLowerCase().includes(productNameFilter.toLowerCase()))
            : this.#localProducts

        let totalPrice = products.map(p => p.price).reduce((a, b) => a + b, 0)

        return new ProductsInfoDto(products, totalPrice)
    }

    add(dto) {
        return new Promise((resolve, reject) => {
            if (!dto.name || dto.name.match(/^ *$/)) {
                reject(new Error('Please enter the name'))
            }

            if (isNaN(dto.price) || dto.price < 0) {
                reject(new Error('Please enter the valid price'))
            }

            if (!dto.imageFile) {
                reject(new Error('Please upload the image'))
            }

            this.#fetchProducts()
            if (this.#localProducts.find(p => p.name === dto.name)) {
                reject(new Error('The name is already in use'))
            }

            const reader = new FileReader()

            reader.addEventListener('load', () => {
                const imageId = crypto.randomUUID()
                localStorage.setItem(imageId, reader.result.toString())

                let product = new Product(dto.name, dto.price, imageId)
                this.#localProducts.push(product)

                this.#saveChanges()
                resolve()
            })

            reader.readAsDataURL(dto.imageFile);
        })
    }

    update(dto) {
        if (!dto.name || dto.name.match(/^ *$/)) {
            throw new Error('Invalid product name')
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new Error('Invalid product price')
        }

        let product = this.get(dto.id)

        if (dto.imageFile) {
            localStorage.removeItem(product.imageId)

            let imageUrl = URL.createObjectURL(dto.imageFile)
            let imageId = crypto.randomUUID()

            product.imageId = imageId
            localStorage.setItem(imageId, imageUrl)
        }

        product.name = dto.name
        product.price = dto.price

        this.#saveChanges()
    }

    delete(id) {
        // unload product image
        let product = this.get(id)
        localStorage.removeItem(product.imageId)

        let index = this.#localProducts.findIndex(p => p.getId() === id);
        this.#localProducts.splice(index, 1)

        this.#saveChanges()
    }

    #fetchProducts() {
        if (this.#isUpToDate) {
            return
        }

        let productsStr = localStorage.getItem(this.#productListId)
        this.#localProducts = productsStr ? JSON.parse(productsStr) : []

        this.#isUpToDate = true
    }

    #saveChanges() {
        localStorage.setItem(this.#productListId, JSON.stringify(this.#localProducts))
    }
}