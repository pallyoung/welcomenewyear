import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native-ui'

import { createStyle } from 'themes'
import { resize } from 'utils/resize';
export interface Props {

}
interface State {
    isShow: boolean,
    buttons: IButton[],
    title: string,
    message: string
}
interface IButton {
    onPress?: () => void,
    text?: string
}
export interface AlertConfig {
    title?: string,
    message: string,
    buttons?: IButton[]
}
let INST: undefined | Alert;
export default class Alert extends Component<Props> {
    static alert(config: AlertConfig) {
        INST && INST.alert(config);
    }
    state: State = {
        isShow: false,
        buttons: [],
        title: '',
        message: ''
    }
    componentDidMount() {
        INST = this;
    }
    componentWillUnmount() {
        INST = undefined;
    }
    alert(config: AlertConfig) {
        let {
            title,
            message,
            buttons = [{}, {}]
        } = config;
        if (!message) {
            return;
        }
        this._close();
        buttons = buttons.map((button: IButton, i) => {
            !button.text && i == 0 && (button.text = '确定');
            !button.text && i == 1 && (button.text = '取消');
            const onPress = button.onPress;
            button.onPress = () => {
                onPress && onPress();
                this._close();
            }
            return button;
        })
        this.setState({
            buttons,
            title,
            message,
            isShow: true
        })
    }
    private _close = () => {
        this.setState({
            title: '',
            message: '',
            buttons: [],
            isShow: false
        })
    }
    render() {
        const {
            isShow,
            buttons,
            title,
            message
        } = this.state;
        if (isShow) {
            return <View
                {...this.props}
                style={[styles.alertWrapper]}>
                <AlertTitle text={title} />
                <AlertMessage text={message} />
                <AlertButtons buttons={buttons} />
            </View>
        }
        return null;
    }
}

function AlertTitle(props: { text: string }) {
    if (props.text) {
        return <Text style={[styles.title]}>{props.text}</Text>
    }
    return null
}
function AlertMessage(props: { text: string }) {
    if (props.text) {
        return <View style={[styles.messageWrapper]}>
            <Text style={[styles.message]}>{props.text}</Text>
        </View>
    }
    return null
}
function AlertButtons(props: { buttons: IButton[] }) {
    const buttons = props.buttons;
    const length = buttons.length;

    if (Array.isArray(buttons) && length != 0) {
        return <View style={[{ flexDirection: 'column' }, length <= 2 && { flexDirection: 'row', height: 43.5 }, length <= 2 && styles.borderTop]}>
            {buttons.map(function (button, i) {
                return <TouchableOpacity
                    key={i}
                    onPress={button.onPress}
                    activeOpacity={1}
                    style={[
                        length <= 2 ? styles.button : styles.buttonl,
                        length == 2 && i == 1 && styles.borderLeft,
                    ]}>
                    <Text style={[styles.buttonText]}>{button.text}</Text>
                </TouchableOpacity>
            })}
        </View>
    }
    return null;
}
const styles = createStyle(theme => ({
    alertWrapper: {
        backgroundColor: '#fff',
        width: resize(275),
        borderRadius: 5,
        flexDirection: 'column',
        paddingTop: 10.5,
        overflow: 'hidden'
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        color: '#030303',
        marginHorizontal: 44,
        marginBottom: 8
    },
    messageWrapper: {
        flexDirection: 'column',
        marginBottom: 10,
        minHeight: 58,
        marginHorizontal: 34,
        justifyContent: 'center'
    },
    message: {
        fontSize: 13,
        color: '#030303',
        textAlign: 'center',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonl: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.12)',
        borderTopWidth: theme.px
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#0076FF'
    },
    borderTop: {
        borderColor: 'rgba(0,0,0,0.12)',
        borderTopWidth: theme.px
    },
    borderLeft: {
        borderColor: 'rgba(0,0,0,0.12)',
        borderLeftWidth: theme.px
    }
}))
