import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InformationModalComponent } from 'src/app/shared/components/information-modal/information-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  openModal(message: string, location?: string): void {
    const ref = this.modalService.open(InformationModalComponent);
    ref.componentInstance.message = message;
    if (location) {
      this.router.navigate(['overview']);
    }
  }
}
