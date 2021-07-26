import * as React from "react";
import {
    TextStyle,
    ViewStyle,
    TouchableOpacityProps
} from "react-native";
import { ModalProps } from "react-native-modal/dist/modal";
import { Animation } from "react-native-animatable";

type AlertType = "error" | "success" | "warning" | "custom";

export interface CustomisableAlertOptions {
    /**
     * Set a custom icon for your alert.
     *
     * If you want no icon in your alert use customIcon:`'none'`
     */
    customIcon?: React.ReactNode;
    /**
     * The title of your alert
     */
    title?: string;
    /**
     * The message of your alert
     */
    message?: string;
    /**
     * Button label for one button alerts (`error` | `success` alertTypes)
     *
     * Right button label for two buttons alerts (`warning` alertTypes)
     *
     * Default=`'Ok'`
     */
    btnLabel?: string;
    /**
     * Left button label for two buttons alerts (`warning` alertTypes)
     *
     * Default=`'Cancel'`
     */
    leftBtnLabel?: string;
    /**
     * Define a custom alert (this replace the whole thing!)
     */
    customAlert?: React.ReactNode;
    /**
     * Define the type of the alert
     */
    alertType?: AlertType;
    /**
     * Button pressed callback (one button alerts or right button in a two buttons alerts)
     */
    onPress?(): void;
    /**
     * Close alert button callback (left button in a two buttons alerts)
     */
    onDismiss?(): void;
    /**
     * Overhides global dismissable behavior.
     *
     * If `true` it closes the alert when touch outside
     *
     * Default=`false`
     */
    dismissable?: boolean;
    /**
     * Overhides global animation for an entrance animation
     */
    animationIn?: Animation;
    /**
     * Overhides global animation for an exit animation
     */
    animationOut?: Animation;
    /**
     * Overhides global modal props from react-native-modal
     *
     */
    modalProps?: ModalProps;
}

export interface CustomisableAlertProps {
    /**
     * Set a default title for all alerts you call
     */
    defaultTitle?: string;
    /**
     * Style for the alert backdrop
     */
    backdropStyle?: ViewStyle;
    /**
     * Style for the alert container
     */
    alertContainerStyle?: ViewStyle;
    /**
     * Style for the message of your alert
     */
    textStyle?: TextStyle;
    /**
     * Style for the title of your alert
     */
    titleStyle?: TextStyle;
    /**
     * Style for all buttons of your alert
     */
    btnStyle?: TouchableOpacityProps;
    /**
     * Style for the left button of your alert
     */
    btnLeftStyle?: TouchableOpacityProps;
    /**
     * Style for the right button of your alert
     */
    btnRightStyle?: TouchableOpacityProps;
    /**
     * Style for the label of the buttons of your alert
     */
    btnLabelStyle?: TextStyle;
    /**
     * Style for the left label button of your alert
     */
    btnLeftLabelStyle?: TextStyle;
    /**
     * Style for the right label button of your alert
     */
    btnRightLabelStyle?: TextStyle;
    /**
     * Set a default label for the left button of your alert
     */
    defaultLeftBtnLabel?: string;
    /**
     * Set a default label for the right button of your alert
     */
    defaultRightBtnLabel?: string;
    /**
     * Set a default type for your alert
     */
    defaultType?: AlertType;
    /**
     * Set a default entrance animation for your alert
     */
    animationIn?: Animation;
    /**
     * Set a default exit animation for your alert
     */
    animationOut?: Animation;
    /**
     * If true alert auto dismiss when touch outside
     *
     * Default= `false`
     */
    dismissable?: boolean;
    /**
     * Set a default icon for you warning messages
     */
    defaultWarningIcon?: React.ReactNode;
    /**
     * Set a default icon for you success messages
     */
    defaultSuccessIcon?: React.ReactNode;
    /**
     * Set a default icon for you error messages
     */
    defaultErrorIcon?: React.ReactNode;
    /**
     * Set a global modal props from react-native-modal
     *
     */
    modalProps?: ModalProps;
}

/**
 * Show your customAlert, can be called anywhere in your code
 *
 * ```
 *  showAlert({ title: "Your title", message: "Your message", alertType: "error", ...})
 * ```
 */
export function showAlert({
    customIcon,
    title,
    message,
    customAlert,
    alertType,
    onPress,
    dismissable,
    animationIn,
    animationOut,
    btnLabel,
    leftBtnLabel
}: CustomisableAlertOptions): void;

/**
 * Close your customAlert, can be called anywhere in your code
 */
export function closeAlert(): void;

export default class CustomisableAlert extends React.Component<
    CustomisableAlertProps
> { }
