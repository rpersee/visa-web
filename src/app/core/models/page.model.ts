import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Page')
export class Page {

    @JsonProperty('title', String)
    private _title: string = undefined;

    @JsonProperty('iconShape', String)
    private _iconShape: string = undefined;

    @JsonProperty('iframeSrc', String)
    private _iframeSrc: string = undefined;

    @JsonProperty('iframeHeight', String)
    private _iframeHeight: string = undefined;

    @JsonProperty('iframeWidth', String)
    private _iframeWidth: string = undefined;

    public copy(data: Page): Page {
        this.title = data.title;
        this.iconShape = data.iconShape;
        this.iframeSrc = data.iframeSrc;
        this.iframeHeight = data.iframeHeight;
        this.iframeWidth = data.iframeWidth;
        return this;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get iconShape(): string {
        return this._iconShape;
    }

    public set iconShape(value: string) {
        this._iconShape = value;
    }

    public get iframeSrc(): string {
        return this._iframeSrc;
    }

    public set iframeSrc(value: string) {
        this._iframeSrc = value;
    }

    public get iframeHeight(): string {
        return this._iframeHeight;
    }

    public set iframeHeight(value: string) {
        this._iframeHeight = value;
    }

    public get iframeWidth(): string {
        return this._iframeWidth;
    }

    public set iframeWidth(value: string) {
        this._iframeWidth = value;
    }
}
