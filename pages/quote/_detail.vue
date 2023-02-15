<template>
  <div class="detail">
    <div class="container">
      <div class="detail-main">
        <ol>
          <li>
            <h4>Автор</h4>
            <span>{{ detail.author }}</span>
          </li>
          <li>
            <h4>Жанры</h4>
            <span>{{ detail.genre }}</span>
          </li>
          <li>
            <h4>Время</h4>
            <span>{{ detail.date }}</span>
          </li>
          <li>
            <h4>Цитата</h4>
            <span>{{ detail.content }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("list", ["getListSlug"]),
  },
  computed: {
    ...mapGetters("list", ["detail"]),
  },
  mounted() {
    this.getListSlug(this.$route.params.detail);
  },
};
</script>

<style>
</style>