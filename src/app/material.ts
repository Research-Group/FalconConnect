import {
    MatButtonModule,
    MatCheckboxModule,
    MatLineModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSidenavModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatLineModule,
        MatListModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSidenavModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatLineModule,
        MatListModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSidenavModule
    ]
})
export class MaterialModule { }