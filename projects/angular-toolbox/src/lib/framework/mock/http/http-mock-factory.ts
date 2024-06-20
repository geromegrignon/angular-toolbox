import { XhrFactory } from "@angular/common";
import { inject } from "@angular/core";
import { HttpMockService } from "../../../model/service/mock/http/http-mock.service";
import { HttpMethodMock, XhrProxy } from "../../../model";
import { DelegateXhr } from "./xhr/delegate-xhr";
import { EMPTY_STRING } from "../../../util";
import { XhrBase } from "./xhr/xhr-base";

/**
 * @private
 * An error used as reference for unit testing.
 * Angular framework calls XMLHttpRequest method only after the open() method invokation.
 */
const XHR_ERROR: (method: string)=>void = (method: string)=> {
    throw new Error(`Attempt to call ${method}() method before calling open().`)
};

/**
 * @private
 */
class XMLHttpRequestProxyImpl extends XhrBase implements XhrProxy {

    /**
     * @private
     * Stores an internal XMLHttpRequestobject used as delegate,
     * depending on the testing strategy defined by the config file.
     */
    private XHR!: XhrProxy;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get response(): any {
        return  this.XHR ? this.XHR.response : undefined;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get status(): number {
        return this.XHR ? this.XHR.status : 0;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get statusText(): string {
        return this.XHR ? this.XHR.statusText : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get readyState(): number {
        return this.XHR ? this.XHR.readyState : this.UNSENT;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get responseURL(): string {
        return this.XHR ? this.XHR.responseURL : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get responseText(): string {
        return this.XHR ? this.XHR.responseText : EMPTY_STRING;
    }

    get upload(): XMLHttpRequestUpload {
        return this.XHR.upload;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    open(method: string, url: string | URL): void;
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        const m: string = (method as string).toString().toLowerCase();
        const u: string = (url as string);
        const config: HttpMethodMock | undefined = this._httpMockService.getMethodConfig(u, m);
        if (this.XHR && this.XHR instanceof DelegateXhr) this.XHR.destroy();
        this.XHR = config ? new DelegateXhr(config) : new XMLHttpRequest();
        this.XHR.withCredentials = this.withCredentials;
        this.XHR.responseType = this.responseType;
        this.XHR.open(m.toString(), u, async as any, username as any, password as any);
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    abort(): void {
        if (this.XHR) this.XHR.abort();
        XHR_ERROR("abort");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    getAllResponseHeaders(): string {
        return this.XHR ? this.XHR.getAllResponseHeaders() : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    override addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        if (this.XHR) return this.XHR.addEventListener(type as any, listener as any, options as any);
        XHR_ERROR("addEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    override removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
        if (this.XHR) return this.XHR.removeEventListener(type as any, listener as any, options as any);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        if (this.XHR) return this.XHR.send(body);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    setRequestHeader(name: string, value: string): void {
        if (this.XHR) return this.XHR.setRequestHeader(name, value);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }
}

/**
 * @private
 */
class XhrProxyFactoryImpl extends XhrFactory {

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }

    /**
     * @private
     */
    public build(): XMLHttpRequest {
        return new XMLHttpRequestProxyImpl(this._httpMockService);
    }
}

/**
 * A factory function that creates and returns a new XhrFactory instance.
 * 
 * @returns a new XhrFactory instance.
 */
export const httpMockFactory = ()=> {
    return new XhrProxyFactoryImpl(inject(HttpMockService));
}
