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

})

export const mutations = {
}

export const actions = {
  store ({ dispatch }, { entity, api, model }) {
    const formData = serialize(entity)

    return new Promise(
      (resolve, reject) => {
        this.$axios.post(`${api}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
            dispatch(`${model}/load`, true, { root: true })
          })
          .catch((error) => {
            reject(error)
          })
      }
    )
  },

  update ({ dispatch }, { entity, api, model }) {
    
    const formData = serialize(entity)
    formData.append('_method', 'PUT')

    return new Promise(
      (resolve, reject) => {
        this.$axios.post(`${api}/${entity.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
            dispatch(`${model}/load`, true, { root: true })
          })
          .catch((error) => {
            console.log('Store crud error', error);
            reject(error)
          })
      }
    )
  },
  delete({ dispatch }, { entity, api, model }) {
    this.$axios.delete(`${api}/${entity.id}`)
      .then(({ data }) => {
        if (data.state) {
          dispatch(`${model}/load`, {}, { root: true })

          this.$swal({
            title: "Suppression",
            text: 'Operation effectuée avec succès',
            icon: "success",
            confirmButtonText: 'Ok'
          })
        }
      })
  }
}
