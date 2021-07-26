<h1 align="center" style="text-align: center;">react-native-customisable-alert</h1>

<p align="center" style="font-size: 1.2rem;">
   This React Native simple library was built in top of react-native-modal to help you to easily customise your alerts. It works like a built in React Native Alert component but this is highly customisable. The catch of this library is that you can call it from anywhere in your code without extra components imports and variables to control it, which means a CLEANER CODE 😉!!!<br/><br />
  <img src="https://i.imgur.com/o9BIqvT.gif" alt="Demo of react-native-customisable-alert" width="50%" style="border: 0; width: 50%; min-width: 200px; max-width: 200px;" />
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

This component was meant to be used globally, so you only need to import it once in your App.js:

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

After that all you need is to call `showAlert` or `closeAlert` methods from anywhere in your app.

### Show some alert

To fire an alert just call `showAlert(obj)` as below:

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
              onPress: () => console.log('files deleted!'),
            });
          }}
        />
      </View>
    );
  }
}
```

When you call `showAlert` you should pass some attributes to customize your alert:

| Property     | Type                                      | Description                                                                                          |
| ------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| title        | `string`                                  | The title of your alert                                                                              |
| message      | `string`                                  | The message of your alert                                                                            |
| btnLabel     | `string`                                  | Button label for the one button alert (`'error'` or `success'` alertTypes), default=`'Ok'`           |
| leftBtnLabel | `string`                                  | Left button label for two buttons alerts (`'warning'` alertTypes), default=`'Cancel'`                |
| customAlert  | `React.Component`                         | Define a custom alert (this will replace the whole thing!)                                           |
| customIcon   | `React.Component`                         | Set a custom icon for your alert. If you want no icon in your alert use customIcon:`'none'`          |
| alertType    | `'error', 'success', 'warning', 'custom'` | Define the type of the alert                                                                         |
| onPress      | `(): void`                                | Button pressed callback (one button alerts or right button in a two buttons alerts)                  |
| onDismiss    | `(): void`                                | Close alert button callback (left button in a two buttons alerts)                                    |
| animationIn  | `Animation`                               | Overhides global animation for an entrance animation                                                 |
| animationOut | `Animation`                               | Overhides global animation for an exit animation                                                     |
| dismissable  | `boolean`                                 | Overhides global dismissable behavior. If true it closes the alert when touch outside, default false |
| modalProps   | `ModalProps`                              | Overhides global modal props from react-native-modal                                                 |

All alerts are set to close automatically when any button pressed, but for custom and warning alertTypes you need close it programatically as the example below:

```jsx
import React from "react";
import { View, Button } from "react-native";

import { showAlert, closeAlert } from "react-native-customisable-alert";

class OtherScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button
                    onPress={() => {
                        showAlert({
                            customAlert: (
                                <View>
                                    <Text>Could you tell us your name?</Text>
                                    <TextInput />
                                    <View>
                                        <Button
                                            title="Cancel"
                                            onPress={() => closeAlert()}
                                        />
                                        <Button
                                            title="Send"
                                            onPress={() => {}}
                                        />
                                    </View>
                                </View>
                            )
                        });
                    }}
                />
            </View>
        );
    }
}
```

## Global Props

You can set a default style for all your alerts with the following:

| Property             | Type                                         | Description                                                             |
| -------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| defaultTitle         | `string`                                     | Set a default title for all alerts you call, default=`'Title'`          |
| backdropStyle        | `ViewStyle`                                  | Style for the alert backdrop                                            |
| alertContainerStyle  | `ViewStyle`                                  | Style for the alert container                                           |
| titleStyle           | `TextStyle`                                  | Style for the title                                                     |
| textStyle            | `TextStyle`                                  | Style for the message                                                   |
| btnStyle             | `TouchableOpacityProps`                      | Style for all buttons or one button alert type                          |
| btnLeftStyle         | `TouchableOpacityProps`                      | Style for the left button (`'warning'` alertTypes), overrides btnStyle  |
| btnRightStyle        | `TouchableOpacityProps`                      | Style for the right button (`'warning'` alertTypes), overrides btnStyle |
| btnLabelStyle        | `TextStyle`                                  | Style for the label of the buttons                                      |
| btnLeftLabelStyle    | `TextStyle`                                  | Style for the left label button                                         |
| btnRightLabelStyle   | `TextStyle`                                  | Style for the right label button                                        |
| defaultLeftBtnLabel  | `string`                                     | Set a default label for the left button, default=`'Cancel'`             |
| defaultRightBtnLabel | `string`                                     | Set a default label for the right button, default=`'Ok'`                |
| defaultType          | `'error' | 'success' | 'warning' | 'custom'` | Set a default type for your alert, default=`'error'`                    |
| animationIn          | `Animation`                                  | Set a default entrance animation for your alert                         |
| animationOut         | `Animation`                                  | Set a default exit animation for your alert                             |
| dismissable          | `boolean`                                    | If true alert auto dismiss when touch outside, default=`false`          |
| defaultWarningIcon   | `React.Component`                            | Set a default icon for you warning messages                             |
| defaultSuccessIcon   | `React.Component`                            | Set a default icon for you success messages                             |
| defaultErrorIcon     | `React.Component`                            | Set a default icon for you error messages                               |
| modalProps           | `ModalProps`                                 | Set a global modal props from react-native-modal                        |

## License

[MIT](./LICENSE)
