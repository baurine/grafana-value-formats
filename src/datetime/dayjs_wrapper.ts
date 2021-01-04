import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import isoWeek from 'dayjs/plugin/isoWeek'
import duration from 'dayjs/plugin/duration'

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(isoWeek)
dayjs.extend(duration)

export type DateTimeInput = Date | string | number | DateTime;
export type FormatInput = string | undefined;
export type DurationInput = string | number | DateTimeDuration;
export type DurationUnit =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms'
  | 'quarter'
  | 'quarters'
  | 'Q';

export type DateFormatter = (date: DateTimeInput, format?: string) => string;
export interface DateTimeLocale {
  firstDayOfWeek: () => number;
}

export interface DateTimeDuration {
  asHours: () => number;
  hours: () => number;
  minutes: () => number;
  seconds: () => number;
  asSeconds: () => number;
}

export interface DateTime extends Object {
  add: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
  set: (unit: DurationUnit, amount: DateTimeInput) => void;
  diff: (amount: DateTimeInput, unit?: DurationUnit, truncate?: boolean) => number;
  endOf: (unitOfTime: DurationUnit) => DateTime;
  format: (formatInput?: FormatInput) => string;
  fromNow: (withoutSuffix?: boolean) => string;
  from: (formaInput: DateTimeInput) => string;
  isSame: (input?: DateTimeInput, granularity?: DurationUnit) => boolean;
  isValid: () => boolean;
  local: () => DateTime;
  locale: (locale: string) => DateTime;
  startOf: (unitOfTime: DurationUnit) => DateTime;
  subtract: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
  toDate: () => Date;
  toISOString: () => string;
  isoWeekday: (day?: number | string) => number | string;
  valueOf: () => number;
  unix: () => number;
  utc: () => DateTime;
  utcOffset: () => number;
  hour?: () => number;
  minute?: () => number;
}

export const toUtc = (input?: DateTimeInput): DateTime => {
  return dayjs.utc(input as dayjs.ConfigType) as DateTime;
};

export const toDuration = (input?: DurationInput, unit?: DurationUnit): DateTimeDuration => {
  return dayjs.duration(input, unit) as DateTimeDuration;
};

export const dateTime = (input?: DateTimeInput, formatInput?: FormatInput): DateTime => {
  return dayjs(input as dayjs.ConfigType, formatInput) as DateTime;
};
