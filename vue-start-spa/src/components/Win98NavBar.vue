<template>
    <div class="window">
        <div class="title-bar">
            <div class="title-bar-text">My Vue 95</div>
            <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
            </div>
        </div>
        <div class="window-body">
            <menu role="tablist">
                <navbar-link
                    v-for="(page, index) in pages" role="tab" :key="index"
                    :page="page"
                    :index="index"
                    :isActive="activePage == index"
                ></navbar-link>
            </menu>
            <div class="window" role="tabpanel">
                <div class="window-body">
                    <p>{{ pages[activePage].content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../node_modules//98.css/dist/98.css';
import NavbarLink from './NavbarLink.vue';

export default {
    props: ["pages", "activePage"],
    components: {
        NavbarLink
    }
}
</script>

<style scoped>

</style>