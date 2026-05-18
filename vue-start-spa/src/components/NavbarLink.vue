<template>
    <li>
        <!-- Мы не прокидываем navbarLinkActived через все компоненты, 
        вместо этого мы объявляем функцию для триггера в App.vue, и используем с помощью глобальной переменной $bus, которую мы объявили в main.js.
        Теперь мы можем вызывать navbarLinkActived из любой точки программы без цепочек пробрасывания -->
        <a 
            class="nav-link"
            :class="activeClass" 
            aria-current="page" 
            :href="page.link.url"
            :title="`This link goes to the ${page.link.text} page`"
            @click.prevent="$bus.$emit('navbarLinkActived', index)"
        >{{ page.link.text }}</a>
    </li>
</template>

<script>
export default {
    props: ["page", "isActive", "index"],
    computed: {
        activeClass() {
            return {
                active: this.isActive,
                emphasize: this.isActive,
            };
        }
    }
}
</script>

<style scoped>
.emphasize {
    text-decoration: underline !important;
}
</style>