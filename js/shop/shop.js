import {ProductsService} from "./ProductService.js";
import {ProductCreateModal} from "./modals/ProductCreateModal.js";

const productList = document.querySelector('.js-product-cards')
const modalElem = document.getElementById('js-product-modal');

const addBtn = document.querySelector('.js-create-product-btn')

const productService = new ProductsService()
const modalCreate = new ProductCreateModal(modalElem, (dto) => {
    try {
        productService.add(dto)
        renderProductCards()
    } catch (err) {
        alert(err.message)
    }
})

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

    // TODO: update total price label
}

addBtn.addEventListener('click', () => {
    modalCreate.show()
})

document.addEventListener('DOMContentLoaded', () => {
    renderProductCards()
})
