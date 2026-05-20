import { reactive } from "vue";

const pagesKey = 'pages';
const personalPageKey = 'personalPage';

let pagesJson = localStorage.getItem(pagesKey);
let pagesStore = reactive(JSON.parse(pagesJson));

let personalPageJson = localStorage.getItem(personalPageKey);
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
        const data = JSON.parse(str);

        return data;
    },
    pagesKey: pagesKey,
    personalPageKey: personalPageKey
}