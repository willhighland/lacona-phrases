# lacona-phrases

Built-in Lacona phrases, to be used by Addons

Note that many of these phrases do not actually do anything. Their behavior is dependent upon the operating system, so they are designed to be Extended by os-specific phrases (such as [lacona-osx](https://github.com/laconalabs/lacona-osx). In this way, commands can be built with these empty phrases, but they can be extended with OS-specific functionality.

## Installation

Lacona Commands automatically have access to `lacona-phrases`, so it does not
need to be installed. It can be included in your code with

```js
import {Command, URL} from 'lacona-phrases'
// or
var laconaPhrases = require('lacona-phrases')
```

## Results

Some of these phrases (Dates, URLs, Emails, Phone Numbers, etc) have results
that are simple Javascript objects (`Date`, `String`, etc).

Others (Applications, MountedVolumes, etc) export objects with
functions that do things.

```js
/** @jsx createElement */
import { createElement, Phrase } from 'lacona-phrase'
import { Application } from 'lacona-phrases'

class ApplicationObject {
  constructor (name, path) {
    this.name = name
    this.path = path
  }

  launch () { os_open(this.path) }

  activate () { os_open(this.path) }

  close () { os_close_windows(this.path) }

  quit () { os_quit_app(this.path) }

  uninstall () { os_rm(this.path) }
}

const OSXAppPhrase = {
  extends: [Application]

  describe () {
    return (
      <choice>
        <literal text='Calendar' value={new ApplicationObject('Calendar', '/Applications/Calendar.app')} />
        <literal text='Reminders' value={new ApplicationObject('Reminders', '/Applications/Reminders.app')} />
        <literal text='Mail' value={new ApplicationObject('Mail', '/Applications/Mail.app')} />
      </choice>
    )
  }
}
```

In this example, we are creating a new `Phrase` called `OSXApp`, which represents an App on a computer running OSX. Our phrase is just a `<choice />` of `<literal />`s, but the interesting part is the `value` prop. We are returning an instance of `ApplicationObject`.

This instance has a single data property (`path`), and 5 methods defined on its prototype: `launch`, `activate`, `close`, `quit`, and `uninstall`. Each of those is making calls to some OS-specific library (not implemented here).

## Reference

### `Application`

Represents an Application installed on the system.

#### Result

```js
{
  name: string, // the name of the application, for logging
  launch?: () => void, // launch the application
  uninstall?: () => void, // uninstall the application from the system
  //more data properties can be used but will be ignored
}
```

### `PreferencePane`

Represents a system preferences pane, like Control Panel or System Preferences.

#### Result
```js
{
  name: string, // the name of the preference pane, for logging
  open?: () => void, // open the preference pane
  //more data properties can be used but will be ignored
}
```

### `RunningApplication`

Represents an Application that is currently running on the system.

#### Result

```js
{
  name: string, // the name of the application, for logging
  activate?: () => void, // bring the application to the foreground
  hideAll?: () => void, // hides all windows without closing them
  closeAll?: () => void, // close all windows the application
  quit?: () => void, // close all windows of the application, and quit it (if applicable)
  kill?: () => void, // forcably close all windows of the application, and quit it (if applicable)
  //more data properties can be used but will be ignored
}
```

### `ContentArea`

Represents a "Content Area" that is currently open on the system. This could refer to windows or tabs, or even groups of windows or tabs, but can be independently opened, closed, and manipulated.

#### Result

```js
{
  name: String, // the title of the content area, for logging
  activate?: () => void, // bring the content area to the foreground
  close?: () => void, // close the content area
  hide?: () => void, // hide the content area
  minimize?: () => void, // minimize the content area
  maximize?: () => void, // maximize the content area
  fullscreen?: () => void, // make the content area fullscreen
  //more data properties can be used but will be ignored
}
```

### `MountedVolume`

Represents a drive or volume currently mounted to the system (virtual drives, optical media, mounted network drives, etc.)

#### Result
```js
{
  name: string, // the name of the mounted volume, for logging
  open?: () => void, // open the drive in the file browser.
  eject?: () => void, // eject the drive
  //more data properties can be used but will be ignored
}
```

### `ContactCard`

Represents a viewable contact card on the system

#### Result
```js
{
  name: string, // the name of the mounted volume, for logging
  open?: () => void, // open the contact card in the default application
  //more data properties can be used but will be ignored
}
```

### `File`

Represents a file on the local file system

### Result
```
string
```

### `Directory`

Represents a directory on the local file system

### Result
```
string
```

### `EmailAddress`

#### Result

```js
string
```

### `PhoneNumber`

#### Result

```js
string
```


### `URL`

Represents an http or https URL, viewable in a Web Browser

#### Result

```js
string
```

### `Integer`

#### Properties

- `argument: string` - The label text for this phrase. Defaults to number.
- `max: integer` - the highest acceptable integer. No limit by default.
- `min: integer` - the lowest acceptable integer. No limit by default.

#### Result

```js
integer
```

### `Decimal`

#### Properties

- `argument: String` - The label text for this phrase. Defaults to number.
- `max: Number` - the highest acceptable decimal. No limit by default.
- `min: Number` - the lowest acceptable decimal. No limit by default.

#### Result

```js
number
```

### `Ordinal`

Represents an integer ending in "th", "nd", "st", etc.

#### Properties

- `argument: String` - The label text for this phrase. Defaults to number.
- `max: Number` - the highest acceptable integer. No limit by default.
- `min: Number` - the lowest acceptable integer. No limit by default.

#### Result

```js
integer
```

### `DigitString`

Represents a string composed entirely of digits.

#### Properties

- `argument: String` - The label text for this phrase. Defaults to number.
- `max: Number` - the highest acceptable integer. No limit by default.
- `min: Number` - the lowest acceptable integer. Defaults to 0.
- `maxLength: Number` - the highest acceptable string length. No limit by default.
- `minLength: Number` - the lowest acceptable string length. Defaults to 1.

#### Result

```js
string
```

### `String`

Represents a string

#### Result

```js
string
````

### `DateTime`

Represents a Date and a Time

#### Result

```js
date
```

### `Time`

Represents a time

#### Result

```js
{
  hour: integer,
  minute: integer,
  second: integer
}
```

### `Date`

Represents a date with no time value

#### Result

```js
date // time value is always 0:00:00
```

### `Range`

Represents a range of time with a particular start and end point

#### Result

```js
{
  start: date,
  end: date
}
```

### `Day`

Represents a day with no year information

#### Result

```js
{
  month: integer, // 0-indexed
  day: integer // 1-index
}
```

### `Duration`

Represents a duration of time

#### Result

```js
{
  years?: integer,
  months?: integer,
  days?: integer,
  hours?: integer,
  minutes?: integer,
  seconds?: integer
}
```

### `DateDuration`

Represents a duration of time without time components

#### Result

```js
{
  years?: integer,
  months?: integer,
  days?: integer
}
```
### `TimeDuration`

Represents a duration of time without date components

#### Result

```js
{
  hours?: integer,
  minutes?: integer,
  seconds?: integer
}
```