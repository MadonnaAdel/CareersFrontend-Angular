import { Component } from "@angular/core";
import { CompanySidebarComponent } from "../../../components/SideBar/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-companyapplicants",
  standalone: true,
  imports: [RouterOutlet, CompanySidebarComponent],

  templateUrl: "./companyapplicants.component.html",
  styleUrl: "./companyapplicants.component.css",
})
export class CompanyapplicantsComponent {}
