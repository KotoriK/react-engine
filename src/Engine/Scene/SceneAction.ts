import { Time } from "../util/time";
import { StartOptions } from "../Audio/AudioSource";

export enum GainChangeType {
    linear, exp, directly
}
export enum SceneActionType {
    au_play_source, au_remove_all_source, au_stop_source, au_mute_track, au_resume_track, au_gain_change,
    au_mute_all, au_resume_all,
    react_show,
    ui_change_main_view, ui_add_gadget, ui_remove_gadget,
    jump_to, switch_scene,
    _if, _switch, _wait, _interval
}
interface SA_Change_Main_View {
    type: SceneActionType.ui_change_main_view
    value: JSX.Element
}
interface SA_Gadget {
    type: SceneActionType.ui_add_gadget | SceneActionType.ui_remove_gadget
    value: JSX.Element
}
export type SceneAction_UI = SA_Change_Main_View | SA_Gadget
interface SA_If {
    type: SceneActionType._if
    statement: (...args) => boolean//TODO:
    trueAction?: SceneAction
    falseAction?: SceneAction
}
interface SA_Switch {
    type: SceneActionType._switch
    statement: any
    cases: Map<any, SceneAction>
}
interface SA_Switch_Scene {
    type: SceneActionType.switch_scene
    value: string
}
interface SA_Jump_To {
    type: SceneActionType.jump_to
    value: number | "end" | 'next' | 0
}

/**流程控制*/
export type SceneAction_Flow_Control = SA_If | SA_Switch | SA_Switch_Scene | SA_Jump_To

interface SA_Audio_Source_Play extends SA_Audio_Source {
    startOptions?: StartOptions
}
interface SA_Audio_Source {
    type: SceneActionType.au_play_source | SceneActionType.au_stop_source
    trackId: string
    resId: string
}
interface SA_Audio_Track {
    type: SceneActionType.au_mute_track | SceneActionType.au_resume_track
    trackId: string
    resId: string
}
/**声音控制*/
export type SceneAction_Audio = SA_Audio_Source | SA_Audio_Source_Play | SA_Audio_Track

interface SA_Time {
    type: SceneActionType._wait | SceneActionType._interval
    value: Time
}

export type SceneAction = SceneAction_UI | SceneAction_Audio | SA_Time | SceneAction_Flow_Control