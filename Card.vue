<template>
  <div class="card">
    <div class="word">
      <div>{{ card.word }}</div>
      <div>{{ card.word }}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">

.card {
  width: 18%;
  display: flex;
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  color: black;
  flex-direction: column;
  justify-content: center;
  font-size: 18pt;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .word {
    div {
      margin: 0;
    }

    div:nth-of-type(1) {
      transform: rotate(-180deg);
      font-variant: all-petite-caps;
    }

  }
}

</style>
