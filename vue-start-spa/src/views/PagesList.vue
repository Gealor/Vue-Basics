<template>
    <h2>Pages</h2>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Link Text</th>
                <th>Is Published</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(page, index) in $datas.getAllPages()"
                :key="index"
            >
                <td
                    @click="goToPage(index)"
                >{{ page.pageTitle }}</td>
                <td
                    @click="goToPage(index)"
                >{{ page.link.text }}</td>
                <td
                    @click.prevent="updatePublishedStatus(index)"
                >{{ page.published ? '✅' : '❌' }}</td>
            </tr>
        </tbody>
    </table>
    <div class="text-start">
        <router-link
            to="/pages/create"
            class="btn btn-primary btn-sm"
        >New Page</router-link>
    </div>
</template>

<!-- Для Composition API нужно в script объявить setup аттрибут -->
<script setup>
// ref - для примитивов (строки, числа, булево значение и т.д.), reactive - для объектов (JSON структур и т.д.)
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

const $datas = inject("$datas2");
const router = useRouter();

function goToPage(index) {
    router.push({ path: `/pages/${index}/edit` });
}

function updatePublishedStatus(index) {
    let currentPage = $datas.getSinglePage(index);
    currentPage.published = !currentPage.published;
    $datas.updatePage(index, currentPage);
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>