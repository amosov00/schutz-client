import {ToastProgrammatic as Toast} from 'buefy'

export const actions = {
  async prolongContract({}, {userId, data}) {
    return await this.$axios.post(`/admin/users/${userId}/deposits/prolong/`, data).then(resp => {
      return true
    }).catch(err => {
      Toast.open({message: err, type: 'is-danger'})
    })
  },
};

