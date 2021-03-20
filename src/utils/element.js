export const element = (type, attributes = {}) => {
    return Object.assign(document.createElement(type), attributes);
}