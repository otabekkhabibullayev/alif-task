<template>
  <div class="table">
    <div class="table-top">
      <div class="table-top-item">
        <a-input placeholder="Filter" v-model="search" />
      </div>
      <!-- {{ genresSearched }}
      <div class="table-top-item">
        <a-select v-model="genresSearched">
          <a-select-option v-for="i in genres" :key="i.id" :value="i.title">
            {{ i.title }}
          </a-select-option>
        </a-select>
      </div> -->
      <div class="table-top-item">
        <a-modal :header="null" :footer="null" v-model="visible">
          <div class="modal-header">
            <h3>Создать цитату</h3>
            <a-icon
              type="close"
              @click="$store.commit('list/setVisible', false)"
            />
          </div>
          <the-form></the-form>
        </a-modal>
        <button @click="createQuote">Создать</button>
      </div>
    </div>
    <table v-if="list.length != 0">
      <thead>
        <tr>
          <th>№</th>
          <th>Автор</th>
          <th>Жанр</th>
          <th>Время</th>
          <th>Цитата</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in filteredQuotes" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.content }}</td>
          <td width="1%">
            <div class="table-action">
              <a-icon
                type="edit"
                @click="$router.push(`/quote/update/${item.id}`)"
              />
              <a-icon type="eye" @click="$router.push(`quote/${item.id}`)" />

              <a-popconfirm
                placement="topLeft"
                ok-text="Да"
                cancel-text="Нет"
                @confirm="onDelete(item.id)"
              >
                <template #title>
                  Вы действительно хотите удалить цитату
                </template>

                <a-icon type="delete" />
              </a-popconfirm>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>Цитат пока нет добавьте первую</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      genresSearched: "",
      genres: [
        {
          id: 1,
          title: "Драма",
        },
        {
          id: 2,
          title: "Эпос",
        },
        {
          id: 3,
          title: "Лирика",
        },
      ],
    };
  },
  methods: {
    ...mapActions("list", ["fetchList", "deleteData"]),
    onDelete(id) {
      this.deleteData(id);
      setTimeout(() => {
        this.fetchList();
      }, 100);
    },
    createQuote() {
      this.$store.commit("list/setVisible", true);
    },
  },

  computed: {
    ...mapGetters("list", ["list"]),
    ...mapGetters("list", ["visible"]),
    filteredQuotes() {
      let filtered = this.list.filter((quote) => {
        return (
          quote.author.indexOf(this.search) > -1 ||
          quote.date.indexOf(this.search) > -1 ||
          quote.genre.indexOf(this.search) > -1
        );
      });
      return filtered;
    },
  },

  async mounted() {
    await this.fetchList();
  },
};
</script>

<style>
</style>