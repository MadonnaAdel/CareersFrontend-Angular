import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CompanyserviceService } from "../../../services/companyservice.service";
import { OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.css",
})
export class NavBarComponent implements OnInit {
  company: any = {};
  theCompany: any = {};
  isNavbarCollapsed = true;
  companyId: string = "";
  constructor(private _companyService: CompanyserviceService) {}

  ngOnInit() {
    const companyInfo = localStorage.getItem("companyInfo");

    if (companyInfo) {
      this.company = JSON.parse(companyInfo);
      this._companyService
        .getCompanyDetails(this.company.id)
        .subscribe((response) => {
          if (response && response.message === "success") {
            this.theCompany = response.data;
            this.companyId = this.theCompany._id;
          }

        });
    }
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("authToken");
  }
}
