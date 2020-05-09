import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  quizes: Quiz[];

  constructor(
    public route: ActivatedRoute,
    public questionsService: QuestionsService
  ) {}

  ngOnInit() {
    this.questionsService.getQuizzes().subscribe((quiz) => {
      this.quizes = quiz;
    });
  }
}
