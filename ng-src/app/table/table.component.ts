import { TableService } from './../table.service';
import { Table } from './../table';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {

  table: Table;
  private subs: Subscription[];
  private isCurrentTable: boolean;

  constructor(private route: ActivatedRoute, private tableService: TableService) { }

  ngOnInit() {
    this.subs.push(this.route.params.subscribe(params => {
      this.subs.push(this.tableService.getTableById(params['id'])
        .subscribe(table => {
          console.log(table);
          this.table = table;
        },
        e => {
          console.log(e.message);
        }));
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  joinTable() {
    // this.tableService.joinTable()
  }

}
