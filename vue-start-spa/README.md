# vue-start-spa

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### React components

Если мы изменяем объект из props напрямую или computed поле, то при изменении этого объекта компонент будет автоматически подтягивать изменения, но если мы будем использовать объект из data(), то чтобы он автоматически обновлялся, надо прописать watch для него.
