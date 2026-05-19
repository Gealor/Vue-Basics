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
                    v-for="(page, index) in pages" class="nav-item" :key="index"
                    :page="page"
                    :index="index"
                ></navbar-link>

                <li>
                    <router-link
                        to="/personal"
                        class="nav-link"
                        active-class="active emphasize"
                        aria-current="page" 
                    >{{ personalPageText }}</router-link>
                </li>
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
        this.personalPageText = this.$datas.getPersonalPage().link.text;

        this.$bus.$on("personalPageUpdated", (newPage) => {
            this.personalPageText = newPage.link.text;  
        })
    },
    data() {
        return {
            theme: 'dark',
            pages: [],
            personalPageText: '',
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