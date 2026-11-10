import { createStore } from "vuex";
import PublicationService from "./service/PublicationService";
import ReaderService from "./service/ReaderService";

// Спільні дані для кількох сторінок: каталог видань і список читачів
const store = createStore({
    state: {
        publications: [],
        readers: []
    },
    mutations: {
        SET_PUBLICATIONS: (state, publications) => {
            state.publications = publications;
        },
        SET_READERS: (state, readers) => {
            state.readers = readers;
        }
    },
    actions: {
        GET_PUBLICATIONS_FROM_API({ commit }) {
            return PublicationService.findAll()
                .then((response) => {
                    commit('SET_PUBLICATIONS', response.data);
                    return response;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        },
        GET_READERS_FROM_API({ commit }) {
            return ReaderService.findAll()
                .then((response) => {
                    commit('SET_READERS', response.data);
                    return response;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        }
    },
    getters: {
        PUBLICATIONS(state) {
            return state.publications;
        },
        READERS(state) {
            return state.readers;
        }
    }
});

export default store;