<template>
    <div class="container md-3">
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
                    @input="(event) => pageTitle=event.target.value"
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

            <div class="mb-3">
                <button
                    class="btn btn-primary"
                    @click.prevent="submitForm()"
                    :disabled="isFormInvalid"
                >Create Page</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    // computed просто возвращает значение на основе других свойств, мы ничего не изменяем.
    computed: {
        isFormInvalid() {
            return !this.pageTitle || !this.pageContent || !this.linkText || !this.linkUrl;
        }
    },
    // emits - это способ объявить, какие события может отправлять этот компонент. 
    // Это помогает другим разработчикам понять, какие события они могут ожидать от этого компонента и как с ними взаимодействовать.
    // emits можно объявиить как список строк, или как объект, где можно сделать предварительную валидацию входных данных
    emits: {
        pageCreated({pageTitle, content, link}) {
            if (!pageTitle || !content) {
                console.error('Missing required fields');
                return false;
            }

            if (!link || !link.text || !link.url) {
                console.error('Link is required and must have text and url');
                return false;
            }

            return true;
        }
    },
    data() {
        return {
            pageTitle: '',
            pageContent: '',
            linkText: '',
            linkUrl: '',
        }
    },
    methods: {
        submitForm() {
            if (!this.pageTitle || !this.pageContent || !this.linkText || !this.linkUrl) {
                alert('Please fill in all fields')
                return;
            }
            // $emit - это способ отправить событие от дочернего компонента к родительскому.
            // Нам не надо объявлять событие pageCreated в props, мы просто вызываем его с помощью $emit, и родительский компонент может слушать это событие и реагировать на него.
            this.$emit('pageCreated', {
                pageTitle: this.pageTitle,
                content: this.pageContent,
                link: {
                    text: this.linkText,
                    url: this.linkUrl,
                }
            })
        }
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
</script>

<style scoped>
.text-area-resize-none {
    resize: none;
    border-color: black;
}

</style>