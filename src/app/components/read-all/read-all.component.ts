import { Todo } from './../../models/todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;

  list: Todo [] = [];
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
        } else {
          this.list.push(todo);
        }
      })
      this.closed = this.listFinished.length;
    })
  }

  finish(item: Todo): void {
    item.finalizado = true;
    this.todoService.update(item).subscribe(response  => {
      this.todoService.message('Task finalizada com sucesso!')
        this.list = this.list.filter(todo => todo.id !== item.id);
        this.closed++;
    })
  }

  deleteTodo(id: any): void {
    this.todoService.delete(id).subscribe(response => {
      if(response == null) {
        this.todoService.message('Task deletada com sucesso!')
        this.list = this.list.filter(todo => todo.id !== id);
      }
    })
  }

  goFinished(): void {
    this.router.navigate(['/finished'])
  }




}
