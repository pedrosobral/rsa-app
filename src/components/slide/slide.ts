import {
  Component,
  Input,
} from '@angular/core';

import * as WordCloud from 'wordcloud';

@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent {
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  results = [];

  @Input() question: any;
  @Input() poll: any;
  @Input() settings: any;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.question) {
      if (this.question.type === 'free') {
        setTimeout(() => this.doWordCloud(), 100);
      } else {
        this.dataChart();
      }
    }
  }

  dataChart() {
    const calcPercentage = (votes = 0, total) => {
      const result = votes / (total || 1);
      return `(${votes}) ${Math.floor(result * 100)}%`;
    }

    const totalVotes = this.question.votes;
    this.results = this.question.options
      .map(option => calcPercentage(option.votes, totalVotes))
  }

  doWordFreq() {
    let freq = [];
    this.question.students.forEach((student) => {
      if (!student.answer) return;

      const words = student.answer.split(' ');

      words.forEach((word: String) => {
        word = word.toLowerCase();

        if (this.isStopWord(word) !== -1) {
          return;
        }

        const index = freq.findIndex(w => {
          return w[0] == word;
        });
        if (index > -1) {
          // freq++
          freq[index][1] = freq[index][1] + 1;
        } else {
          freq.push([word, 2]);
        }
      });
    });

    // case anonymous answers
    this.question.anonymousShortAnswers.forEach((answer) => {
      if (!answer) return;

      freq.push([answer, 5]);
    });

    return freq;
  }

  doWordCloud() {
    const data = this.doWordFreq();
    WordCloud(document.getElementById(this.question._id + ''), { list: data, gridSize: 20, minFont: 100, weightFactor: 12 });
  }

  isStopWord(word) {
    const stopwords = ["de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "é", "com", "não", "uma",
      "os", "no", "se", "na", "por", "mais", "as", "dos", "como", "mas", "foi", "ao", "ele", "das", "tem", "à",
      "seu", "sua", "ou", "ser", "quando", "muito", "há", "nos", "já", "está", "eu", "também", "só", "pelo", "pela",
      "até", "isso", "ela", "entre", "era", "depois", "sem", "mesmo", "aos", "ter", "seus", "quem", "nas", "me",
      "esse", "eles", "estão", "você", "tinha", "foram", "essa", "num", "nem", "suas", "meu", "às", "minha", "têm",
      "numa", "pelos", "elas", "havia", "seja", "qual", "será", "nós", "tenho", "lhe", "deles", "essas", "esses",
      "pelas", "este", "fosse", "dele", "tu", "te", "vocês", "vos", "lhes", "meus", "minhas", "teu", "tua", "teus",
      "tuas", "nosso", "nossa", "nossos", "nossas", "dela", "delas", "esta", "estes", "estas", "aquele", "aquela", "aqueles",
      "aquelas", "isto", "aquilo", "estou", "está", "estamos", "estão", "estive", "esteve", "estivemos", "estiveram", "estava",
      "estávamos", "estavam", "estivera", "estivéramos", "esteja", "estejamos", "estejam", "estivesse", "estivéssemos",
      "estivessem", "estiver", "estivermos", "estiverem", "hei", "há", "havemos", "hão", "houve", "houvemos", "houveram",
      "houvera", "houvéramos", "haja", "hajamos", "hajam", "houvesse", "houvéssemos", "houvessem", "houver", "houvermos", "houverem",
      "houverei", "houverá", "houveremos", "houverão", "houveria", "houveríamos", "houveriam", "sou", "somos", "são",
      "era", "éramos", "eram", "fui", "foi", "fomos", "foram", "fora", "fôramos", "seja", "sejamos", "sejam", "fosse", "fôssemos",
      "fossem", "for", "formos", "forem", "serei", "será", "seremos", "serão", "seria", "seríamos", "seriam", "tenho", "tem",
      "temos", "tém", "tinha", "tínhamos", "tinham", "tive", "teve", "tivemos", "tiveram", "tivera", "tivéramos", "tenha", "tenhamos",
      "tenham", "tivesse", "tivéssemos", "tivessem", "tiver", "tivermos", "tiverem", "terei", "terá", "teremos", "terão", "teria", "teríamos",
      "teriam"];
    return stopwords.indexOf(word);
  }
}
