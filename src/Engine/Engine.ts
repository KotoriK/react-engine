import ResourceControl from "./Resource/ResourceControl";
import engineSetting from '../Project/engine.json'
import AudioControl from "./Audio/AudioControl";
import Stage from "./Scene/Stage";
import ReactUIControl from "./UI/ReactUIControl";
import { AbstractUIControl } from "./UI/AbstractUIControl";

export default class Engine {
    constructor(parentElement: HTMLElement | null) {
        this.ResourcesCtrl = new ResourceControl({ decodeWorker: engineSetting.resources.decodeWorker as Array<[string, string]> })
        this.AudioCtrl = new AudioControl({
            mainMixerProps: engineSetting.AudioControl.mainMixerProps,
            tracks: engineSetting.AudioControl.tracks
        })
        this.Stage = new Stage(this)
        this.UICtrl = new ReactUIControl(parentElement)
    }
    public ResourcesCtrl: ResourceControl
    public AudioCtrl: AudioControl
    public Stage: Stage
    public UICtrl: AbstractUIControl<any>
     init() {
        //ui
        this.UICtrl.init()
        //res
        /*  let resSetting = JSON.parse(await (await ResourceLoader.getResourceByUrl(engineSetting.resourceSettingPath)).text())
         this.ResourcesCtrl.init(resSetting) */
        //stage




    }

}
export interface EngineSetting {
    resourceSettingPath: string
}