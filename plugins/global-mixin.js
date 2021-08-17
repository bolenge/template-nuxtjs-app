import Vue from 'vue'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import dataFormat from 'date-format'

if (!Vue.__global__) {
  Vue.__global__ = true
  Vue.mixin({
    data () {
      return {
        API_BASE_URL: null,
        DEFAULT_USER_AVATAR: null,
        BASE_PATH_USER_PICTURES: null,
        APP_NAME: null
      }
    },
    computed: {
      _moment () {
        moment.locale('fr')
        return moment
      },
      ...mapState({
        _now: state => state.system.now
      })
    },
    beforeMount () {
      if (this.$nuxt) {
        this.API_BASE_URL = this.$nuxt.context.env.API_BASE_URL
        this.DEFAULT_USER_AVATAR = this.$nuxt.context.env.DEFAULT_USER_AVATAR
        this.BASE_PATH_USER_PICTURES = this.$nuxt.context.env.BASE_PATH_USER_PICTURES
        this.APP_NAME = this.$nuxt.context.env.APP_NAME
      }
    },
    methods: {
      objGet (obj, path) {
        try {
          // eslint-disable-next-line no-new-func
          return new Function('_', 'return _.' + path)(obj)
        } catch (error) {
          return null
        }
      },
      passwordGenerated () {
        const lengthPassword = 10
        const rulesPasswordGenerated = [
          {
            name: 'Lowercase',
            value: 'abcdefghijklmnopqrstuvwxyz',
            checked: true
          },
          {
            name: 'Uppercase',
            value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            checked: true
          },
          {
            name: 'Numbers',
            value: '0123456789',
            checked: true
          },
          {
            name: 'Special rulesPasswordGenerated',
            value: '_-+=)(*&^%$#@!`~',
            checked: true
          }
        ]
        let result = ''
        let charactersVal = ''
        
        for (const iterator of rulesPasswordGenerated) {
          if (iterator.checked) {
            charactersVal += iterator.value
          }
        }

        for (let i = 0; i < lengthPassword; i++) {
          result += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length))
        }
        return result
      },
      formatDate(format, date) {
        return dataFormat(format, new Date(date))
      },
      numberIsPair(nb) {
        return (nb % 2) === 0
      },
      random(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
      }
    }
  }) // Set up your mixin then
}
