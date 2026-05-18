const pagesKey = 'pages';

let pagesJson = localStorage.getItem(pagesKey);
let pagesStore = JSON.parse(pagesJson);

export default {
    getAllPages() {
        return pagesStore;
    },
    getSinglePage(index) {
        return pagesStore[index];
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
    pagesKey: "pages",
    personalPageKey: "personalPage"
}