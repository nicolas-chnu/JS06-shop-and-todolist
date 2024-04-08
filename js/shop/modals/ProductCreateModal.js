import {ModalBase} from "./ModalBase.js";
import {ProductCreateDto} from "../dto/ProductCreateDto.js";

export class ProductCreateModal extends ModalBase {
    onSubmit;

    constructor(modalElem, onSubmit) {
        super(modalElem);
        this.onSubmit = onSubmit;
    }

    show() {
        const innerHTML =
            `<h2>Add Product</h2>
            <form method="post" id="create-product" autocomplete="off">
                <label for="create-name">Product Name</label>
                <input type="text" id="create-name" name="name">
                <label for="create-price">Product Price</label>
                <input type="number" id="create-price" name="price">
                <div class="select-image-container">
                    <label for="create-image" class="file-upload-label">
                        Choose Image
                        <input type="file" id="create-image" name="image">
                    </label>
                    <img class="preview-image" src="#" alt="Preview Image">
                </div>
                <button type="submit">Submit</button>
            </form>`

        super.show(innerHTML);

        const loadImageBtn = this.modalElem.querySelector('.file-upload-label')

        loadImageBtn.addEventListener('change', () => {
            const file = loadImageBtn.firstElementChild.files[0];
            const reader = new FileReader()

            reader.onload = () => {
                const imagePreview = loadImageBtn.nextElementSibling
                imagePreview.src = reader.result
                imagePreview.style.display = 'block'
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        })
    }

    handleSubmit(formElem) {
        const name = formElem.querySelector('#create-name').value
        const price = parseInt(formElem.querySelector('#create-price').value)
        const image = formElem.querySelector('#create-image').files[0]

        const dto = new ProductCreateDto(name, price, image)
        this.onSubmit(dto)
        formElem.reset()
        this.hide()
    }
}