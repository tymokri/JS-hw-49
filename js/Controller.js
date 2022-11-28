// передаємо в constructor(model, view) аргументи, щоб Controller знав про model і view
class Controller {
    #model = null;
    #view = null;

    form = null; // це нода, DOM-елемент
    formSelector = null;
    todoContainerSelector = null;
    todoContainer = null;

    constructor(model, view, {formSelector, todoContainerSelector}) {
        this.#setModel(model);
        this.#setView(view);

        this.formSelector = formSelector;
        this.todoContainerSelector = todoContainerSelector;

        this.getForm();
        this.getTodoContainer();

        this.form.addEventListener('submit', this.#handleForm);
    }

// обробка форми - збір даних. #handleForm - обробник даних
    #handleForm = e => {
        e.preventDefault();
        e.stopPropagation();

        const data = {};

        this.form.querySelectorAll('input, textarea')
            .forEach(item => {
                data[item.name] = item.value;
            });

        try {
            const savedTodoItem = this.#model.saveData(data);
            this.#view.renderItem(savedTodoItem);
        } catch (error) {
            this.#view.showDBError(error.message);
        }



    }


    getTodoContainer() {
        this.todoContainer = document.querySelector(this.todoContainerSelector);
        this.#view.setTodosContainer(this.todoContainer);
    }

// отримали дані з форми
    getForm() {
        const form = document.querySelector(this.formSelector);

        // console.log(form, typeof form); // object - нода DOM
        if (!(form instanceof HTMLFormElement)) throw new Error('Form should be an HTML form element');
        this.form = form;
        this.#view.setForm(form);
    }


// валідація екземпляру model
    #setModel(modelInstance) {
        if(!modelInstance) throw new Error('Model is required')
        this.#model = modelInstance;
    }
// валідація екземпляру view
    #setView (viewInstance) {
        if(!viewInstance) throw new Error('View is required')
        this.#view = viewInstance;
    }

}