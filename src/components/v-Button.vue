<template>
    <button :class="classBtn">
        <slot> </slot>
    </button>
</template>

<script>
    export default {
        props: ['classBtn']
    }
</script>

<style lang="scss" scoped>
button{
width: 12rem;
height: 4rem;
border-radius: 1rem;
font-weight: 400;
font-size: 1.6rem;
color: #FFF;
background: #D03130;
cursor: pointer;
transition: .5s;
&:disabled {
    background: rgb(197, 197, 197);
}
}
.red__btn {
    &:hover {
        background: #df0f0f;
        transition: .3s
    }
}
.black__btn {
            background: rgb(42, 42, 42);
    &:hover{
        background: black;
        transition: .3s;
    }
}
</style>