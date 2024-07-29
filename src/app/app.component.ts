import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../Dashboard/dashboard/dashboard.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, DashboardComponent, FooterComponent]
})
export class AppComponent {
  title = 'visualize_dashboard';
}
