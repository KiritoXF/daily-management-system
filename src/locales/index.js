import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
  getToken
} from '../utils/auth'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh_CN'

const locales = {
  zh_CN: require('./zh_CN.json'),
  en: require('./en.json'),
  ja: require('./ja.json')
}

const i18n = new VueI18n({
  locale: getToken('lang') || DEFAULT_LANG,
  messages: locales,
})
 
window.i18n = i18n
export default i18n