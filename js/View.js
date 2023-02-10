class View {
    #todoContainer = null;
    #form = null;
    #key = null;

    constructor({key}) {
        this.#key = key;
    }


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
        if(this.#todoContainer) throw new Error('You cannot redeclare todo container');
        this.#todoContainer = htmlElement;
    }


    setForm(htmlElement) {
        if(this.#todoContainer) throw new Error('You cannot redeclare form');
        this.#form = htmlElement;
    }

    showDBError(errorMessage) {
        alert(errorMessage);
    }

    deleteTodoItem(htmlElement) {
        htmlElement.addEventListener('click', e => {
            e.stopPropagation();

            const currentItem = e.target.closest('[data-id]');
            const currentItemId = Number(currentItem.getAttribute('data-id'));

            const filteredData = JSON
                .parse(localStorage.getItem(this.#key))
                .filter(item => item.id !== currentItemId);
            localStorage.setItem(this.#key, JSON.stringify(filteredData));
            currentItem.remove();
            if (filteredData.length === 0) localStorage.clear();
        });
    }
}