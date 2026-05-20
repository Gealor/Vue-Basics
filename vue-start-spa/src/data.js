import { reactive } from "vue";
// reactive для объектов, ref - для примитивов (строк, чисел и т.д.)

const pagesKey = 'pages';
const personalPageKey = 'personalPage';

let pagesJson = localStorage.getItem(pagesKey) || "[]";
let pagesStore = reactive(JSON.parse(pagesJson));

let personalPageJson = localStorage.getItem(personalPageKey) || "{}";
// делаю personalPageStore реактивным, чтобы при его обновлении все компоненты так же видели изменения и отображали их, 
// без ручного обновления
let personalPageStore = reactive(JSON.parse(personalPageJson));

export default {
    getAllPages() {
        return pagesStore;
    },
    getSinglePage(index) {
        return pagesStore[index];
    },
    createNewPage(newPage) {
        pagesStore.push(newPage);
        this.localStorageSaveObj(pagesKey, pagesStore);
    },
    updatePage(index, updatedPage) {
        Object.assign(pagesStore[index], updatedPage);
        this.localStorageSaveObj(pagesKey, pagesStore);
    },
    deletePage(index) {
        // splice(start, deleteCount, [item1], [item2], ...), 
        // где start - стартовая позиция, с которой начнем удалять, 
        // deleteCount - количество элементов, которые будут удалены, начиная с start,
        // item1, item2, ... - элементы, которые надо добавить в массив
        pagesStore.splice(index, 1);
        this.localStorageSaveObj(pagesKey, pagesStore);
    },

    getPersonalPage() {
        return personalPageStore;
    },
    setPersonalPage(newPage) {
        Object.assign(personalPageStore, newPage); // Для реактивных объектов используем именно Object.assign, а не стандартный синтаксис через =
        // personalPageStore = newPage;
        this.localStorageSaveObj(personalPageKey, newPage);
    },

    localStorageSaveObj(key, obj) {
        const str = JSON.stringify(obj);
        localStorage.setItem(key, str);
    },
    localStorageLoad(key) {
        const str = localStorage.getItem(key);
        if (str) {
            const data = JSON.parse(str);
            return data;
        }
        return undefined;
    },
    pagesKey: pagesKey,
    personalPageKey: personalPageKey
}