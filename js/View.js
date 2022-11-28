class View {
    #todoContainer = null;
    #form = null;


    renderItem({title, description, id}) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-id', id);

        wrapper.innerHTML  = `
                <div class="taskWrapper">
                    <div class="taskHeading">${title}</div>
                    <div class="taskDescription">${description}</div>
                </div>`;

        this.#todoContainer.prepend(wrapper);
    }


    setTodosContainer(htmlElement) {
        if(this.#todoContainer) throw new Error('You cannot redeclare todo container'); // щоб не засетити повторно html елемент
        this.#todoContainer = htmlElement;
    }


    setForm(htmlElement) {
        if(this.#todoContainer) throw new Error('You cannot redeclare form'); // щоб не засетити повторно html елемент
        this.#form = htmlElement;
    }

    showDBError(errorMessage) {
        alert(errorMessage);
    }

}