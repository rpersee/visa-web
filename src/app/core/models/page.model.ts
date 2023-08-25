import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Page')
export class Page {

    @JsonProperty('title', String)
    private _title: string = undefined;

    @JsonProperty('iconShape', String)
    private _iconShape: string = undefined;

    @JsonProperty('iframeSrc', String)
    private _iframeSrc: string = undefined;

    public copy(data: Page): Page {
        this.title = data.title;
        this.iconShape = data.iconShape;
        this.iframeSrc = data.iframeSrc;
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
}
