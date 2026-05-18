<template>
    <!-- <win98-nav-bar
        :pages="pages"
        :activePage="activePage"
    ></win98-nav-bar> -->

    <navbar
        :pages="pages"
        :activePage="activePage"
    ></navbar>
    
    <div v-show="false">hide this content</div> 
    <!-- v-show используется с помощью CSS свойства display: none, в то время как v-if полностью удаляет элемент из DOM. -->

    <!-- v-if нужен чтобы отображать компонент только тогда, когда у нас есть страницы для отображения, иначе мы можем столкнуться с ошибкой доступа к несуществующим данным. -->
    <page-viewer 
        v-if="pages.length > 0"
        :page="pages[activePage]"
    ></page-viewer>

    <create-page
        v-if="activePage == 3"
        @page-created="pageCreated"
    ></create-page>
</template>

<script>
import PageViewer from './components/PageViewer.vue';
import Navbar from './components/NavBar.vue';
// import Win98NavBar from './components/Win98NavBar.vue';
import CreatePage from './components/CreatePage.vue';


// в export default мы описываем логику нашего компонента, его данные (data), методы (methods), computed свойства и т.д.
export default {
    components: {
        PageViewer,
        Navbar,
        CreatePage,
        // Win98NavBar,
    },
    // created - это один из жизненных циклов компонента, он срабатывает после того, как компонент был создан, но до того, как он был отрисован на странице. 
    // Это хорошее место для выполнения асинхронных операций, таких как загрузка данных с сервера.
    async created() {
        this.pages = await this.getPages();
        // в Events.js объявили хранилище глобальных ивентов, чтобы не приходилось прокидывать паровозиком ивенты через все компоненты, как применять ивенты показано в NavbarLink.vue
        this.$bus.$on('navbarLinkActived', (index) => 
            {
                this.activePage = index;
            }
        )
    },
    data() {
        return {
            activePage: 0,
            pages: [],
        }
    },
    methods: {
        // Лучше подгружать данные для страницы с какого либо сервера с помощью API, а не хранить их в коде
        async getPages() {
            let res = await fetch('pages.json');
            let data = await res.json();
            
            return data;
        },
        pageCreated(pageObj) {
            console.log('Page created', pageObj);
            this.pages[this.activePage] = pageObj;
        }
    }
}
</script>