import Card, { ProcessedCard } from "./Card";
import Scene from "./Scene";
import { MarkedAbstractResource } from "../Resource/AbstractResource";
import Engine from "../Engine";
import CardProcessor from "./CardProcessor";
/**
 * 自定义场景的启动模板
 *
 * @author KotoriK
 * @export
 * @class SceneBootstrap
 */
export default class SceneBootstrap {
    constructor(engine: Engine, cards?: Array<ProcessedCard>) {
        this.engine = engine
        this._cards = cards ? cards : []
    }
    public readonly engine: Engine
    private _cards: Array<ProcessedCard>
    public res: Map<string, MarkedAbstractResource> = new Map()
    /**
     * 向场景添加Card
     *
     * @author KotoriK
     * @param {Card} card
     * @returns
     * @memberof SceneBootstrap
     */
    addCard(card: Card) {
        this._cards.push(new CardProcessor(card, this)._build())
        return this
    }

    /**
     * 分配scene_id，生成场景。
     * @author KotoriK
     * @returns
     * @memberof SceneBootstrap
     */
    build(scene_id: string) {//TODO:
        return new Scene(scene_id, this._cards, this.res, this.engine.Stage)
    }
}