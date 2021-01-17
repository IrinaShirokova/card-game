export function generateCardArray () {
    let cards = [];
    for (let i = 1; i <= 36; i ++) {
        let card = {
            id: i,
            iconId: i > 18 ? i - 18 : i,
            visible: true
        }
        cards.push(card);
    }
    return cards;
}

export default {
    generateCardArray
};