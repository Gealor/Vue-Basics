<template>
    <!-- <win98-nav-bar
        :pages="pages"
        :activePage="activePage"
    ></win98-nav-bar> -->

    <navbar></navbar>

    <router-view></router-view>
    
    <div v-show="false">hide this content</div> 
    <!-- v-show используется с помощью CSS свойства display: none, в то время как v-if полностью удаляет элемент из DOM. -->
</template>

<script>
import Navbar from './components/NavBar.vue';
// import Win98NavBar from './components/Win98NavBar.vue';


// в export default мы описываем логику нашего компонента, его данные (data), методы (methods), computed свойства и т.д.
export default {
    components: {
        Navbar,
        // Win98NavBar,
    },
    // created - это один из жизненных циклов компонента, он срабатывает после того, как компонент был создан, но до того, как он был отрисован на странице. 
    // Это хорошее место для выполнения асинхронных операций, таких как загрузка данных с сервера.
    async created() {
        const pages = await this.getPages();
        if (!this.$datas.localStorageLoad(this.$datas.pagesKey)){
            this.$datas.localStorageSaveObj(this.$datas.pagesKey, pages);
        }
        if (!this.$datas.localStorageLoad(this.$datas.personalPageKey)){
            this.$datas.localStorageSaveObj(
                this.$datas.personalPageKey, 
                {
                    "link": {
                        "text": "Template",
                        "url": "template.html"
                        },
                    "pageTitle": "Template Page",
                    "content": "Welcome to the Template Page!",
                    "published": true,
                }
            );
        }
    },
    methods: {
        // Лучше подгружать данные для страницы с какого либо сервера с помощью API, а не хранить их в коде
        async getPages() {
            let res = await fetch('pages.json');
            let data = await res.json();
            
            return data;
        },
    }
}
</script>

<style>
.container-centered {
    margin-top: 20px; 
    text-align: center;
}
</style>