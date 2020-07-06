import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from "react-native";
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
            visible: false, title: null, btnLabel: null,
            leftBtnLabel: null, message: null, customAlert: null,
            alertType: null, onPress: null, onDismiss: null,
            customIcon: null, _dismissable: false, _animationIn: null,
            _animationOut: null, modalProps: {},
            screenHeight: Dimensions.get('screen').height,
            screenWidth: Dimensions.get('screen').width,
        };
    }

    componentDidMount() {
        AlertManager.register(this);
        Dimensions.addEventListener('change', ({ screen }) => {
            this.setState({
                screenHeight: screen.height,
                screenWidth: screen.width
            })
        })
    }

    componentWillUnmount() {
        AlertManager.unregister(this);
        Dimensions.removeEventListener('change')
    }

    showAlert = ({
        customIcon, title, message, customAlert,
        alertType, onPress, dismissable, onDismiss, modalProps,
        animationIn, animationOut, btnLabel, leftBtnLabel } = {}) => {
        this.setState({
            title, message, customAlert, alertType, btnLabel, leftBtnLabel,
            onPress, onDismiss, customIcon, _dismissable: dismissable,
            _animationIn: animationIn, _animationOut: animationOut, modalProps,
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
            defaultErrorIcon, btnRightLabelStyle, dismissable = false, modalProps = {}
        } = this.props;

        const {
            customIcon, title, message,
            onPress, onDismiss, visible, customAlert,
            alertType, _dismissable, leftBtnLabel,
            _animationIn, _animationOut, btnLabel, screenHeight, screenWidth
        } = this.state;

        function getImage() {
            if (customIcon) {
                if (customIcon === 'none') return null
                return customIcon
            } else if (defaultWarningIcon) {
                return defaultWarningIcon
            } else if (defaultSuccessIcon) {
                return defaultSuccessIcon
            } else if (defaultErrorIcon) {
                return defaultErrorIcon
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

        const centerBtnStyle = { ...styles.btn, ...btnStyle }
        const leftBtnStyle = { ...centerBtnStyle, ...btnLeftStyle }
        const centerOrLeftBtnStyle = type === 'warning'
            ? leftBtnStyle
            : centerBtnStyle

        return (
            <Modal
                {...{ ...modalProps, ...this.state.modalProps }}
                animationIn={___animationIne}
                animationOut={___animationOut}
                isVisible={visible}
                useNativeDriver
                supportedOrientations={['landscape', 'portrait']}
                deviceHeight={screenHeight}
                deviceWidth={screenWidth}
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
                                    <TouchableOpacity
                                        style={centerOrLeftBtnStyle}
                                        onPress={
                                            type === 'warning'
                                                ? () => { onDismiss && onDismiss(); this.closeAlert() }
                                                : () => { onPress && onPress(); this.closeAlert() }
                                        }>
                                        <Text style={{ ...styles.btnText, ...btnLabelStyle, ...btnLeftLabelStyle }}>{
                                            type === 'warning'
                                                ? (leftBtnLabel || defaultLeftBtnLabel || 'Cancel')
                                                : (btnLabel || defaultRightBtnLabel || 'Ok')}
                                        </Text>
                                    </TouchableOpacity>

                                    {
                                        type === 'warning' &&
                                        <TouchableOpacity
                                            onPress={onPress}
                                            style={{ ...styles.btn, ...btnStyle, ...btnRightStyle }}>
                                            <Text style={{ ...styles.btnText, ...btnLabelStyle, ...btnRightLabelStyle }}>{btnLabel || defaultRightBtnLabel}</Text>
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
        paddingBottom: 5
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
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap-reverse'
    },
    btn: {
        marginBottom: 10,
        minWidth: 120,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        padding: 10,
        color: 'white'
    },
});