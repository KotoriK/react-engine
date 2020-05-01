/**
 * 管理游戏的界面渲染，包括提供与子组件的库无关的方法(是使用React还是Vue.js还是Angular.js)，向子组件传递窗口大小，锁定纵横比与黑边处理等
 *
 * @author KotoriK
 * @export
 * @abstract
 * @class AbstractUIControl
 */
export abstract class AbstractUIControl<T>{
    constructor(parentElement: HTMLElement | null) {
        if (parentElement) {
            this.parentElement = parentElement
        } else {
            throw new Error('ELEMENT not found')//TODO:
        }
    }
    /**
     * 与当前主要页面_mainView无关的，大多是绝对定位的组件
     *
     * @abstract
     * @type {Set<T>}
     * @memberof AbstractUIControl
     */
    protected abstract _gadgets: Set<T>
    /**
     * 构成当前页面的主要组件，
     *
     * @abstract
     * @type {T}
     * @memberof AbstractUIControl
     */
    protected abstract _mainView: T
    protected abstract _lastMainView: T | undefined
    public readonly parentElement
    /**
     * 准备渲染到DOM
     *
     * @author KotoriK
     * @abstract
     * @memberof AbstractUIControl
     */
    abstract init()
    /**
     * 添加子组件。默认不允许重复
     *
     * @author KotoriK
     * 
     * @param {*} element
     * @memberof AbstractUIControl
     */
    add(element: T) {
        return this._gadgets.add(element)
    }
    /**
     * 移除子组件
     *
     * @author KotoriK
     * 
     * @param {*} element
     * @memberof AbstractUIControl
     */
    remove(element: T) {
        return this._gadgets.delete(element)
    }
    switch(newView: T) {
        this._lastMainView = this._mainView
        this._mainView = newView
    }
    back(){
        if(this._lastMainView){
            this._mainView=this._lastMainView
            return true
        }else{
            return false
        }
    }

}
