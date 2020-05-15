export class Choice {
  constructor(public value: string, public correct?: boolean) {}
}

export class Question {
  constructor(
    public label: string,
    public choices: Choice[],
    public questionIdx: number,
    public totalQuestions: number
  ) {}
}

export class Quiz {
  constructor(public label: string, public name: string) {}
}

export class Answers {
  constructor(public values: Choice[] = []) {}
}
