import {AppComponent} from "./app/app.component.js";
import {HeaderComponent} from "./app/layout/header.component.js";
import {ProductComponent} from "./app/product/product.component.js";
import {TodoComponent} from "./app/todo/todo.component.js";
import {ProductCardComponent} from "./app/product/components/product-card.component.js";
import {ProductListComponent} from "./app/product/components/product-list.component.js";
import {ModalComponent} from "./app/shared/modal.component.js";
import ProductCreateForm from "./app/product/components/product-create-form.component.js";

customElements.define(AppComponent.selector, AppComponent);
customElements.define(HeaderComponent.selector, HeaderComponent);
customElements.define(ProductComponent.selector, ProductComponent);
customElements.define(TodoComponent.selector, TodoComponent);
customElements.define(ProductCardComponent.selector, ProductCardComponent);
customElements.define(ProductListComponent.selector, ProductListComponent);
customElements.define(ModalComponent.selector, ModalComponent);
customElements.define(ProductCreateForm.selector, ProductCreateForm);