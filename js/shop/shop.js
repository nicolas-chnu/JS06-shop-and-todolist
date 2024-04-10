import {ProductsService} from "./ProductService.js";
import {ProductCreateModal} from "./modals/ProductCreateModal.js";

const productList = document.querySelector('.js-product-cards')
const totalPriceLabel = document.querySelector('.js-total-price');
const modalElem = document.getElementById('js-product-modal');

const productService = new ProductsService()

class ProductActions {
    #productList;
    #modalCreate;

    constructor() {
        this.#productList = document.querySelector('.js-product-cards')
        this.#modalCreate = new ProductCreateModal(modalElem, onCreateModalSubmit)

        document.addEventListener('click', (event) => {
            const target = event.target
            const action = target.dataset.productAction

            if (action === undefined) {
                return
            } else if (action === 'create') {
                this.create()
            }

            const productCard = target.closest('.js-product-card')
            // this[action](productCard.dataset.productId)
        })
    }
    create() {
        this.#modalCreate.show()
    }

    edit(id) {
        console.log('editing id=', id)
    }

    delete(id) {
        console.log('deleting id=', id)
    }
}

function onCreateModalSubmit(dto) {
    return new Promise((resolve, reject) => {
        const promise = productService.add(dto)

        promise.then(
            () => {
                renderProductCards()
                resolve()
            },
            err => {
                alert(err.message)
                reject()
            }
        )
    })
}

function renderProductCards(filter = null) {
    const productsInfo = productService.getProductsInfo(filter)

    productList.innerHTML = ''

    for (let product of productsInfo.getProducts()) {
        const image = localStorage.getItem(product.imageId)

        productList.innerHTML += `<li data-product-id="${product.id}" class="js-product-card">
            <img class="js-product-card__image" draggable="false" src="${image}" alt="${product.name}">
            <div class="flex-row space-between">
                <span data-product-action="edit" class="js-product-card__price">$${product.price}</span>
                <div class="js-product-actions">
                    <button data-product-action="delete" class="delete-icon"></button>
                </div>
            </div>
            <span data-product-action="edit" class="js-product-card__name">${product.name}</span>
        </li>`
    }

    totalPriceLabel.innerText = `Total: $${productsInfo.totalPrice}`
}

document.addEventListener('DOMContentLoaded', () => {
    const productActions = new ProductActions()
    renderProductCards()
})
