import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
// import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownOpen: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) { }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Check if the clicked element is outside the dropdown
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Close the dropdown
      this.dropdownOpen = false;
    }
  }
  doToggleMenu() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
