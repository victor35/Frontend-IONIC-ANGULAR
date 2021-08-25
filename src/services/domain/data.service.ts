import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    private data = [];

    constructor() { }

    setData(id, data) {
        this.data[id] = data;
    }

    getData(id) {
        return this.data[id];
    }
}
