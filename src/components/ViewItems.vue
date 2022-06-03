<template>
    <div class="form">
        <div v-if="isLoading">Загрузка...</div>
        <div v-else-if="!items.length">Информация не найдена, <router-link to="/">перейти</router-link> на страницу добавление задач.</div>
        <template v-else>
            <div class="form__title">Список задач</div>
            <div class="form__header">
                <button class="button button--success m-r" @click="filter">Фильтр</button>
                <input class="input" type="text" @input="search($event.target.value)" placeholder="Поиск">
            </div>
            <div class="form__content">
                <table class="table">
                    <thead class="table__thead">
                        <tr class="table__row">
                            <th class="table__th table__th--tiny">
                                <input v-model="checkAll" type="checkbox">
                            </th>
                            <th class="table__th table__th--short">№</th>
                            <th class="table__th">Задача</th>
                            <th class="table__th">Описание</th>
                        </tr>
                    </thead>
                    <tbody class="table__tbody">
                        <tr v-for="(item, index) in items" :key="item.id" class="table__row">
                            <td class="table__td table__td--tiny">
                                <input v-model="selectedItems" type="checkbox" :value="item.id">
                            </td>
                            <td class="table__td table__td--short">{{ index + 1 }}</td>
                            <td class="table__td" v-html="item.task" />
                            <td class="table__td" v-html="item.description" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form__control-bar form__control-bar--right">
                <router-link to="/" tag="button" class="button m-r">Добавить задачу</router-link>
                <button class="button button--alert" @click="remove" :disabled="!selectedItems.length">Удалить</button>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            selectedItems: [],
            isLoading: false,
        }
    },
    computed: {
        ...mapGetters(['items', 'sort']),
        checkAll: {
            get() {
                return this.items.length ? this.selectedItems.length === this.items.length : false;
            },
            set(value) {
                let selectedItems = [];
                if (value) {
                    selectedItems = [...this.items.map(el => el.id)];
                }
                this.selectedItems = selectedItems;
            },
        },
    },
    mounted() {
        this.fetch();
    },
    methods: {
        ...mapMutations(['removeItem', 'setFilter', 'search']),
        remove() {
            if (!this.selectedItems.length) {
                return;
            }
            this.removeItem(this.selectedItems);
            this.$notify({
                group: 'foo',
                title: this.selectedItems.length === 1 ? 'Задача успешно удалена' : 'Задачи успешно удалены',
            });
            this.selectedItems.length = 0;
        },
        filter() {
            this.$notify({
                group: 'foo',
                title: 'Задачи успешно отфильтрованы',
            });
            this.setFilter();
        },
        async fetch() {
            this.isLoading = true;
            this.search('');
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 3000);
            });
            this.isLoading = false;
        }
    }
}
</script>
