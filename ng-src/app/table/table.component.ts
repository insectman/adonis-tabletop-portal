import { UserTableService } from './../user-table.service';
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

  private table: Table;
  private subs: Subscription[];

  constructor(private route: ActivatedRoute, private userTableService: UserTableService) {
    this.subs = [];
    this.table = null;
  }

  ngOnInit() {

    const sub = this.route.params.subscribe(params => {

      const sub2 = this.userTableService.getTableWithUsersById(params['id'])
        .subscribe(table => {
          this.table = table;
          // console.log(table);
        },
        e => {
          console.log(e);
        });

      this.subs.push(sub2);

    });

    this.subs.push(sub);

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  joinTable() {
    // console.log('join');
    const sub = this.userTableService.joinTable(this.table.values.id).subscribe(
      r => {
        this.table = r;
      },
      e => console.log(e)
    );

    this.subs.push(sub);

  }

  leaveTable() {

    const sub = this.userTableService.leaveTable(this.table.values.id).subscribe(
      r => {
        this.table = r;
      },
      e => console.log(e)
    );

    this.subs.push(sub);

  }

}
