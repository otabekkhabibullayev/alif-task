export const state = () => ({
    list: [],
    detail: {},
    visible: false,
})

export const getters = {
    list(state) {
        return state.list
    },
    detail(state) {
        return state.detail
    },
    visible(state) {
        return state.visible
    }
}

export const mutations = {
    setList(state, payload) {
        state.list = payload
    },
    setDetail(state, payload) {
        state.detail = payload
    },
    setVisible(state, payload) {
        state.visible = payload
    }
}

export const actions = {
    async fetchList({ commit }) {
        try {
            let res = await this.$axios.get('/list')
            commit('setList', res.data)
        } catch (e) {
            console.error(e)
        }
    },
    async getListSlug({ commit }, id) {
        try {
            let res = await this.$axios.get(`/list/${id}`)
            commit('setDetail', res.data)
        } catch (e) {
            console.error(e)
        }
    },
    async sendData(_, { payload }) {
        try {
            let res = await this.$axios.post('/list/', payload)
            console.log(res, 'send');
            return res
        } catch (e) {
            console.error(e)
        }
    },
    async deleteData(_, id) {
        try {
            let res = await this.$axios.delete(`/list/${id}`)
            return res
        } catch (e) {
            console.error(e)
        }
    },
    async updateData(_, { id, payload }) {
        try {
            let res = await this.$axios.put(`/list/${id}`, payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }
}