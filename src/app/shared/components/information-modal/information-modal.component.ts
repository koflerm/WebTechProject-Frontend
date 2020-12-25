import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {
  @Input() message!: string;

  constructor(public modal: NgbActiveModal,) { }

  ngOnInit(): void {
  }
}
