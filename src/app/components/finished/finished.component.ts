import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {

  listFinished: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(): void {
    this.todoService.findAll().subscribe(response => {
      response.forEach(todo => {
        if(todo.finalizado) {
          this.listFinished.push(todo);
        } 
      });
    });
  }

  toBack(): void {
    this.router.navigate(['']);
  }
}
