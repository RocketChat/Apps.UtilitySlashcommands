import {
    IHttp,
    IModify,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';

export interface IAccessors {
    modify: IModify;
    read: IRead;
    http: IHttp;
}
