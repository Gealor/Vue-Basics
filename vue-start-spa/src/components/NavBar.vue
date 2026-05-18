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
                    :isActive="activePage == index"
                ></navbar-link>
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
    props: ["activePage", "pages"],
    created() {
        this.getThemeSetting();
    },
    data() {
        return {
            theme: 'dark',
        }
    },
    methods: {
        changeTheme() {
            let theme = 'light';

            if (this.theme === 'light') {
                theme = 'dark';
            }
            this.theme = theme;
            this.storeThemeSetting()
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