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
      message: null,
      customAlert: null,
      alertType: this.props.defaultType,
      onContinuePress: null,
      customIcon: null
    };
  }

  componentDidMount() {
    AlertManager.register(this);
  }

  componentWillUnmount() {
    AlertManager.unregister(this);
  }

  showAlert = ({ customIcon, title, message, customAlert, alertType, onContinuePress }) => {
    this.setState({
      title: title || this.props.defaultTitle,
      message,
      customAlert,
      alertType,
      onContinuePress,
      customIcon
    }, () => this.setState({ visible: true }));
  }

  closeAlert = () => {
    this.setState({ visible: false })
  }

  render() {
    const {
      containerStyle,
      defaultType,
      animationIn,
      animationOut,
      textStyle,
      titleStyle,
      btnStyle,
      btnLeftStyle,
      btnRightStyle,
      defaultLeftBtnLabel,
      defaultRightBtnLabel,
      btnLabelStyle,
      btnLeftLabelStyle,
      btnRightLabelStyle
    } = this.props;
    const { customIcon, title, message, onContinuePress, visible, customAlert, alertType } = this.state;
    const type = alertType || defaultType

    return (
      <Modal
        animationIn={animationIn}
        animationOut={animationOut}
        isVisible={visible}
        useNativeDriver
        deviceHeight={10000}
        style={{ margin: 0 }}
      >
        <View style={{ ...styles.container, ...containerStyle }}>

          <View style={styles.content}>

            {
              type === 'custom' ? (customAlert || <Text onPress={() => this.setState({ visible: false })}>Custom alertTypes needs a customAlert prop! Click here to close</Text>) :
                <>
                  <View style={styles.img_container}>
                    {customIcon ||
                      <Image
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
                  </View>

                  <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>

                  {!!message && <Text style={{ ...styles.text, ...textStyle }}>{message}</Text>}

                  <View style={styles.actions}>
                    <TouchableOpacity onPress={this.closeAlert}
                      style={{ ...styles.btn, ...btnStyle, ...btnLeftStyle }}>
                      <Text style={{ ...btnLabelStyle, ...btnLeftLabelStyle }}>{defaultLeftBtnLabel}</Text>
                    </TouchableOpacity>

                    {
                      type === 'warning' &&
                      <TouchableOpacity
                        onPress={async () => { onContinuePress(); this.setState({ visible: false }) }}
                        style={{ ...styles.btn, ...btnStyle, ...btnRightStyle }}>
                        <Text style={{ ...btnLabelStyle, ...btnRightLabelStyle }}>{defaultRightBtnLabel}</Text>
                      </TouchableOpacity>
                    }
                  </View>
                </>
            }

          </View>

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