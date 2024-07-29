import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { VisualDataService } from '../../Service/visual-data.service';
import { BaseChartDirective } from 'ng2-charts';
import { DataItem } from '../../interface';
import { ModalComponent } from "../../shared/modal/modal.component";
import { ToastComponent } from "../../shared/toast/toast.component";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, FormsModule, BaseChartDirective, ModalComponent, ReactiveFormsModule, ToastComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  data: DataItem[] = [];
  filteredData: any;
  selectedData: any;
  initialData: any;
  updateData: any;
  filtersApplied = false;
  id!: string;
  currentRecordId?: string;
  showToast = false;
  message: string = '';
  toastType = '';
  currentItem: any;
  dataForm!: FormGroup;
  updateDataForm!: FormGroup;
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Intensity' },
    { data: [], label: 'Likelihood' },
    { data: [], label: 'Relevance' },
  ];
  @ViewChild('modalComponent') modal:
    | ModalComponent<DashboardComponent>
    | undefined;
  @ViewChild('updateModal') updateModal:
    | ModalComponent<DashboardComponent>
    | undefined;
  @ViewChild('endYear') endYear!: ElementRef;
  @ViewChild('intensity') intensity!: ElementRef;
  @ViewChild('sector') sector!: ElementRef;
  @ViewChild('topic') topic!: ElementRef;
  @ViewChild('insight') insight!: ElementRef;
  @ViewChild('url') url!: ElementRef;
  @ViewChild('region') region!: ElementRef;
  @ViewChild('startYear') startYear!: ElementRef;
  @ViewChild('impact') impact!: ElementRef;
  @ViewChild('added') added!: ElementRef;
  @ViewChild('published') published!: ElementRef;
  @ViewChild('country') country!: ElementRef;
  @ViewChild('relevance') relevance!: ElementRef;
  @ViewChild('pestle') pestle!: ElementRef;
  @ViewChild('source') source!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('likelihood') likelihood!: ElementRef;
  @ViewChild('swot') swot!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  filters = {
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  };
  fields = [
    { name: 'end_year', label: 'End Year', type: 'text' },
    { name: 'intensity', label: 'Intensity', type: 'number' },
    { name: 'sector', label: 'Sector', type: 'text' },
    { name: 'topic', label: 'Topic', type: 'text' },
    { name: 'insight', label: 'Insight', type: 'text' },
    { name: 'url', label: 'URL', type: 'url' },
    { name: 'region', label: 'Region', type: 'text' },
    { name: 'start_year', label: 'Start Year', type: 'text' },
    { name: 'impact', label: 'Impact', type: 'text' },
    { name: 'added', label: 'Added', type: 'date' },
    { name: 'published', label: 'Published', type: 'date' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'relevance', label: 'Relevance', type: 'number' },
    { name: 'pestle', label: 'Pestle', type: 'text' },
    { name: 'source', label: 'Source', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'likelihood', label: 'Likelihood', type: 'number' },
    { name: 'swot', label: 'SWOT', type: 'text' },
    { name: 'city', label: 'City', type: 'text' }
  ];
  constructor(private fb: FormBuilder, private dataService: VisualDataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      end_year: [''],
      intensity: [''],
      sector: [''],
      topic: [''],
      insight: [''],
      url: [''],
      region: [''],
      start_year: [''],
      impact: [''],
      added: [''],
      published: [''],
      country: [''],
      relevance: [''],
      pestle: [''],
      source: [''],
      title: [''],
      likelihood: [''],
      swot: [''],
      city: ['']
    });
    this.updateDataForm = this.fb.group({
      end_year: [''],
      intensity: [''],
      sector: [''],
      topic: [''],
      insight: [''],
      url: [''],
      region: [''],
      start_year: [''],
      impact: [''],
      added: [''],
      published: [''],
      country: [''],
      relevance: [''],
      pestle: [''],
      source: [''],
      title: [''],
      likelihood: [''],
      swot: [''],
      city: ['']
    });
    this.loadData();
  }

  formatDate(dateString: string): string | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date string: ${dateString}`);
      return null;
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd'); // Format as YYYY-MM-DD
  }

  private loadData() {
    this.dataService.getData().subscribe(
      (data: DataItem[]) => {
        this.data = data;
        this.initialData = data;
        this.processData(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }

  applyFilters(): void {
    this.filtersApplied = true;
    this.dataService.getData().subscribe(data => {
      this.filteredData = [...data];
      if (this.filters.endYear) {
        this.filteredData = this.filteredData.filter((item: DataItem) =>
          item.end_year && item.end_year.toString() === this.filters.endYear.toString()
        );
      }
      if (this.filters.topics) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.topic.toLowerCase().includes(this.filters.topics.toLowerCase()));
      }
      if (this.filters.sector) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.sector.toLowerCase().includes(this.filters.sector.toLowerCase()));
      }
      if (this.filters.region) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.region.toLowerCase().includes(this.filters.region.toLowerCase()));
      }
      if (this.filters.pest) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.pestle.toLowerCase().includes(this.filters.pest.toLowerCase()));
      }
      if (this.filters.source) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.source.toLowerCase().includes(this.filters.source.toLowerCase()));
      }
      if (this.filters.swot) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.swot?.toLowerCase().includes(this.filters.swot.toLowerCase()));
      }
      if (this.filters.country) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.country.toLowerCase().includes(this.filters.country.toLowerCase()));
      }
      if (this.filters.city) {
        this.filteredData = this.filteredData.filter((item: DataItem) => item.city?.toLowerCase().includes(this.filters.city.toLowerCase()));
      }
      this.processData(this.filteredData || []);
    });
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      this.dataService.sendData(this.dataForm.value).subscribe(
        (res: any) => {
          console.log('Data submitted successfully', res);
          this.applyFilters();
          this.dataForm.reset();
          this.close();
          this.loadData();
          this.ShowToast(`Data Added Successfully 🎉🎉🎉`, 'success');
        }
      )
    } else {
      console.error('Form is invalid');
      this.ShowToast(`Form is Invalid !!!`, 'success');
    }
  }

  deleteData(id: string): void {
    if (confirm("Are You Confirm to Delete this Data ? "))
      this.dataService.deleteData(id).subscribe(
        response => {
          console.log(response.message);
          this.loadData();
          this.ShowToast(`Data Deleted Successfully !!!`, 'success');
        },
        error => {
          console.error('Error deleting data:', error.message);
          this.ShowToast(`There is Error in Deleting the Data`, 'error');
        }
      );
  }
  
  onUpdate(item: any): void {
    this.currentItem = item;
    this.updateDataForm.patchValue(item);
    this.updateModalOpen();
  }

  onUpdateData(): void {
    if (this.updateDataForm.valid) {
      this.updateData = this.updateDataForm.value;
      this.dataService.updatedata(this.currentItem._id, this.updateData).subscribe(
        response => {
          console.log('Update successful:', response);
          this.updateDataForm.reset();
          this.loadData();
          this.updateModalClose();
          this.ShowToast(`Data Updated Successfully !!!`, 'success');
        },
        error => {
          console.error('Update failed:', error);
          this.ShowToast(`Something error For Updating Data !!!`, 'error');
        }
      );
    } else {
      console.error('Form is not valid.');
    }
    this.processData(this.updateData);
  }

  processData(data: DataItem[]): void {
    const intensity: number[] = [];
    const likelihood: number[] = [];
    const relevance: number[] = [];
    const labels: string[] = [];
    const country: string[] = [];
    const end_date: string[] = [];
    data.forEach((item: DataItem) => {
      intensity.push(item.intensity);
      likelihood.push(item.likelihood);
      relevance.push(item.relevance);
      labels.push(item.topic);
      country.push(item.country);
      end_date.push(item.end_year);
    });
    this.barChartData[0].data = intensity;
    this.barChartData[1].data = likelihood;
    this.barChartData[2].data = relevance;
    this.barChartLabels = labels;
  }

  ShowToast(message: string, toastType: string) {
    this.message = message;
    this.toastType = toastType;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  async open(): Promise<void> {
    await this.modal?.open();
  }
  async updateModalClose(): Promise<void> {
    await this.updateModal?.close();
  }

  async updateModalOpen(): Promise<void> {
    await this.updateModal?.open();
  }
}