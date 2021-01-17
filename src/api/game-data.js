export function generateCardArray () {
    let cards = [];
    for (let i = 1; i <= 36; i ++) {
        let j = i > 18 ? i - 18 : i;
        let card = {
            id: i,
            iconId: j,
            visible: true
        }
        cards.push(card);
    }
    return cards;
};

export function secondsToTime(seconds){
    let ostatokSecondsM = seconds % (60 * 60);
    let ostatokSecondsS = ostatokSecondsM % 60;
    let finalHours = Math.floor(seconds / (60 * 60));
    let finalMinutes = Math.floor(ostatokSecondsM / 60);
    let finalSeconds = Math.ceil(ostatokSecondsS);

    let fullTime = {
      "h": finalHours,
      "m": finalMinutes,
      "s": finalSeconds
    };
    return fullTime;
  }

export default {
    generateCardArray,
    secondsToTime
};