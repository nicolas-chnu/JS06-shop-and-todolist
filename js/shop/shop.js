import {ProductsService} from "./ProductService.js";
import {ProductCreateModal} from "./modals/ProductCreateModal.js";

const productList = document.querySelector('.js-product-cards')
const totalPriceLabel = document.querySelector('.js-total-price');
const modalElem = document.getElementById('js-product-modal');

const addBtn = document.querySelector('.js-create-product-btn')

const productService = new ProductsService()
const modalCreate = new ProductCreateModal(modalElem, onCreateModalSubmit)

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

        productList.innerHTML += `<li class="product-card">
            <img class="product-card__image" draggable="false" src="${image}" alt="${product.name}">
            <span class="product-card__price">$${product.price}</span>
            <span class="product-card__name">${product.name}</span>
        </li>`
    }

    totalPriceLabel.innerText = `Total: $${productsInfo.totalPrice}`
}

addBtn.addEventListener('click', () => {
    modalCreate.show()
})

document.addEventListener('DOMContentLoaded', () => {
    renderProductCards()
})
