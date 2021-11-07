import { TodoService } from 'src/app/services/todo.service';
import { Todo } from './../../models/todo';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  minDate = new Date();
  titulo = new FormControl('',[Validators.minLength(1)]);
  dataParaFinalizar = new FormControl('', Validators.required);

  
  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.FormatDate();
    this.todoService.create(this.todo).subscribe((response) => {
      this.todoService.message('To-do criado com sucesso!');
      this.router.navigate(['']);
    },  err => {
      this.todoService.message('Falha ao criar o To-do');
      this.router.navigate(['']);
      console.log(err);
    })
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  FormatDate(): void {
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${ data.getFullYear()}`;
  }

  errorValidTitle() {
    if(this.titulo.invalid) {
      return 'O campo TÍTULO é obrigatório!';
    } 
      return false;    
  }

}


