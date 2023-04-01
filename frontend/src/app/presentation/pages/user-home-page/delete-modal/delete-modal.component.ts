import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  @Output()
  deleteProductEmit: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelDeleteEmit: EventEmitter<any> = new EventEmitter();

  /**
   * suppression produit
   */
  deleteProduct() {
    this.deleteProductEmit.emit();
  }

  /**
   * Annulation suppression
   */
  cancelDelete() {
    this.cancelDeleteEmit.emit()
  }

}
