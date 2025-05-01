import { Component, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-success-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Job Added Successfully</h1>
    <div mat-dialog-content>
      <p>Would you like to add additional questions?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button (click)="onAddQuestions()">Yes</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessDialogComponent {
  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddQuestions(): void {
    this.dialogRef.close('addQuestions');
   
  }
}
