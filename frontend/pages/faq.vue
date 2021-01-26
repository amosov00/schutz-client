<template lang="pug">
  .container.faq__container
    h1.title.is-2(style="color: #ffffff") {{$t('FAQPage.pageTitle')}}
    .box.mb-5(v-if="isManagerOrHigher")
      base-input.admin_search__bar.light(type="text" v-model="newQuestion.title" :placeholder="$t('FAQPage.title')").mb-5
      base-input.admin_search__bar.light(number-arrows type="number" v-model="newQuestion.order" :placeholder="$t('FAQPage.order')").mb-5
      quill-editor(
        :options="quillOptions"
        v-model="newQuestion.body"
        :placeholder="$t('FAQPage.typeAnswer')"
      ).faq-quill.mb-6
      button.is-primary.button.default-button.mr-2(@click="add") {{$t('add')}}
    .faq-list(v-if="isManagerOrHigher").mb-5
      b-collapse.mb-3.card(animation="slide" v-for="(collapse, index) of list"
        :key="index" :open="getState(index, 'isOpen')"
        @open="doSetState(index, 'isOpen', true)"
        @close="doSetState(index, 'isOpen', false)")
        .card-header(slot="trigger" slot-scope="props" role="button")
          a.card-header-icon
            b-icon(:icon="props.open ? 'menu-down' : 'menu-right'" type="is-black")
          p.card-header-title
            | {{ collapse.title }} <!-- {{ collapse.order }} {{ collapse.state.isOpen }} {{ isEdit }}-->
            button(@click.stop="remove(collapse._id)" style="color: red").button.is-small {{ $t('delete') }}
        .card-content
          .content
            .mb-4(v-if="!getState(index, 'isEdit')")
              .content(v-html="collapse.body")
            .mt-2(v-if="getState(index, 'isEdit')")
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
              .mt-6
                button.button.is-primary.is-small.mr-2(@click="save(index)") {{$t('save')}}
                button.button.is-white.is-small(@click="doSetState(index, 'isEdit', false)") {{$t('cancel')}}
            button.button.is-info.is-small(@click="editMode(index)" v-else) {{ $t('edit') }}
    .faq-list(v-else).mb-5
      b-collapse.card(animation="slide" v-for="(collapse, index) of list"
        :key="index" :open="false")
        .card-header(slot="trigger" slot-scope="props" role="button")
          a.card-header-icon
            b-icon(:icon="props.open ? 'menu-down' : 'menu-right'" type="is-black")
          p.card-header-title {{ collapse.title }}
        .card-content
          .content(v-html="collapse.body")
</template>

<script>
import draggable from 'vuedraggable'
import {quillEditor} from 'vue-quill-editor'
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "users",
  layout: "profile",
  middleware: ["authRequired"],
  components: {draggable, quillEditor},

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

  computed: {
  	...mapGetters({
			getList: 'faq/list',
			getTempModel: 'faq/getTempModel',
			getState: 'faq/getState',
		}),

    isManagerOrHigher() {
      return this.$userIsManager();
    },

    list: {
      get() {
        return this.getList;
      },
      set(value) {
        this.setList(value);
      }
    },
  },

  methods: {
  	...mapActions({
			addFaq: 'faq/add',
			setOrder: 'faq/setOrder',
			saveFaq: 'faq/save',
			removeFaq: 'faq/remove',
		}),
		...mapMutations({
			setList: 'faq/setList',
			setTempModel: 'faq/SET_TEMP_MODEL',
			setTempModelByKey: 'faq/SET_TEMP_MODEL_BY_KEY',
			setState: 'faq/setState',
		}),

    onEditorChange({ quill, html, text }, index) {
      this.doSetTempModel(index, 'body', html)
    },

    onInputChange(index, key, event) {
      this.doSetTempModel(index, key, event.target.value)
    },

    doSetTempModel(index, key, data) {
			this.setTempModelByKey({ index, key, data })
    },

    editMode(index) {
      const collapse = JSON.parse(JSON.stringify(this.getList[index]))

			this.setTempModel({
				index,
				data: {
					body: collapse.body,
					order: collapse.order,
					title: collapse.title,
					_id: collapse._id
				}
			})

      this.doSetState(index, 'isEdit', true)
    },

    toggleCollapse(index, key, data) {
    	this.setState({ index, key, data })
		},

    doSetState(index, key, data) {
			this.setState({ index, key, data })
		},

    async add() {
      const isAdded = await this.addFaq(this.newQuestion);

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

      await this.setOrder({
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
        onConfirm: async () => await this.removeFaq(id),
      })
    },

    async save(index) {
      const edited = this.getTempModel(index)

      const isSaved = await this.saveFaq(JSON.parse(JSON.stringify(edited)))

      if (isSaved) {
        this.editable = {}
        this.isEdit = false
      }
    }
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

.faq-quill
	background-color: #FFFFFF

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
		color: #363636

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
