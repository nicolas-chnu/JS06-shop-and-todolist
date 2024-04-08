export class ModalBase {
    modalElem;
    modalContent;

    constructor(modalElem) {
        this.modalElem = modalElem;
        this.modalContent = modalElem.firstElementChild

        this.modalElem.addEventListener('click', (event) => {
            if (event.target.id === this.modalElem.id) {
                this.hide()
            } else if (event.target.tagName === 'BUTTON' &&
                       event.target.getAttribute('type') === 'submit') {
                event.preventDefault();
                this.handleSubmit(event.target.closest('form'))
            }
        })
    }

    show(innerHTML) {
        this.modalContent.innerHTML = innerHTML
        this.modalElem.style.display = 'block'
    }

    hide() {
        this.modalContent.innerHTML = ''
        this.modalElem.style.display = 'none'
    }

    handleSubmit(formElem) {
    }
}