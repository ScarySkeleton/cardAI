export function importAll() {
    let files = require.context("../img/cards/", false);
    return files.keys();
}

