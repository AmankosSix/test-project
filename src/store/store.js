import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        items: [],
        sort: false,
        search: '',
    },
    getters: {
        items: (state) => {
            let items = [...state.items];
            if (state.sort) {
                items.sort((a, b) => a.task.localeCompare(b.task));
            }
            if (state.search) {
                const search = state.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const columns = ['task', 'description'];
                items = items.map((el) => {
                    const item = { ...el };
                    Object.entries(el).forEach(([key, val]) => {
                        if (columns.includes(key)) {
                            item[key] = val.replace(new RegExp(search, 'gi'), match => `<mark>${match}</mark>`);
                        }
                    });
                    return item;
                });
            }
            return items;
        },
        sort: state => state.sort,
    },
    mutations: {
        addItem(state, item) {
            state.items.push(item);
        },
        removeItem(state, ids) {
            state.items = state.items.filter(el => !ids.includes(el.id));
        },
        setFilter(state) {
            state.sort = !state.sort;
        },
        search(state, value) {
            state.search = value;
        },
    },
    actions: {

    },
})
