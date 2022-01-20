import {
  Component,
  OnInit,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ServiceService } from '../service.service';
interface Parent {
  Id?: number;
  name?: string;
}
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit, AfterContentChecked {
  parentData: Parent[] = [];
  selectedParent: any;
  msg: string = '';
  passId: number = 0;
  constructor(private service: ServiceService, private cdr: ChangeDetectorRef) {
    this.service.getParent().subscribe(
      (res: any) => {
        this.parentData = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
  // Calls everytime option is changed
  changed() {
    this.parentData.map((item) => {
      if (item.Id == parseInt(this.selectedParent.split(' ')[1])) {
        this.passId = item.Id;
      }
    });
  }
  msgRecieved(value: string) {
    this.msg = value;
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
