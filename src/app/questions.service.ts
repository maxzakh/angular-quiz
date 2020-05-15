import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz, Question, Choice } from './quiz.model';

type TriviaCategories = {
  trivia_categories: {
    id: number;
    name: string;
  }[]
}

type TriviaQuestion = {
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
}

type TriviaQuestionsResponse = {
  response_code: number;
  results: TriviaQuestion[]
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  public getQuizzes() {
    return this.http.get(`https://opentdb.com/api_category.php`).pipe(
      map((result: TriviaCategories) => {
        return result.trivia_categories.map(
          (r) => new Quiz('' + r.id, r.name)
        );
      })
    );
  }

  convertTriviaQuestionToQuestion(tq: TriviaQuestion, index: number, length: number): Question {
    let choices: Choice[] = tq.incorrect_answers.map((answer) => {
      return new Choice(answer, false);
    });
    choices.push(new Choice(tq.correct_answer, true));
    return new Question(tq.question, choices, index, length);
  }

  public getQuestions(categoryId: string): Observable<Question[]> {
    return this.http.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`).pipe(
      map((data: TriviaQuestionsResponse) => {
        console.log(data);
        let abc = data.results.map((tq: TriviaQuestion, index, array) => {
          return this.convertTriviaQuestionToQuestion(tq, index, array.length);
        })
        return abc;
      })
    );
  }
}
