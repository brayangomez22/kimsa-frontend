import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../../core/models/project.model';
import { Partner } from '../../core/models/partner.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() items!: any[];
  @Input() columns!: any[];
  @Output() deleteClicked: EventEmitter<string> = new EventEmitter();
  @Output() editClicked: EventEmitter<Project> = new EventEmitter();
  @Output() editClickedPartner: EventEmitter<Partner> = new EventEmitter();

  public url: string = environment.apiUrl + '/images/';

  handleDelete(id: string): void {
    this.deleteClicked.emit(id);
  }

  handleEdit(project: Project): void {
    this.editClicked.emit(project);
  }

  handleEditPartner(partner: Partner): void {
    this.editClickedPartner.emit(partner);
  }
}
