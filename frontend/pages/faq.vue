<template lang="pug">
  div
    h1.title.is-2 {{$t('FAQPage.pageTitle')}}
    div.mb-5(v-if="isManagerOrHigher")
      input.input(type="text" v-model="newQuestion.title" :placeholder="$t('FAQPage.title')").mb-2
      input.input(type="number" v-model="newQuestion.order" :placeholder="$t('FAQPage.order')").mb-2
      quill-editor(
        :options="quillOptions"
        v-model="newQuestion.body"
        :placeholder="$t('FAQPage.typeAnswer')"
      ).faq-quill.mb-6
      button.button.is-primary.mr-2(@click="add") {{$t('add')}}
    div.faq-list(v-if="isManagerOrHigher")
      b-collapse.card(animation="slide" v-for="(collapse, index) of list"
        :key="index" :open="getState(index, 'isOpen')"
        @open="setState(index, 'isOpen', true)"
        @close="setState(index, 'isOpen', false)")
        div.card-header(slot="trigger" slot-scope="props" role="button")
          a.card-header-icon
            b-icon(:icon="props.open ? 'menu-down' : 'menu-right'" type="is-black")
          p.card-header-title
            | {{ collapse.title }} <!-- {{ collapse.order }} {{ collapse.state.isOpen }} {{ isEdit }}-->
            button(@click.stop="remove(collapse._id)" style="color: red").button.is-small {{ $t('delete') }}
        div.card-content
          div.content
            div.mb-4(v-if="!getState(index, 'isEdit')")
              div.content(v-html="collapse.body")
            div.mt-2(v-if="getState(index, 'isEdit')")
              label.label {{$t('FAQPage.title')}}
              input.input(type="text" @change="onInputChange(index,'title', $event)"
                :value="getTempModel(index, 'title')" :placeholder="$t('FAQPage.title')").mb-2
              label.label {{$t('FAQPage.order')}}
              input.input(type="number" @change="onInputChange(index, 'order', $event)"
                :value="getTempModel(index, 'order')" :placeholder="$t('FAQPage.order')").mb-2
              label.label {{$t('FAQPage.typeAnswer')}}
              quill-editor(:options="quillOptions"
                :content="getTempModel(index, 'body')"
                @change="onEditorChange($event, index)"
                :placeholder="$t('FAQPage.typeAnswer')").faq-quill
              div.mt-6
                button.button.is-primary.is-small.mr-2(@click="save(index)") {{$t('save')}}
                button.button.is-white.is-small(@click="setState(index, 'isEdit', false)") {{$t('cancel')}}
            button.button.is-info.is-small(@click="editMode(index)" v-else) {{ $t('edit') }}
    div.faq-list(v-else)
      b-collapse.card(animation="slide" v-for="(collapse, index) of list"
        :key="index" :open="false")
        div.card-header(slot="trigger" slot-scope="props" role="button")
          a.card-header-icon
            b-icon(:icon="props.open ? 'menu-down' : 'menu-right'" type="is-black")
          p.card-header-title {{ collapse.title }}
        div.card-content
          div.content(v-html="collapse.body")
</template>

<script>
import draggable from 'vuedraggable'
import {quillEditor} from 'vue-quill-editor'

export default {
  name: "users",
  layout: "profile",
  middleware: ["authRequired"],
  components: {draggable, quillEditor},

  computed: {
    isManagerOrHigher() {
      return this.$userIsManager();
    },

    list: {
      get() {
        return this.$store.getters['faq/list']
      },
      set(value) {
        this.$store.commit('faq/setList', value)
      }
    },
  },

  methods: {
    onEditorChange({ quill, html, text }, index) {
      this.setTempModel(index, 'body', html)
    },

    onInputChange(index, key, event) {
      this.setTempModel(index, key, event.target.value)
    },

    setTempModel(index, key, data) {
      this.$store.commit('faq/SET_TEMP_MODEL_BY_KEY', {
        index, key, data
      })
    },

    getTempModel(index, key) {
      return this.$store.getters['faq/getTempModel'](index, key)
    },

    editMode(index) {
      const collapse = JSON.parse(JSON.stringify(this.$store.getters['faq/list'][index]))

      this.$store.commit('faq/SET_TEMP_MODEL', {
        index,
        data: {
          body: collapse.body,
          order: collapse.order,
          title: collapse.title,
          _id: collapse._id
        }
      })

      this.setState(index, 'isEdit', true)
    },

    getState(index, key) {
      return this.$store.getters['faq/getState'](index, key)
    },

    toggleCollapse(index, key, data) {
      this.$store.commit('faq/setState', {
        index,
        key,
        data
      })
    },

    setState(index, key, data) {
      this.$store.commit('faq/setState', {
        index, key, data
      })
    },

    async add() {
      const isAdded = await this.$store.dispatch('faq/add', this.newQuestion)

      if (isAdded) {
        this.newQuestion.title = ''
        this.newQuestion.body = ''
        this.newQuestion.order = ''
      }
    },

    async order(target) {
      const moved = JSON.parse(JSON.stringify(target.moved))

      const {element, newIndex} = moved

      const id = element._id

      delete element._id

      element.order = newIndex + 1

      await this.$store.dispatch('faq/setOrder', {
        id,
        data: element
      })
    },

    async remove(id) {
      this.$buefy.dialog.confirm({
        type: 'is-danger',
        confirmText: this.$t('delete'),
        cancelText: this.$t('cancel'),
        message: this.$t('FAQPage.confirmDelete'),
        onConfirm: async () => {
          await this.$store.dispatch('faq/remove', id)
        }
      })
    },

    async save(index) {
      const edited = this.getTempModel(index)

      const isSaved = await this.$store.dispatch('faq/save', JSON.parse(JSON.stringify(edited)))

      if (isSaved) {
        this.editable = {}
        this.isEdit = false
      }
    }
  },

  data() {
    return {
      newQuestion: {
        title: '',
        body: '',
        order: ''
      },
      isEdit: false,
      isOpen: -1,
      editable: {},
      states: [],
      quillOptions: {
        placeholder: this.$t('FAQPage.typeAnswer')
      },
    };
  },

  async asyncData({store}) {
    await store.dispatch('faq/fetchList')
  }
};
</script>

<style lang="sass" scoped>
.mb-6
  margin-bottom: 4rem
.mt-6
  margin-bottom: 4rem

.faq-list
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1)

.ghost
  display: block
  background-color: rgba(0, 0, 0, 0.05)

.card
  box-shadow: none
  border-radius: 0
  border-width: 0
  border-color: rgba(176, 176, 176, 0.4)
  border-style: solid
  border-left-width: 1px
  border-right-width: 1px

  &-content
    background-color: #F9F9FB
    padding: 10px 10px 10px 55px

  &-header-title
    display: flex
    align-items: center
    justify-content: space-between
    padding: 15px 20px 15px 0

  &:first-child
    border-top-width: 1px
    border-top-right-radius: 5px
    border-top-left-radius: 5px

  &:last-child
    border-bottom-width: 1px
    border-bottom-right-radius: 5px
    border-bottom-left-radius: 5px
</style>
