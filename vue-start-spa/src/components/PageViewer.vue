<template>
    <div id='content' class="container">
        <h1 class="emphasize">{{ page.pageTitle }}</h1>
        <p>{{ page.content }}</p>
    </div>
</template>

<script>
export default {
    props: ["page"],
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
