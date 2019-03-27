
'use strict'
import { Dimensions, PixelRatio } from 'react-native';
let WIDTH_DP = 375;
let WIDTH_PX = 750;
const PIXEL_RATIO = 2;
const REAL_PIXEL_RATIO = PixelRatio.get();
const REAL_WIDTH_DP = Dimensions.get('window').width;
const REAL_HEIGHT_DP = Dimensions.get('window').height;
let RATIO: number = REAL_WIDTH_DP / WIDTH_DP;

function px2dp(px: number): number {
    return PixelRatio.roundToNearestPixel(px / REAL_PIXEL_RATIO);
}
function dp2px(dp: number): number {
    return PixelRatio.getPixelSizeForLayoutSize(dp);
}
function resize(dp: number): number {
    return PixelRatio.roundToNearestPixel(dp * RATIO);
}
function setDeviceWidth(width: number) {
    WIDTH_DP = width;
    WIDTH_PX = width * REAL_PIXEL_RATIO;
    RATIO = REAL_WIDTH_DP / WIDTH_DP;
}
function vm(v: number): number {
    return REAL_HEIGHT_DP > REAL_WIDTH_DP ? vw(v) : vh(v)
}
function vh(v: number): number {
    return REAL_HEIGHT_DP / 100 * v;
}
function vw(v: number): number {
    return REAL_WIDTH_DP / 100 * v;
}
export {
    px2dp,
    dp2px,
    resize,
    setDeviceWidth,
    vm,
    vh,
    vw
}