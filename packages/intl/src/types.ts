import {
  IntlMessageFormat,
  Formats,
  PrimitiveType,
  FormatXMLElementFn,
  FormatError,
  Options as IntlMessageFormatOptions,
} from 'intl-messageformat'
import {DateTimeFormat} from '@formatjs/ecma402-abstract'
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser'
import IntlListFormat, {IntlListFormatOptions} from '@formatjs/intl-listformat'
import {DisplayNames, DisplayNamesOptions} from '@formatjs/intl-displaynames'
import {
  MissingTranslationError,
  MessageFormatError,
  MissingDataError,
  InvalidConfigError,
  UnsupportedFormatterError,
} from './error'
import {DEFAULT_INTL_CONFIG} from './utils'
import {
  DateTimeFormatOptions,
  NumberFormatOptions,
} from '@formatjs/ecma402-abstract'

export type OnErrorFn = (
  err:
    | MissingTranslationError
    | MessageFormatError
    | MissingDataError
    | InvalidConfigError
    | UnsupportedFormatterError
    | FormatError
) => void

/**
 * Config for intl object.
 * Generic type T is the type of potential rich text element. For example:
 * With React, T would be React.ReactNode
 */
export interface IntlConfig<T = string> {
  locale: string
  timeZone?: string
  formats: CustomFormats
  messages: Record<string, string> | Record<string, MessageFormatElement[]>
  defaultLocale: string
  defaultFormats: CustomFormats
  defaultRichTextElements?: Record<string, FormatXMLElementFn<T>>
  onError: OnErrorFn
}

export interface CustomFormats extends Partial<Formats> {
  relative?: Record<string, Intl.RelativeTimeFormatOptions>
}

export interface CustomFormatConfig {
  format?: string
}

export type FormatDateOptions = Exclude<
  DateTimeFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig
export type FormatNumberOptions = Exclude<
  NumberFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig
export type FormatRelativeTimeOptions = Exclude<
  Intl.RelativeTimeFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig
export type FormatPluralOptions = Exclude<
  Intl.PluralRulesOptions,
  'localeMatcher'
> &
  CustomFormatConfig

export type FormatListOptions = Exclude<IntlListFormatOptions, 'localeMatcher'>

export type FormatDisplayNameOptions = Exclude<
  DisplayNamesOptions,
  'localeMatcher'
>

export interface IntlFormatters<T = any, R = T> {
  formatDateTimeRange(
    from: Parameters<DateTimeFormat['formatRange']>[0],
    to: Parameters<DateTimeFormat['formatRange']>[1],
    opts?: FormatDateOptions
  ): string
  formatDate(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): string
  formatTime(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): string
  formatDateToParts(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): Intl.DateTimeFormatPart[]
  formatTimeToParts(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): Intl.DateTimeFormatPart[]
  formatRelativeTime(
    value: Parameters<Intl.RelativeTimeFormat['format']>[0],
    unit?: Parameters<Intl.RelativeTimeFormat['format']>[1],
    opts?: FormatRelativeTimeOptions
  ): string
  formatNumber(
    value: Parameters<Intl.NumberFormat['format']>[0],
    opts?: FormatNumberOptions
  ): string
  formatNumberToParts(
    value: Parameters<Intl.NumberFormat['format']>[0],
    opts?: FormatNumberOptions
  ): Intl.NumberFormatPart[]
  formatPlural(
    value: Parameters<Intl.PluralRules['select']>[0],
    opts?: FormatPluralOptions
  ): ReturnType<Intl.PluralRules['select']>
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
    opts?: IntlMessageFormatOptions
  ): string
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T, R>>,
    opts?: IntlMessageFormatOptions
  ): R
  formatList(values: Array<string>, opts?: FormatListOptions): string
  formatList(
    values: Array<string | T>,
    opts?: FormatListOptions
  ): T | string | Array<string | T>
  formatDisplayName(
    value: Parameters<DisplayNames['of']>[0],
    opts: FormatDisplayNameOptions
  ): string | undefined
}

export interface Formatters {
  getDateTimeFormat(
    ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
  ): DateTimeFormat
  getNumberFormat(
    ...args: ConstructorParameters<typeof Intl.NumberFormat>
  ): Intl.NumberFormat
  getMessageFormat(
    ...args: ConstructorParameters<typeof IntlMessageFormat>
  ): IntlMessageFormat
  getRelativeTimeFormat(
    ...args: ConstructorParameters<typeof Intl.RelativeTimeFormat>
  ): Intl.RelativeTimeFormat
  getPluralRules(
    ...args: ConstructorParameters<typeof Intl.PluralRules>
  ): Intl.PluralRules
  getListFormat(
    ...args: ConstructorParameters<typeof IntlListFormat>
  ): IntlListFormat
  getDisplayNames(
    ...args: ConstructorParameters<typeof DisplayNames>
  ): DisplayNames
}

export interface IntlShape<T = string> extends IntlConfig<T>, IntlFormatters {
  formatters: Formatters
}

export interface IntlCache {
  dateTime: Record<string, DateTimeFormat>
  number: Record<string, Intl.NumberFormat>
  message: Record<string, IntlMessageFormat>
  relativeTime: Record<string, Intl.RelativeTimeFormat>
  pluralRules: Record<string, Intl.PluralRules>
  list: Record<string, IntlListFormat>
  displayNames: Record<string, DisplayNames>
}

export interface MessageDescriptor {
  id?: string | number
  description?: string | object
  defaultMessage?: string | MessageFormatElement[]
}

export type OptionalIntlConfig<T = string> = Omit<
  IntlConfig<T>,
  keyof typeof DEFAULT_INTL_CONFIG
> &
  Partial<typeof DEFAULT_INTL_CONFIG>
