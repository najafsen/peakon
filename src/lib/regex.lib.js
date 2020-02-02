export const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const createSearchRegex = (string, regexOptions = '') => {
    const regex = [...string].map(escapeRegExp).join('.*');
    return new RegExp(regex, regexOptions);
}