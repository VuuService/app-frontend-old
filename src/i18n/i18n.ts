import { createI18n } from 'vue-i18n'
import { useBrowserLocale } from '@/utils/BrowserLocale'
import en from './en.json'
import tr from './tr.json'

const messages = {
  en,
  tr
}

export type MessageLanguages = keyof typeof messages
// Type-define 'en' as the master schema for the resource
export type MessageSchema = (typeof messages)['en']

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

let defaultLocale = 'en'
const localStorageDefaultLocale = localStorage.getItem('locale')
if (localStorageDefaultLocale) {
  defaultLocale = localStorageDefaultLocale.toString()
} else {
  const locales = useBrowserLocale().locales()
  if (locales) {
    for (const locale of locales) {
      if (Object.keys(messages).includes(locale)) {
        defaultLocale = locale
        break
      }
    }
  }
}
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  globalInjection: true,
  messages: messages /*
  datetimeFormats: datetimeFormats,
  numberFormats: numberFormats*/
})
