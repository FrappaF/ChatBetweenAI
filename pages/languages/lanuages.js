export function getLanguagesVersion(engText, itaText) {
    return {
        "eng": engText,
        "ita": itaText,
    };
}

export function getEngText(languages) {
    return languages["eng"] ?? "";
}

export function getItaText(languages) {
    return languages["ita"] ?? "";
}