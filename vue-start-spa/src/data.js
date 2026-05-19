const pagesKey = 'pages';
const personalPageKey = 'personalPage';

let pagesJson = localStorage.getItem(pagesKey);
let pagesStore = JSON.parse(pagesJson);

let personalPageJson = localStorage.getItem(personalPageKey);
let personalPageStore = JSON.parse(personalPageJson);

export default {
    getAllPages() {
        return pagesStore;
    },
    getSinglePage(index) {
        return pagesStore[index];
    },

    getPersonalPage() {
        return personalPageStore;
    },
    setPersonalPage(newPage) {
        personalPageStore = newPage;
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