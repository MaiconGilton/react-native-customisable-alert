import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import AlertManager from "./CustomisableAlertManager";
import Modal from 'react-native-modal';

export function showAlert(...args) {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.showAlert(...args);
  }
}

export function closeAlert() {
  const ref = AlertManager.getDefault();
  if (!!ref) {
    ref.closeAlert();
  }
}

export default class CustomisableAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      title: null,
      btnLabel: null,
      message: null,
      customAlert: null,
      alertType: null,
      onContinuePress: null,
      customIcon: null,
      _dismissable: false,
      _animationIn: null,
      _animationOut: null,
    };
  }

  componentDidMount() {
    AlertManager.register(this);
  }

  componentWillUnmount() {
    AlertManager.unregister(this);
  }

  showAlert = ({
    customIcon, title, message, customAlert,
    alertType, onContinuePress, dismissable,
    animationIn, animationOut, btnLabel } = {}) => {
    this.setState({
      title, message, customAlert, alertType, btnLabel,
      onContinuePress, customIcon, _dismissable: dismissable,
      _animationIn: animationIn, _animationOut: animationOut,
    }, () => this.setState({ visible: true }));
  }

  closeAlert = () => {
    this.setState({ visible: false })
  }

  render() {
    const {
      containerStyle, defaultType = 'error', animationIn,
      animationOut, textStyle, titleStyle, defaultTitle = 'Title',
      btnStyle, btnLeftStyle, btnRightStyle,
      defaultLeftBtnLabel = 'Cancel', defaultRightBtnLabel = 'Ok',
      btnLabelStyle, btnLeftLabelStyle, defaultWarningIcon, defaultSuccessIcon,
      defaultErrorIcon, btnRightLabelStyle, dismissable = false
    } = this.props;

    const {
      customIcon, title, message,
      onContinuePress, visible, customAlert,
      alertType, _dismissable,
      _animationIn, _animationOut, btnLabel
    } = this.state;

    function getImage() {
      if (defaultWarningIcon) {
        return defaultWarningIcon
      } else if (defaultSuccessIcon) {
        return defaultSuccessIcon
      } else if (defaultErrorIcon) {
        return defaultErrorIcon
      } else if (customIcon) {
        return customIcon
      } else {
        return <Image
          source={
            type === 'success'
              ? require('./icons/success.png')
              : type === 'warning'
                ? require('./icons/warning.png')
                : require('./icons/error.png')
          }
          style={styles.img}
        />
      }
    }

    const type = alertType || defaultType
    const ___title = title || defaultTitle
    const ___dismissable = _dismissable || dismissable
    const ___animationIne = _animationIn || animationIn
    const ___animationOut = _animationOut || animationOut

    return (
      <Modal
        animationIn={___animationIne}
        animationOut={___animationOut}
        isVisible={visible}
        useNativeDriver
        supportedOrientations={['landscape', 'portrait']}
        deviceHeight={10000}
        style={{ margin: 0 }}
        onBackdropPress={() => ___dismissable ? this.closeAlert() : {}}
      >
        <View style={{ ...styles.container, ...containerStyle }}>

          {
            type === 'custom' ? (customAlert || <Text onPress={this.closeAlert}>Custom alertTypes needs a customAlert prop! Click here to close</Text>) :

              <View style={styles.content}>
                <View style={styles.img_container}>
                  {getImage()}
                </View>

                <Text style={{ ...styles.title, ...titleStyle }}>{___title}</Text>

                {!!message && <Text style={{ ...styles.text, ...textStyle }}>{message}</Text>}

                <View style={styles.actions}>
                  <TouchableOpacity onPress={this.closeAlert}
                    style={{ ...styles.btn, ...btnStyle, ...btnLeftStyle }}>
                    <Text style={{ ...btnLabelStyle, ...btnLeftLabelStyle }}>{btnLabel || (type === 'warning' ? defaultLeftBtnLabel : 'Ok')}</Text>
                  </TouchableOpacity>

                  {
                    type === 'warning' &&
                    <TouchableOpacity
                      onPress={onContinuePress}
                      style={{ ...styles.btn, ...btnStyle, ...btnRightStyle }}>
                      <Text style={{ ...btnLabelStyle, ...btnRightLabelStyle }}>{defaultRightBtnLabel}</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
          }

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  img_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    minWidth: 120,
    backgroundColor: 'black',
    padding: 10
  },
});