import {ModalBase} from "./ModalBase.js";
import {ProductCreateDto} from "../dto/ProductCreateDto.js";

export class ProductCreateModal extends ModalBase {
    onSubmit;

    constructor(modalElem, onSubmit) {
        super(modalElem);
        this.onSubmit = onSubmit;
    }

    show() {
        super.show(`<h2>Add Product</h2>
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
                    <img class="js-preview-image" src="#" alt="Preview Image">
                </div>
                <button type="submit">Submit</button>
            </form>`);

        const loadImageBtn = this.modalElem.querySelector('.file-upload-label')
        const imagePreview = this.modalElem.querySelector('.js-preview-image')

        loadImageBtn.addEventListener('change', () => {
            const file = loadImageBtn.firstElementChild.files[0];

            imagePreview.src = URL.createObjectURL(file)
            imagePreview.style.display = 'block'
        })
    }

    handleSubmit(formElem) {
        const name = formElem.querySelector('#create-name').value
        const price = parseInt(formElem.querySelector('#create-price').value)
        const image = formElem.querySelector('#create-image').files[0]

        // revoke preview mage link
        if (image) {
            const imagePreview = this.modalElem.querySelector('.js-preview-image')
            URL.revokeObjectURL(imagePreview.src)
        }

        const dto = new ProductCreateDto(name, price, image)
        this.onSubmit(dto)
        formElem.reset()
        this.hide()
    }
}