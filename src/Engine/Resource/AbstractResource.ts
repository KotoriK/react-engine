export interface AbstractResourceConstructor {
    id: string, url?: string, value?: string, mime?: string,
    worker?: Worker
}
/**
 * 所有细分资源类型的基类。
 * @author KotoriK
 * @export
 * @abstract
 * @class AbstractResource
 */
export abstract class AbstractResource {
    constructor(args: AbstractResourceConstructor) {
        if (args.url) {
            this.url = args.url
            this.isLoaded = false
        } else if (args.value) {
            this.value = args.value
            this.isLoaded = true
        }
        this.mime = args.mime
        this.worker = args.worker
    }
    /**
     * resId
     *
     * @type {string}
     * @memberof AbstractResource
     */
    id: string = ""
    /**
     * 资源的值。对于文本而言，是他本身。对于HeavyResource而言，是blob对象本身
     *
     * @type {(string | Blob)}
     * @memberof AbstractResource
     */

    value: string | Blob | undefined | Object

    /**
     * 资源的URL
     *
     * @type {string}
     * @memberof AbstractResource
     */
    url: string = ""

    /**
     * 将资源预载至内存。
     *
     * @memberof AbstractResource
     */
    abstract preload()
    unload() {
        this.value = undefined
        this.isLoaded = false
    }
    /**
     *
     * 指示是否已经加载。
     * @type {boolean}
     * @memberof AbstractResource
     */
    isLoaded: boolean = false

    /**
     * 资源的MIME类型。对于不需要此项的资源可以为空
     *
     * @type {string}
     * @memberof AbstractResource
     */
    mime?: string = ""

    /**
     * 指示执行进一步解码工作的Worker
     *
     * @type {Worker}
     * @memberof AbstractResource
     */
    worker?: Worker

}
/**[0]的boolean指是否被标记。 */
export type MarkedAbstractResource=[boolean,AbstractResource]