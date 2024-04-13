const template = document.createElement('template');

template.innerHTML = `
<style>
* {
    box-sizing: border-box;
    margin: 0;
}

:host {
    display: block;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    background-color: var(--gray);
    border-radius: 10px;
    opacity: .7;
    
    &:hover {
        opacity: 1;;
    }
}

.details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    padding: 10px;
}

img {
    display: block;
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px 10px 0 0;
    height: auto;
    object-fit: cover;
}

.price {
    font-size: 20px;
    font-weight: 600;
    color: var(--white);
}

.name {
    font-size: 16px;
    font-weight: 300;
    color: var(--white);
}

.delete-btn {
    display: block;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    font-size: 17px;
    background-color: var(--gray-light);
    color: var(--white);
    cursor: pointer;
    transition: all .3s;
    
    &:hover {
        background-color: var(--white);
        color: var(--gray);
    }
}

[data-product-action] {
    cursor: pointer;
}

[data-product-action="edit"]:hover {
    text-decoration: underline;
}
</style>

<article class="wrapper">
    <img class="image" src="" alt="">
    <div class="details">
        <p class="price" data-product-action="edit"></p>
        <h3 class="name" data-product-action="edit"></h3>
        <button class="delete-btn" data-product-action="delete">Delete</button>
    </div>
</article>`;

export class ProductCardComponent extends HTMLElement {
    static selector = 'app-product-card';

    product;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        this.shadowRoot
            .querySelector('.image')
            .setAttribute('src', this.product.imageUrl);

        this.shadowRoot.querySelector('.price').innerText = '$' + this.product.price;

        this.shadowRoot.querySelector('.name').innerText = this.product.name
    }

    connectedCallback() {
        if (this.rendered) return;
        this.rendered = true;

        this.render()
    }
}