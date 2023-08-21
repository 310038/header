
import { HeaderComponent } from 'header';
import { DataService } from './service/data.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  imports: [
    HttpClientModule,
    ToolbarModule,
    TreeTableModule,
    DropdownModule,
    GalleriaModule,
    ButtonModule,
    RouterOutlet,
    HeaderComponent,
    FormsModule,
    DividerModule,
    DialogModule,
    GalleriaModule,
    ToastModule,
    TableModule,
    InputTextModule,
  ],
})
export class AppComponent implements OnInit{
  dataService: DataService = inject(DataService);
  currentRow: any;
  value!: any;
  isSearchDisabled: boolean = false;

  ngOnInit(): void {
    this.value= this.dataService.getData();
  }

  onSearch(text: string) {
    this.value= this.dataService.search(text);

  }

  onChange(row: any) {
    console.log(row);
    this.currentRow = row;
  }
}


