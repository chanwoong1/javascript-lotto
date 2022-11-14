const { Console } = require("@woowacourse/mission-utils");
const { OUTPUT_MESSAGES, PRIZE_REWARD, LOTTO_INFO_VALUES, INITIALIZE_VALUES } = require("./Constant");

class GetStat {
  constructor(lottoInfo) {
    this.lottoInfo = lottoInfo;
    this.lottoInfo.lottoArray = lottoInfo.buyLotto.getLottoArray();
  }

  calculate() {
    Console.print(OUTPUT_MESSAGES.WINNING_STAT);
    this.lottoInfo.lottoArray = this.lottoInfo.buyLotto.getLottoArray();
    this.calculateLottoArray();
    this.printStat();
  }

  calculateLottoArray() {
    for (let i = 0; i < this.lottoInfo['numbersOfLotto']; i++) {
      this.initializeLottoInfoProperty();
      this.countCorrectNumbers(i);
      this.isSecondPrizeWin(i);
      this.countWinning();
    }
  }

  initializeLottoInfoProperty() {
    this.lottoInfo.numberOfCorrectNumbers = INITIALIZE_VALUES.ZERO;
  }

  countCorrectNumbers(i) {
    this.lottoInfo['winningNumbers'].forEach((number) => {
      if (this.lottoInfo['lottoArray'][i].includes(number)) {
        this.lottoInfo.numberOfCorrectNumbers
          += LOTTO_INFO_VALUES.ADD_CORRECT_NUMBER;
      }
    });
  }

  isSecondPrizeWin(i) {
    if (this.lottoInfo.numberOfCorrectNumbers === 5 &&
      this.lottoInfo['lottoArray'][i].includes(this.lottoInfo.bonusNumber)) {
      this.lottoInfo.numberOfCorrectNumbers += LOTTO_INFO_VALUES.GET_PRIZE_2;
    }
  }

  countWinning() {
    const rankCheck = {
      3: 'rank5',
      4: 'rank4',
      5: 'rank3',
      6: 'rank1',
      7: 'rank2',
    }
    this.lottoInfo[rankCheck[this.lottoInfo.numberOfCorrectNumbers]]
      += LOTTO_INFO_VALUES.COUNT_WINNING;
  }

  printStat() {
    Console.print(`${OUTPUT_MESSAGES.PRIZE_5} - ${this.lottoInfo['rank5']}개`);
    Console.print(`${OUTPUT_MESSAGES.PRIZE_4} - ${this.lottoInfo['rank4']}개`);
    Console.print(`${OUTPUT_MESSAGES.PRIZE_3} - ${this.lottoInfo['rank3']}개`);
    Console.print(`${OUTPUT_MESSAGES.PRIZE_2} - ${this.lottoInfo['rank2']}개`);
    Console.print(`${OUTPUT_MESSAGES.PRIZE_1} - ${this.lottoInfo['rank1']}개`);

    this.printRate(this.lottoInfo);
  }

  printRate() {
    const profit =
      this.lottoInfo['rank5'] * PRIZE_REWARD.REWARD_PRIZE_5 +
      this.lottoInfo['rank4'] * PRIZE_REWARD.REWARD_PRIZE_4 +
      this.lottoInfo['rank3'] * PRIZE_REWARD.REWARD_PRIZE_3 +
      this.lottoInfo['rank2'] * PRIZE_REWARD.REWARD_PRIZE_2 +
      this.lottoInfo['rank1'] * PRIZE_REWARD.REWARD_PRIZE_1;
    const totalCost =
      this.lottoInfo.numbersOfLotto * LOTTO_INFO_VALUES.LOTTO_COST;
    const rate = (totalCost === 0) ?
      0 : ((profit / totalCost) * 100).toFixed(1);
    Console.print(`총 수익률은 ${rate}%입니다.`);
  }
}

module.exports = GetStat;