import { AbstractResource } from "./AbstractResource";

export default class ReactComponent extends AbstractResource {
    preload() {
        import(this.url)
            .then((value) => {
                this.value = value.default
                this.isLoaded = true
            }, (reason) => { throw reason })
    }
}