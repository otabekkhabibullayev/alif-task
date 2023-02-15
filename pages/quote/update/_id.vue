<template>
  <div class="edit">
    <div class="container">
      <div class="edit-main">
        <div class="form">
          <a-form-model ref="form" :model="form" :rules="rules">
            <a-row :gutter="16">
              <a-col :span="16">
                <a-form-model-item prop="author">
                  <div class="form-input">
                    <small>Автор</small>
                    <a-input v-model="form.author" />
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :span="16">
                <a-form-model-item prop="genre">
                  <div class="form-select">
                    <small>Жанры</small>
                    <a-select v-model="form.genre">
                      <a-select-option
                        v-for="i in genres"
                        :key="i.id"
                        :value="i.title"
                      >
                        {{ i.title }}
                      </a-select-option>
                    </a-select>
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :span="16">
                <a-form-model-item prop="content">
                  <div class="form-textarea">
                    <small>Цитата</small>
                    <a-textarea v-model="form.content"></a-textarea>
                  </div>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-form-item>
              <a-button type="primary" @click="onSubmit"> Обновить </a-button>
            </a-form-item>
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        author: [{ required: true, trigger: "blur", message: "Заполните" }],
        content: [{ required: true, trigger: "blur", message: "Заполните" }],
        genre: [{ required: true, trigger: "blur", message: "Заполните" }],
        comment: [{ required: true, trigger: "blur", message: "Заполните" }],
      },
      form: {
        author: "",
        content: "",
        genre: "",
        date: null,
      },
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
    ...mapActions("list", ["updateData"]),
    onSubmit() {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      this.form.date = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.updateData({
            id: this.$route.params.id,
            payload: this.form,
          });
          this.$router.go(-1);
        }
      });
    },
    async getDetail(slug) {
      try {
        let res = await this.$axios.get(`/list/${slug}`);
        this.form = res.data;
        return res;
      } catch (e) {
        console.error(e);
      }
    },
  },
  async mounted() {
    this.getDetail(this.$route.params.id);
  },
};
</script>
  
  <style>
</style>