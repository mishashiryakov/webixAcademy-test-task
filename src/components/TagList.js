const localStoreKey = 'tagsArray';
const tagLocalStore = localStorage.getItem(localStoreKey);

export const OPERATION_STATUSES = {
    READ_ONLY: 'READ_ONLY',
    SUCCESS: 'SUCCESS',
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    EMPTY_TAG: 'EMPTY_TAG',
    MAX_LENGTH: 'MAX_LENGTH',
    NEW_TAG_LIST: 'NEW_TAG_LIST'
}

export default class TagList {
    numberOfSymbolsInTagsArray = 0;
    readonlyMode = false;

    constructor({useLocalStore, maxSymbolsLength} = {}) {
        this._tagsSet = (useLocalStore && tagLocalStore) 
            ? new Set(JSON.parse(tagLocalStore)) 
            : new Set(); 
        this.maxSymbolsLength = maxSymbolsLength || 100;
    }

    get totalSymbols() {
        return this.tags.join('').length;
    }

    get isMaxLength() {
        return this.totalSymbols >= this.maxSymbolsLength;
    }

    get tags() {
        return Array.from(this._tagsSet);
    }

    set tags(tagArray) {
        this._tagsSet = new Set(tagArray)
    }

    updateLocalStore = () => {
        localStorage.setItem(localStoreKey, JSON.stringify(this.tags));
    }

    delete = (tag) => {
        if(this.readonlyMode) return OPERATION_STATUSES.READ_ONLY;

        this._tagsSet.delete(tag);

        return OPERATION_STATUSES.SUCCESS;
    }
    
    add = (tag) => {
        if(this.readonlyMode) return OPERATION_STATUSES.READ_ONLY;

        if (tag.includes(',')) {
            const newTagList = tag
                .split(',')
                .map(el => el.trim())
                .filter(el => el.length);

            this.tags = newTagList;
            return OPERATION_STATUSES.NEW_TAG_LIST;
        }

        if (this.isMaxLength) return OPERATION_STATUSES.MAX_LENGTH;

        if(!tag.length) return OPERATION_STATUSES.EMPTY_TAG;

        if (this._tagsSet.has(tag)) return OPERATION_STATUSES.ALREADY_EXISTS;

        this._tagsSet.add(tag);

        return OPERATION_STATUSES.SUCCESS;
    }

    toggleReadonlyMode = () => {
        this.readonlyMode = !this.readonlyMode;
    } 
}