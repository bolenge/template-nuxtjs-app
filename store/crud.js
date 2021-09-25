import { serialize } from 'object-to-formdata'

export function objectToFormData (entity) {
  const formData = new FormData()
  for (const key in entity) {
    if (Array.isArray(entity[key])) {
      entity[key].forEach((val) => {
        formData.append(`${key}[]`, val)
      })
    } else if (typeof (entity[key]) === 'object' && !(entity[key] instanceof File)) {
      for (const index in entity[key]) {
        formData.append(`${key}[${index}]`, entity[key][index])
      }
    } else {
      formData.append(key, entity[key])
    }
  }
  return formData
}

export const state = () => ({
  loading: false
})

export const mutations = {
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  store ({ dispatch }, { entity, api, model, actionLoad }) {
    const formData = serialize(entity)

    actionLoad = actionLoad || 'load'

    return new Promise(
      (resolve, reject) => {
        this.$axios.post(`${api}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
            dispatch(`${model}/${actionLoad}`, true, { root: true })
          })
          .catch((error) => {
            reject(error)
          })
      }
    )
  },

  update ({ dispatch, commit }, { entity, api, model, actionLoad }) {
    commit('SET_LOADING', true)

    const formData = serialize(entity)
    formData.append('_method', 'PUT')
    actionLoad = actionLoad || 'load'

    return new Promise(
      (resolve, reject) => {
        this.$axios.post(`${api}/${entity.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
            dispatch(`${model}/${actionLoad}`, true, { root: true })
          })
          .catch((error) => {
            if (error.response && (error.response.status === 422 || error.response.status === 401)) {
              if (error.response.data) {
                const data = error.response.data
                
                this.$swal({
                  title: "Erreur",
                  text: data.message,
                  icon: "warning",
                  buttons: true,
                  confirmButtonText: 'Ok'
                })
              }else {
                this.$toast.error('Une erreur est survenue, réessayez svp !')
              }
            }else {
              this.$toast.error('Une erreur est survenue, réessayez svp !')
            }

            commit('SET_LOADING', false)
            
            reject(error)
          })
      }
    )
  },
  delete({ dispatch }, { entity, api, model, actionLoad }) {
    actionLoad = actionLoad || 'load'

    this.$axios.delete(`${api}/${entity.id}`)
      .then(({ data }) => {
        if (data.state) {
          dispatch(`${model}/${actionLoad}`, {}, { root: true })

          this.$swal({
            title: "Suppression",
            text: 'Opération effectuée avec succès',
            icon: "success",
            confirmButtonText: 'Ok'
          })
        }
      })
  }
}
