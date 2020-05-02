import ResourceControl from "./Resource/ResourceControl";
import engineSetting from '../Project/engine.json'
import AudioControl from "./Audio/AudioControl";
import Stage from "./Scene/Stage";
import ReactUIControl from "./UI/ReactUIControl";
import { AbstractUIControl } from "./UI/AbstractUIControl";
import ResourceLoader, { ResLoaderType } from "./Resource/ResLoader";
export default class Engine {
    constructor(parentElement: HTMLElement | null) {
        this.ResourcesCtrl = new ResourceControl({ decodeWorker: engineSetting.resources.decodeWorker as Array<[string, string]> })
        this.AudioCtrl = new AudioControl({
            mainMixerProps: engineSetting.AudioControl.mainMixerProps,
            tracks: new Set(engineSetting.AudioControl.tracks)
        })
        this.Stage = new Stage(this)
        this.UICtrl = new ReactUIControl(parentElement)
    }
    public ResourcesCtrl: ResourceControl
    public AudioCtrl: AudioControl
    public Stage: Stage
    public UICtrl: AbstractUIControl<any>
    public loader:ResourceLoader=ResourceLoader
      init() {
        //ui
        this.UICtrl.init()
        //res
        //TODO:Check env
        ResourceLoader.init(ResLoaderType.xhr_filereader)

        /*  let resSetting = JSON.parse(await (await ResourceLoader.getResourceByUrl(engineSetting.resourceSettingPath)).text())
         this.ResourcesCtrl.init(resSetting) */
        //stage




    }
a(url){
    return ResourceLoader.getResourceByUrl(url)
}

}
export interface EngineSetting {
    resourceSettingPath: string
}