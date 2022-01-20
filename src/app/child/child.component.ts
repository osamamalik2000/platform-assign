import { Component, OnChanges, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { Output, EventEmitter } from '@angular/core';

interface Child {
  Id?: number;
  age?: number;
}
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnChanges {
  // Variable passed from parent
  @Input() data: number = 0;

  // Variable passed to parent
  @Output() passMsgToParent = new EventEmitter<string>();

  childData: Child[] = [];
  idArray: number[] = [];
  selectedChild: Child = {};
  constructor(private service: ServiceService) {
    this.service.getChild().subscribe(
      (res: any) => {
        this.childData = res;
        this.childData.map((item) => {
          this.idArray.push(item.Id as number);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Passing msg to parent using event emitter and below function
  passMsg(value: string) {
    this.passMsgToParent.emit(value);
  }

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.idArray.includes(this.data)) {
      this.childData.map((item) => {
        if (item.Id == this.data) {
          this.selectedChild.Id = item.Id;
          this.selectedChild.age = item.age;
        }
      });
      this.passMsg('Age is of selected person is:');
    } else {
      this.selectedChild.Id = 0;
      this.selectedChild.age = 0;
      this.passMsg('No Data Present');
    }
  }
}
