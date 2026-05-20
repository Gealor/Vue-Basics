<template>
    <p>{{ counter }}</p>
    <p>{{ data.counter }}</p>
    <button @click.prevent="counterIncrement">HIT ME!</button>
</template>

<!-- Для Composition API нужно в script объявить setup аттрибут -->
<script setup>
// ref - для примитивов (строки, числа, булево значение и т.д.), reactive - для объектов (JSON структур и т.д.)
import { ref, reactive } from 'vue';
const counter = ref(0); // {value: 0};
const data = reactive({counter: 0});

function counterIncrement() {
    counter.value++;
    data.counter++;
}
// Можно конечно сделать функционал по стандартному, через export default, но с Composition API есть способ покрасивее
// export default {
//     data() {
//         return {
//             counter: 0,
//         }
//     },
//     methods: {
//         counterIncrement() {
//             this.counter++;
//         }
//     }
// }
</script>

<style scoped>

</style>