export const createSlug = (string) => {
    return string.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/\?+/g, '')
        .replace(/!+$/, '');
}

export const subtractDates = (date1, date2) => {
    const d2 = new Date(date2);
    const d1 = new Date(date1);
    const res = d2.getTime() - d1.getTime();
    return Math.round(res / (1000 * 3600 * 24))
; 
}
export const capitalizeFirst = string => {
    let first = string[0].toUpperCase();
    return first + string.slice(1);
}