<template>
    <div v-if='page' id='content' class="container-centered">
        <h1 class="emphasize-under-over">{{ page.pageTitle }}</h1>
        <p>{{ page.content }}</p>
    </div>
</template>

<script>
export default {
    // Если в router.js мы объявили props: true, то мы использовать привычный нам watch и в props передаем параметр.
    props: ["index"],
    // Если мы используем computed или напрямую проп (props), то нам не надо заботиться об автоматическом обновлении компонента,
    // НО если объявить компонент в data, скопировать проп в data и использовать этот объект, то мы должны САМИ прописывать watch !!!! 
    computed: {
        page() {
            if (this.$route.params.index) {
                return this.$datas.getSinglePage(this.$route.params.index);
            } 
                return this.$datas.getPersonalPage();
        }
    },
    watch: {
        index(newIndex, oldIndex) {
            this.page = this.$datas.getSinglePage(newIndex);
        }
    }
}
</script>

<style>
.emphasize-under-over {
    text-decoration: underline overline;
    text-shadow: 2px 2px 3px #848484;
}
</style>

