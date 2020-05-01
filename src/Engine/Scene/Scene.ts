import { ProcessedCard } from "./Card";
import { MarkedAbstractResource } from "../Resource/AbstractResource";
import { SceneAction, SceneActionType } from "./SceneAction";
import Stage from "./Stage";

/**
 * 
 *
 * @export
 * @class Scene
 */
export default class Scene {
    constructor(scene_id: string, cards: Array<ProcessedCard>, res: Map<string, MarkedAbstractResource>, stage: Stage) {
        this.scene_id = scene_id
        this._cards = cards
        this._res = res
        this.stage = stage
    }
    public readonly scene_id: string
    public readonly stage: Stage
    private _cards: Array<ProcessedCard> = []
    private _res: Map<string, MarkedAbstractResource>
    public async run() {
        for (const card of this._cards) {
            let actions = [...card.actions]
            for (const action of actions) {
                await this.performAction(action)
            }
        }
    }
    public preloadResources() {
        for (const res of this._res.values()) {
            res[1].preload()
        }
    }
    public unloadResources() {
        for (const res of this._res.values()) {
            res[1].unload()
        }
    }
    public unloadUnused(usefulRes_resId: Array<string>) {
        for (const item of usefulRes_resId) {
            let res = this._res.get(item)
            if (res) res[0] = true//标记要用的
        }
        for (const res of this._res.values()) {
            if (res[0]) { res[0] = false } else { res[1].unload() }
        }

    }
    public unloadAll() {

    }
    public async performAction(action: SceneAction) {
        switch (action.type) {
            case SceneActionType.au_play_source:
                this.stage.engine.AudioCtrl.play(action.trackId, action.resId)
                /* let track = this.trackMap.get(action.trackId)
                if (track) {
                    let audio = this.engine.ResourcesCtrl.get(action.resId) as Audio
                    if (audio.value) {
                        let source = track.mixer.createSource(audio.value)
                        track.childSourcesMap.set(action.resId, source)
                        track.mixer.play(action.resId)
                    } else {
                        audio.preload().then(() => {
                            let source = track.mixer.createSource(audio.value)
                            track.childSourcesMap.set(action.resId, source)
                            track.mixer.play(action.resId)
                        })
                    }

                } */
                break;
            case SceneActionType.au_stop_source:
                break
            case SceneActionType.au_mute_track:
                break
            case SceneActionType.switch_scene:
                this.stage.jumpToScene(action.value)
                break
            case SceneActionType.ui_add_gadget:
                this.stage.engine.UICtrl.add(action.value)
                break
            case SceneActionType.ui_remove_gadget:
                this.stage.engine.UICtrl.remove(action.value)
                break
            case SceneActionType.ui_change_main_view:
                this.stage.engine.UICtrl.switch(action.value)
                break

        }
    }
}

