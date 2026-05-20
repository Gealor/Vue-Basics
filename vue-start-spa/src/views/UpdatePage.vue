<template>
    <div class="container md-3">
        <page-viewer></page-viewer>

        <form action="">
            <!-- Page Title -->
            <div class="mb-3">
                <label for="" class="form-label">
                    Page Title
                </label>
                <!-- @input - это событие, которое срабатывает каждый раз, когда пользователь вводит что-то в поле ввода. 
                event - это объект события, который содержит информацию о том, что произошло. event.target - это элемент, на котором произошло событие (в данном случае, это поле ввода), 
                а event.target.value - это текущее значение этого поля ввода. -->
                <input 
                    type="text" 
                    class="form-control text-area-resize-none"
                    placeholder="Title Page"
                    v-model="pageTitle"
                />
            </div>

            <!-- Page Content -->
            <div class="mb-3">
                <label for="" class="form-label">
                    Content
                </label>
                <!-- Второй вариант менять значение переменной - это использовать директиву v-model, 
                 которая автоматически связывает значение поля ввода с переменной в нашем компоненте. -->
                <textarea 
                    type="text"
                    class="form-control text-area-resize-none"
                    rows="5"
                    placeholder="Some content for page"
                    v-model="pageContent"
                ></textarea>
            </div>

            <!-- Link Text -->
            <div class="mb-3">
                <label for="" class="form-label">
                    Link Text
                </label>
                <input 
                    type="text"
                    class="form-control text-area-resize-none"
                    placeholder="Go to new page"
                    v-model="linkText"
                />
            </div>

            <!-- Link URL -->
            <div class="mb-3">
                <label for="" class="form-label">
                    Link URL
                </label>
                <input 
                    type="text"
                    class="form-control text-area-resize-none"
                    placeholder="new.html"
                    v-model="linkUrl"
                />
            </div>

            <div class="mb-3 d-flex gap-2">
                <button
                    class="btn btn-primary"
                    @click.prevent="submitFormToUpdate()"
                    :disabled="isFormInvalid"
                >Update Page</button>
                <button
                    class="btn btn-primary"
                    @click.prevent="goToPagesList()"
                >Return to the pages list</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { computed, inject, watch, ref } from 'vue';
import PageViewer from './PageViewer.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const $datas = inject("$datas2");

// Любые переменные, которые используются в форме и изменяются, должны быть реактивными, чтобы Vue сам отслеживал их изменение
let pageTitle = ref('');
let pageContent = ref('');
let linkText = ref('');
let linkUrl = ref('');

const isFormInvalid = computed(() => {
    return !(pageTitle.value || pageContent.value || linkText.value || linkUrl.value);
});

const isPersonalPage = computed(() => {
    return !route.params.index;
});

function submitFormToUpdate() {
    // computed поля получаем через .value (.value обязателен только в <script>)
    if (isFormInvalid.value) {
        alert('Please fill one field')
        return;
    }
    
    const oldPage = isPersonalPage.value
        ? $datas.getPersonalPage()
        : $datas.getSinglePage(route.params.index);

    const newPage = {
        pageTitle: pageTitle.value || oldPage.pageTitle,
        content: pageContent.value || oldPage.content,
        link: {
            text: linkText.value || oldPage.link.text,
            url: linkUrl.value || oldPage.link.url,
        },
    };

    if (isPersonalPage.value) {
        $datas.setPersonalPage(newPage);
    } else {
        $datas.updatePage(route.params.index, newPage);
    }
};

function loadPageData() {
    let currentPage;
    
    if (isPersonalPage.value) {
        currentPage = $datas.getPersonalPage();
    } else {
        currentPage = $datas.getSinglePage(route.params.index);
    }

    if (currentPage) {
        pageTitle.value = currentPage.pageTitle || '';
        pageContent.value = currentPage.content || '';
        linkText.value = currentPage.link?.text || '';
        linkUrl.value = currentPage.link?.url || '';
    }
};

function goToPagesList() {
    router.push({ path: '/pages'})
}

loadPageData();


watch(pageTitle, (newTitle, oldTitle) => {
    if (linkText.value == oldTitle) {
        linkText.value = newTitle;
    }
});

</script>

<!-- <script>
import PageViewer from './PageViewer.vue';
export default {
    components: {
        PageViewer,
    },
    // computed просто возвращает значение на основе других свойств, мы ничего не изменяем.
    computed: {
        isFormInvalid() {
            return !(this.pageTitle || this.pageContent || this.linkText || this.linkUrl);
        },
        // Определяем, редактируем ли мы личную страницу или обычную
        isPersonalPage() {
            return !this.$route.params.index;
        }
    },
    // emits - это способ объявить, какие события может отправлять этот компонент. 
    // Это помогает другим разработчикам понять, какие события они могут ожидать от этого компонента и как с ними взаимодействовать.
    // emits можно объявиить как список строк, или как объект, где можно сделать предварительную валидацию входных данных
    data() {
        return {
            pageTitle: '',
            pageContent: '',
            linkText: '',
            linkUrl: '',
        }
    },
    created() {
        this.loadPageData();
    },
    methods: {
        loadPageData() {
            let currentPage;
            
            if (this.isPersonalPage) {
                currentPage = this.$datas.getPersonalPage();
            } else {
                currentPage = this.$datas.getSinglePage(this.$route.params.index);
            }

            if (currentPage) {
                this.pageTitle = currentPage.pageTitle || '';
                this.pageContent = currentPage.content || '';
                this.linkText = currentPage.link?.text || '';
                this.linkUrl = currentPage.link?.url || '';
            }
        },
        submitFormToUpdate() {
            if (this.isFormInvalid) {
                alert('Please fill one field')
                return;
            }
            
            const oldPage = this.isPersonalPage
                ? this.$datas.getPersonalPage()
                : this.$datas.getSinglePage(this.$route.params.index);

            const newPage = {
                pageTitle: this.pageTitle || oldPage.pageTitle,
                content: this.pageContent || oldPage.content,
                link: {
                    text: this.linkText || oldPage.link.text,
                    url: this.linkUrl || oldPage.link.url,
                },
            };

            if (this.isPersonalPage) {
                this.$datas.setPersonalPage(newPage);
            } else {
                this.$datas.updatePage(this.$route.params.index, newPage);
            }
        },
    },
    // watch - это способ наблюдать за изменениями в данных и выполнять определенные действия, когда эти данные изменяются.
    watch: {
        pageTitle(newTitle, oldTitle) {
            if (this.linkText == oldTitle) {
                this.linkText = newTitle;
            }
        }
    }
}
</script> -->

<style scoped>
.text-area-resize-none {
    resize: none;
    border-color: black;
}
</style>