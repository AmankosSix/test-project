<template>
    <div class="form form--add">
        <div class="form__content">
            <div class="form__title">Форма добавление задач</div>
            <div class="input-group" :class="{'input-group--error': $v.task.$error }">
                <label class="label" for="task">Название задачи:</label>
                <input id="task" class="input" v-model.trim="$v.task.$model"/>
            </div>
            <div class="error-message" v-if="!$v.task.required && $v.task.$dirty">Поле обязательно для заполнения</div>
            <div class="input-group" :class="{'input-group--error': $v.description.$error }">
                <label class="label" for="description">Описание задачи:</label>
                <input id="description" class="input" v-model.trim="$v.description.$model"/>
            </div>
            <div class="error-message" v-if="!$v.description.required && $v.description.$dirty">Поле обязательно для заполнения</div>
        </div>
        <div class="form__control-bar form__control-bar--right">
            <router-link to="/view" tag="button" class="button m-r">Перейти к результатам</router-link>
            <button class="button button--primary" :disabled="$v.$anyError || !task || !description" @click="add">Добавить</button>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            task: '',
            description: '',
        }
    },
    validations: {
        task: {
            required
        },
        description: {
            required
        }
    },
    methods: {
        ...mapMutations(['addItem']),
        add() {
            if (this.$v.$anyError) {
                return;
            }
            this.addItem({
                id: Date.now(),
                task: this.task,
                description: this.description,
            });
            this.$notify({
                group: 'foo',
                title: `Задача "${this.task}" успешно добавлена`,
            });
            this.task = '';
            this.description = '';
            this.$v.$reset();
        },
    }
}
</script>
