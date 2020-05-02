/* const regHTTPURL = /^https?/i
 */const RETRY_TIME = 5
const retryAfterMs = 1000
import sleep from '../util/sleep'
export enum ResLoaderType {
    nodejs_fs, parceljs, xhr_filereader
}
/**
 * @description 资源加载支持。
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class ResourceLoader
 */
export default class ResourceLoader {
    static init(type: ResLoaderType) {
        switch (type) {
            case ResLoaderType.nodejs_fs:
                break;
            case ResLoaderType.parceljs:
                ResourceLoader.getResourceByUrl = ResourceLoader._getRes_parceljs
                break
            case ResLoaderType.xhr_filereader:
                ResourceLoader.getResourceByUrl = ResourceLoader._getRes_XHR
                break
            default:
        }
    }
    /**
     * 根据所给的URL（网络资源或本地资源）获取资源并返回。
     *
     * @static
     * @param {string} url 资源的URL
     * @param {number} [retryTime] 重试次数，默认为 RETRY_TIME
     * @returns {Promise<Blob>}
     * @memberof Path
     */
    static getResourceByUrl: (url: string, retryTime?: number) => Promise<Blob>
    private static retry = async (url: string, retryTime: number) => {//TODO:performance?
        //重试
        await sleep(retryAfterMs)
        retryTime = retryTime ? retryTime : RETRY_TIME
        if (retryTime > 0) {
            return ResourceLoader.getResourceByUrl(url, retryTime - 1)
        }
        else {
            //TODO:这么抠门真的可以吗
            let URLCantResolveException = await import('../Exception/URLCantResolveException')
            throw new URLCantResolveException.default(url)
        }
    }
    /**
     * 通过XHR获取资源，用于资源位于HTTP服务器上的场景
     * @author KotoriK
     * @private
     * @static
     * @param {string} url
     * @param {(url:string,retryTime: number) => Promise<Blob>} retryFunc
     * @param {number} [retryTime]
     * @returns {Promise<Blob>}
     * @memberof ResourceLoader
     */
    private static _getRes_XHR(url: string, retryTime: number=0): Promise<Blob> {
        return fetch(url, {
            method: "GET",
            body: "blob"
        }).then((response) => {
            if (response.ok) {
                return response.blob()
            } else {
                    return this.retry(url, retryTime - 1)
            }
        }, () => {
                return this.retry(url, retryTime - 1)
        })
    }
    private static _getRes_parceljs(url: string): Promise<any> {
        return import(url)
    }
}