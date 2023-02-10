class Controller {
    #model = null;
    #view = null;

    form = null;
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


    #handleForm = e => {
        e.preventDefault();
        e.stopPropagation();

        const data = {};

        this.form.querySelectorAll('input, textarea')
            .forEach(item => {
                data[item.name] = item.value;
            });

        this.form.querySelectorAll('input, textarea')
            .forEach(item => {
                item.value = null;
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
        this.#view.deleteTodoItem(this.todoContainer);
    }


    getForm() {
        const form = document.querySelector(this.formSelector);
        if (!(form instanceof HTMLFormElement)) throw new Error('Form should be an HTML form element');
        this.form = form;
        this.#view.setForm(form);
    }


// model validation
    #setModel(modelInstance) {
        if(!modelInstance) throw new Error('Model is required')
        this.#model = modelInstance;
    }

// view validation
    #setView (viewInstance) {
        if(!viewInstance) throw new Error('View is required')
        this.#view = viewInstance;
    }
}