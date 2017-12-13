import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user';
import { Table } from '../table';
import { TableService } from '../table.service';
import { UserTableService } from '../user-table.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableListComponent implements OnInit, OnDestroy {

  @Input() user: User;
  private tables: Table[];
  private subs: Subscription[];
  // private loadingFinished: boolean;
  private tableCreateForm: FormGroup;
  private gameId: FormControl;
  private tableName: FormControl;

  constructor(private tableService: TableService, private userTableService: UserTableService, private fb: FormBuilder) {
  }

  createForm() {
    this.tableCreateForm = this.fb.group({
      gameId: ['', [
        Validators.required
      ]], // <--- the FormControl called "name"
      tableName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    });
    Object.defineProperty(TableListComponent.prototype, 'gameId', { get: () => this.tableCreateForm.get('gameId') });
    Object.defineProperty(TableListComponent.prototype, 'tableName', { get: () => this.tableCreateForm.get('tableName') });
  }

  newTable(gameId, tableName) {
    this.userTableService.createTable(gameId, tableName);
  }

  ngOnInit() {
    this.subs = [];
    this.createForm();
    this.subs.push(this.tableService.getTableList().subscribe(tablesList => this.tables = tablesList));
  }

  get formValid(): boolean {
    return !(this.gameId.errors || this.tableName.errors);
  }

  onSubmit(): void {
    this.subs.push(this.userTableService.createTable(this.gameId.value, this.tableName.value)
      .subscribe(table => { console.log(table); },
      e => {
        if (e.field === 'gameId') {
          this.tableName.setErrors({});
          this.tableName.updateValueAndValidity();
          switch (e.type) {
            case 'notfound':
              this.gameId.setErrors({ 'notfound': true });
              break;
            case 'ambiguous':
              this.gameId.setErrors({ 'ambiguous': true });
              break;
          }

        } else if (e.field === 'tableName') {
          this.gameId.setErrors({});
          this.gameId.updateValueAndValidity();
          switch (e.type) {
            case 'duplicate':
              this.tableName.setErrors({ 'duplicate': true });
              break;
          }
        }
        console.log(e.field, e.type);
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
