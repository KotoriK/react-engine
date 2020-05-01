import ReactDom from 'react-dom';
import React from 'react'
import { AbstractUIControl } from './AbstractUIControl';
import LoadingScreen from './LoadingScreen';


export default class ReactUIControl extends AbstractUIControl<JSX.Element> {
    protected _lastMainView: JSX.Element | undefined;
    protected _mainView: JSX.Element = <LoadingScreen text="Loading" interval={500} />;
    protected _gadgets: Set<JSX.Element> = new Set();
    init() {
        this._refresh()
    }
    private _refresh() {
        ReactDom.render(<UIControl>{this._mainView}{this._gadgets}</UIControl>, this.parentElement)
    }
    add(element: JSX.Element) {
        let ele = super.add(element)
        this._refresh()
        return ele
    }
    remove(element: JSX.Element) {
        let bool = super.remove(element)
        this._refresh()
        return bool
    }
    switch(element: JSX.Element){
         super.switch(element)
         this._refresh()
    }
    back(){
        let bool=super.back()
        bool && this._refresh()
        return bool
    }
}
function UIControl(props) {
    return (<div>{props.children}</div>)
}
