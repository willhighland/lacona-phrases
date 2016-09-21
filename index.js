const email = require('elliptical-email')
const phone = require('elliptical-phone')
const url = require('elliptical-url')
const datetime = require('elliptical-datetime')
const number = require('elliptical-number')
const string = require('elliptical-string')

function describe () {
  return null
}

function commandMapResult (result, element) {
  return {result: result, element: element}
}

module.exports = {
  Command: {
    id: 'lacona-phrases:Command',
    describe: describe,
    mapResult: commandMapResult
  },
  BooleanSetting: {
    id: 'lacona-phrases:BooleanSetting',
    describe: describe,
    mapResult: commandMapResult
  },
  BooleanCommand: {
    id: 'lacona-phrases:BooleanCommand',
    describe: describe,
    mapResult: commandMapResult
  },

  Application: {
    id: 'lacona-phrases:Application',
    describe: describe
  },
  PreferencePane: {
    id: 'lacona-phrases:PreferencePane',
    describe: describe
  },
  RunningApplication: {
    id: 'lacona-phrases:RunningApplication',
    describe: describe
  },
  ContentArea: {
    id: 'lacona-phrases:ContentArea',
    describe: describe
  },
  MountedVolume: {
    id: 'lacona-phrases:MountedVolume',
    describe: describe
  },
  File: {
    id: 'lacona-phrases:File',
    describe: describe
  },
  Directory: {
    id: 'lacona-phrases:Directory',
    describe: describe
  },
  ContactCard: {
    id: 'lacona-phrases:ContactCard',
    describe: describe
  },
  DictionaryWord: {
    id: 'lacona-phrases:DictionaryWord',
    describe: describe
  },
  EmailAddress: email.EmailAddress,
  PhoneNumber: phone.PhoneNumber,
  URL: url.URL,
  Integer: number.Integer,
  Decimal: number.Decimal,
  Ordinal: number.Ordinal,
  DigitString: number.DigitString,
  String: string.String,
  DateTime: datetime.DateTime,
  Date: datetime.Date,
  Time: datetime.Time,
  Range: datetime.Range,
  Day: datetime.Day,
  Duration: datetime.Duration,
  TimeDuration: datetime.TimeDuration,
  DateDuration: datetime.DateDuration
}