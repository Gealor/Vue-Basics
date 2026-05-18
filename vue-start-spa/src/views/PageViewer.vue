<template>
    <div v-if='page' id='content' class="container">
        <h1 class="emphasize">{{ page.pageTitle }}</h1>
        <p>{{ page.content }}</p>
    </div>
</template>

<script>
export default {
    // Если в router.js мы объявили props: true, то мы использовать привычный нам watch 
    props: ["index", "personalPage"],
    created() {
        if (this.$route.params.index) {
            this.page = this.$datas.getSinglePage(this.$route.params.index);
        } else {
            this.page = this.personalPage;
        }

        // Обычный watch, объявленный в export default, не расчитан на работу с внутренними переменными и методами, такими как $route, 
        // для этого есть специальный метод $watch, который делает по сути то же самое
        // this.$watch(() => this.$route.params, (newParams, prevParams) =>{
        //     this.page = this.$datas.getSinglePage(newParams.index)
        // });
    },
    data() {
        return {
            page: null,
        }
    },
    watch: {
        index(newIndex, oldIndex) {
            this.page = this.$datas.getSinglePage(newIndex);
        },
        personalPage(newPage) {
            this.page = newPage;
        }
    }
}
</script>

<style scoped>
.emphasize {
    text-decoration: underline overline;
    text-shadow: 2px 2px 3px #848484;
}

.container {
    margin-top: 20px; 
    text-align: center;
}
</style>
