class Model {
    #key = null;
    #id = null;

    constructor({key}) {
        this.#key = key;

        const {data, isEmpty} = this.#get();
        this.#id = isEmpty ? 1 : data.pop().id + 1;
    }

    saveData(data) {
        const {
            data: todoItems,
            isEmpty: isEmptyTodoItems
        } = this.#get();

        const dataToSave = [];

        const copiedData = {...data};
        copiedData.id = this.#id;

        isEmptyTodoItems ?
            dataToSave.push(copiedData) :
            dataToSave.push(...todoItems, copiedData);

        this.#save(dataToSave);

        return {...dataToSave.at(-1)};
    }

// запис даних в локалсторидж
    #save(data) {
        const jsonData = JSON.stringify(data);

        try {
            localStorage.setItem(this.#key, jsonData);
            this.#id += 1;
        } catch (error) {
            throw new Error('Space exceeded');
        }
    }

// дістаємо дані з локалсторидж і записуємо їх в об'єкт response
    #get() {
        const data = JSON.parse(localStorage.getItem(this.#key));

        return {
            isEmpty: !data || !data.length,
            data,
        }
    }
}