import * as React from 'react';
import { TriParamColor, ColorUtil } from './color';
import Video from '../Resource/Video';
import Image from '../Resource/Image';

export enum BackgroundType {
    Color, Image, Video, Canvas
}

interface BackgroundPropsTypeImage {
    type: BackgroundType.Image
    data: Image
}
interface BackgroundPropsTypeVideo {
    type: BackgroundType.Video
    data: Video
}
interface BackgroundPropsTypeColor {
    type: BackgroundType.Color
    data: TriParamColor
}
export type BackgroundProps = BackgroundPropsTypeImage | BackgroundPropsTypeVideo | BackgroundPropsTypeColor

export interface BackgroundState {

}

class Background extends React.Component<BackgroundProps, BackgroundState> {
    //state = { :  }
    render() {
        let background: JSX.Element
        let divCSS: React.CSSProperties = { position: 'absolute', width: '100vw', height: '100vh' }
        switch (this.props.type) {
            case BackgroundType.Color:
                let colorString = ColorUtil.toCSSRule(this.props.data)
                background = (<div style={{ ...divCSS, backgroundColor: colorString }}>{this.props.children}</div>)
                break
            case BackgroundType.Image:
                background = (<div style={{ ...divCSS, backgroundImage: this.props.data.valueUrl }}>{this.props.children}</div>)
                break;
            default:
                background = (<div style={divCSS}></div>)
        }
        return background;
    }
}

export default Background;