<h1 align="center" style="text-align: center;">react-native-customisable-alert</h1>

<p align="center" style="font-size: 1.2rem;">
   This React Native small an simple library was built in top of react-native-modal to help you with easily customisable alerts. The catch of this library is that you can call this alert from anywhere in your code without extra imports and variables to control it, which means a CLEANER CODE 😉!!!<br/><br />
  <img src="https://i.imgur.com/o9BIqvT.gif" alt="Demo of react-native-customisable-alert" width="70%" style="border: 0; width: 70%; min-width: 240px; max-width: 300px;" />
</p>

<p align="center" style="font-size: 1.2rem;">
  <a href="https://npmjs.org/package/react-native-customisable-alert" title="View this project on npm">
    <img src="http://img.shields.io/npm/v/react-native-customisable-alert.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://npmjs.org/package/react-native-customisable-alert" title="View this project on npm">
    <img src="http://img.shields.io/npm/dm/react-native-customisable-alert.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://npmjs.org/package/react-native-customisable-alert" title="View this project on npm">
    <img src="http://img.shields.io/npm/l/react-native-customisable-alert.svg?style=flat-square" alt="npm licence" />
  </a>
</p>

## Installation

To install the latest version of `react-native-customisable-alert` you only need to run:

```bash
npm install --save react-native-customisable-alert
```

or

```bash
yarn add react-native-customisable-alert
```

## Try it out

You can find the examples above on [src/examples](src/examples.js)

## Basic Usage

The CustomisableAlert component it's build to a global use, so you have to instance this component once in your App.js:

```jsx
import React from "react";
import { View } from "react-native";
import CustomisableAlert from "react-native-customisable-alert";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        ... all your stuff
        <CustomisableAlert
          titleStyle={{
            fontSize: 18,
            fontWeight: "bold"
          }}
        />
      </View>
    );
  }
}
```

After that you only need to call `showAlert` or `closeAlert` methods from anywhere in your app.

### Show some alert

```jsx
import React from "react";
import { View, Button } from "react-native";

import { showAlert } from "react-native-customisable-alert";

class OtherScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => {
            showAlert({
              title="Are you sure?"
              message: "All your files will be deleted!",
              alertType: 'warning',
              onContinuePress: () => console.log('files deleted!'),
            });
          }}
        />
      </View>
    );
  }
}
```

## Props

You can set a default style for your alerts with the following:

| Property             | Type                                 | Description                                                    |
| -------------------- | ------------------------------------ | -------------------------------------------------------------- |
| defaultTitle         | `string`                             | Set a default title for all alerts you call, default=`'Title'` |
| containerStyle       | `ViewStyle`                          | Style for the alert wrapper                                    |
| titleStyle           | `TextStyle`                          | Style for the title                                            |
| textStyle            | `TextStyle`                          | Style for the message                                          |
| btnStyle             | `TouchableOpacityProps`              | Style for all buttons                                          |
| btnLeftStyle         | `TouchableOpacityProps`              | Style for the left button                                      |
| btnRightStyle        | `TouchableOpacityProps`              | Style for the right button                                     |
| btnLabelStyle        | `TextStyle`                          | Style for the label of the buttons                             |
| btnLeftLabelStyle    | `TextStyle`                          | Style for the left label button                                |
| btnRightLabelStyle   | `TextStyle`                          | Style for the right label button                               |
| defaultLeftBtnLabel  | `string`                             | Set a default label for the left button, default=`'Cancel'`    |
| defaultRightBtnLabel | `string`                             | Set a default label for the right button, default=`'Ok'`       |
| defaultType          | `error | success | warning | custom` | Set a default type for your alert, default=`'error'`           |
| animationIn          | `Animation`                          | Set a default entrance animation for your alert                |
| animationOut         | `Animation`                          | Set a default exit animation for your alert                    |
| dismissable          | `boolean`                            | If true alert auto dismiss when touch outside, default=`false` |

## ShowAlert Object

When you call `showAlert` you can pass some custom the following attributes to customize your alert:

| Property        | Type                                         | Description                                                                                          |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| title           | `string`                                     | The title of your alert                                                                              |
| message         | `string`                                     | The message of your alert                                                                            |
| btnLabel        | `string`                                     | Button label for the one button alert (alertType = "error" or "success"), default=`'Ok'`             |
| customAlert     | `React.ReactNode`                            | Define a custom alert (this will replace the whole thing!)                                           |
| customIcon      | `React.ReactNode`                            | Set a custom icon for your alert                                                                     |
| alertType       | `"error" | "success" | "warning" | "custom"` | Define the type of the alert                                                                         |
| onContinuePress | `(): void`                                   | Trigger action on right button pressed(only of AlertType='warning')                                  |
| animationIn     | `Animation`                                  | Overhides global animation for an entrance animation                                                 |
| animationOut    | `Animation`                                  | Overhides global animation for an exit animation                                                     |
| dismissable     | `boolean`                                    | Overhides global dismissable behavior. If true it closes the alert when touch outside, default false |

<!-- ## Message Object

If you need to handle the press/touch event in your message, you could use the `onPress` attribute to take some action:

```javascript
showMessage({
  message: "My message title",
  description: "My message description",
  type: "success",
  onPress: () => {
    /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
  }
});
``` -->

## License

[MIT](./LICENSE)
