<template>
  <div>
    Здесь нет светофора<br />
    Перейдите на любой цвет светофора<br />
    <router-link to="/red" class="red">Красный</router-link><br />
    <router-link to="/orange" class="orange">Оранжевый</router-link><br />
    <router-link to="/green" class="green">Зелёный</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.red {
  color: red;
}
.orange {
  color: orange;
}
.green {
  color: green;
}
</style>
