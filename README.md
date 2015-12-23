# lacona-phrase-system

Lacona Phrases for representing various system states (to be extended).

Note that these phrases do not actually do anything. Their behavior is dependent upon the operating system, so they are designed to be Extended by os-specific phrases. In this way, commands can be built with these phrases, but they can be extended with OS-specific functionality.

## Installation

```sh
npm install lacona-phrase-system
```

## Results

The Results of these phrases work a bit differently than most. Rather than returning basic Javascript objects (like strings) they are designed to return objects that have prototype functions that do things. For example, let's look at a hypotehtical

```js
/** @jsx createElement */
import { createElement, Phrase } from 'lacona-phrase'
import { Application as SystemApplication } from 'lacona-phrase-system'

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

export class OSXApp extends Phrase {
  static extends = [SystemApplication]

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

Both of these features are important, because this means that instances of `OSXApp` can be compared using `_.isEqual`. This means that if we put our `<OSXApp />` phrase within a `<repeat />` phrase, the `unique` prop will work property (as that check is done using `_.isEqual`). See the code below for more explanation

```js
// First, let's try just creating a basic object, with a property and a function that references it
function createBasicObj (data) {
  return {
    data,
    func() {return this.data}
  }
}

const basicObj = createBasicObj(1)
basicObj.func() // 1, works property
_.isEqual(basicObj, createBasicObj(1)) // false, because the two functions are different objects

// But if we use a class (and therefore a prototype)
class PrototypeObj {
  constructor (data) { this.data = data }
  func () { return this.data }
}

function createPrototypeObj (data) {
  return new PrototypeObj(data)
}

const prototypeObj = createPrototypeObj(1)
prototypeObj.func() // 1
_.isEqual(prototypeObj, createPrototypeObj(1)) // true,
 // because the data is the same and
 // the functions are defined on the prototype and not compared
```

## Reference

### `Application`

Represents an Application installed on the system.

### Result

```js
{
  name: `String` - the name of the application, for logging
  //more data properties can be used but will be ignored
}
```

`prototype` can contain (all are optional):

- `launch()` - launch the application
- `uninstall()` - remove the application from the system

### `PreferencePane`

Represents a system preferences pane, like Control Panel or System Preferences.

### Result
```js
{
  name: `String` - the name of the preference pane, for logging
  //more data properties can be used but will be ignored
}
```

`prototype` can contain (all are optional)

- `open()` - open the preference pane

### `RunningApplication`

Represents an Application that is currently running on the system.

### Result

```js
{
  name: `String` - the name of the application, for logging
  //more data properties can be used but will be ignored
}
```

`prototype` can contain (all are optional):

- `activate()` - bring the application to the foreground
- `hideAll()` - hides all windows without closing them
- `closeAll()` - close all windows the application
- `quit()` - close all windows of the application, and quit it (if applicable)
- `kill()` - forcably close all windows of the application, and quit it (if applicable)

### `OpenContentArea`

Represents a "Content Area" that is currently open on the system. This could refer to windows or tabs, or even groups of windows or tabs, but can be independently opened, closed, and manipulated.

### Result

```js
{
  name: `String` - the title of the content area, for logging
  //more data properties can be used but will be ignored
}
```

`prototype` can contain (all are optional):

- `activate()` - bring the content area to the foreground
- `close()` - close the content area
- `hide()` - hide the content area
- `minimize()` - minimize the content area
- `maximize()` - maximize the content area
- `fullscreen()` - make the content area fullscreen

### `MountedVolume`

Represents a drive or volume currently mounted to the system (virtual drives, optical media, mounted network drives, etc.)

### Resul
```js
{
  name: `String` - the name of the mounted volume, for logging
  //more data properties can be used but will be ignored
}
```

`prototype` can contain (all are optional):

- `open()` - if the drive has a default action, perform it. Otherwise, open the drive in the file browser.
- `explore()` - open the drive in the file browser
- `unmount()` - unmount or eject the drive
