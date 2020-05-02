import Scene from "./Scene";
import Engine from "../Engine";

export default class Stage {
    constructor(engine: Engine) {
        this.engine = engine
    }
    private _scenes: Map<string, Scene> = new Map()
    private _nowScene: Scene | undefined;
    public get nowScene(): Scene | undefined {
        return this._nowScene;
    }
    private _pastScenes: Array<Scene> = [];
    public get pastScenes(): Array<Scene> {
        return [...this._pastScenes];//生成拷贝防止更改
    }
    private _futureScenes: Array<Scene> = [];
    public get futureScenes(): Array<Scene> {
        return [...this._futureScenes];
    }
    public readonly engine: Engine
    public initFromArray(scenes: Array<Scene>) {
        for (const s of scenes) {
            this._scenes.set(s.scene_id, s)
        }
    }
    public addScene(scene:Scene){
        this._scenes.set(scene.scene_id,scene)
    }
    public jumpToScene(scene_id: string) {
        let scene=this._scenes.get(scene_id)
        if(scene){
            if(this._nowScene){
                this._pastScenes.push(this._nowScene)
                //清理上一个scene
            }
            this._nowScene=scene
            //启动scene

        }
    }

}