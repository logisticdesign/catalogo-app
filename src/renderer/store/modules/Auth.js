import axios from 'axios'

const state = {
    user: '',
    token: localStorage.getItem('token') || '',
    status: '',
}

const getters = {
    authUser: state => state.user,
    authStatus: state => state.status,
    isLoggedIn: state =>  !!state.token,
}

const mutations = {
    AUTH_REQUEST(state) {
        state.status = 'loading'
    },
    AUTH_SUCCESS(state, payload) {
        state.user = payload.user
        state.token = payload.token
        state.status = 'success'
    },
    AUTH_ERROR(state) {
        state.status = 'error'
    },
    LOGOUT(state) {
        state.user = ''
        state.token = ''
        state.status = ''
    },
}

const actions = {
    async login({ commit }, user) {
        commit('AUTH_REQUEST')

        let tokenRequest = await axios.post('http://catalogo.test/api/sanctum/token', {
            email: user.email,
            password: user.password,
            device_name: require('os').platform() + '-' + user.email,
        })

        const token = tokenRequest.data

        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return axios.get('http://catalogo.test/api/user').then(({ data }) => {
            commit('AUTH_SUCCESS', { user: data, token: token })
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('LOGOUT')

            localStorage.removeItem('token')

            delete axios.defaults.headers.common['Authorization']

            resolve()
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
