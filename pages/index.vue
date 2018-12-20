<template lang='pug'>
div
    #index
        h1 使用說明
        hr
        h2 我的牌組
        p 您可以在 [我的牌組] 編輯、查看和刪除牌組。
        h2 新增牌組
        p 您可以在 [新增牌組] 建立牌組。
        h2 Gaming
        p 您可以在 [Gaming] 當個快樂的記牌仔。
</template>

<script>

export default {
    data() {
        return {}
    }
}
</script>

<style lang='sass'>
#main
    &>#index
        padding: 0 10%
        &>h1, h2, h3, h4, h5
            padding: 0 2%
            color: $black2
        &>hr
            border: 2px solid #ccc
            margin: 30px 0
        &>h1
            font-size: 30px
        &>h2
            font-size: 24px
        &>p
            padding: 0 4%
            color: $theme5
        &>b
            color: $theme5
</style>
