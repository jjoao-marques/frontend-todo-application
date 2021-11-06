import { TodoService } from 'src/app/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  update(): void {
    this.FormatDate();
    this.todoService.update(this.todo).subscribe(response => {
      this.todoService.message('To-do atualizada com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.todoService.message('Falha ao atualizar To-do!');
      this.router.navigate(['']);
    })
    
  }

  findById(): void {
    this.todoService.findById(this.todo.id).subscribe(response => {
      this.todo = response;
    })
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  FormatDate(): void {
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${ data.getFullYear()}`;
  }

}
