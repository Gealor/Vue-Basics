<template>
<nav
    id='navigationMenuUp' 
    :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']"
>
    <div class="container-fluid">
        <a class="navbar-brand" href="#">My Vue</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <navbar-link
                    v-for="(page, index) in publishedPages" class="nav-item" :key="index"
                    :page="page"
                    :index="index"
                ></navbar-link>

                <li>
                    <router-link
                        to="/personal"
                        class="nav-link"
                        active-class="active emphasize"
                        aria-current="page" 
                    >{{ $datas.getPersonalPage().link?.text }}</router-link>
                </li>
                <!-- ?. — это optional chaining (опциональная цепочка). Защищает от ошибки если объект null или undefined -->
            </ul>
        </div>

        <form class="d-flex">
            <button 
                class="btn btn-primary"
                :class="`btn-${theme}`"
                @click.prevent="changeTheme()"
            ></button>
        </form>

    </div>
</nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue';

export default {
    components: {
        NavbarLink,
    },
    created() {
        this.getThemeSetting();
        this.pages = this.$datas.getAllPages();
    },
    computed: {
        publishedPages() {
            return this.pages.filter((page) => page.published);
        }
    },
    data() {
        return {
            theme: 'dark',
            pages: [],
        }
    },
    methods: {
        changeTheme() {
            let theme = 'light';

            if (this.theme === 'light') {
                theme = 'dark';
            }
            this.theme = theme;
            this.storeThemeSetting();
        },
        storeThemeSetting() {
            localStorage.setItem('theme', this.theme)
        },
        getThemeSetting() {
            let theme = localStorage.getItem('theme')
            if (theme) {
                this.theme = theme;
            }
        },
    },
}
</script>

<style>
.emphasize {
    text-decoration: underline !important;
}
</style>

<style scoped>
.btn-dark {
    background-color: #f8f9fa;
    border-color: #f8f9fa;
    color: #333;
}
.btn-light {
    background-color: #343a40;
    border-color: #343a40;
    color: #fff;
}

</style>