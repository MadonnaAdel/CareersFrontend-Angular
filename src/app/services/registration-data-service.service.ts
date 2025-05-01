import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataServiceService {

 
  private firstStepData: any = {}; 

  setFirstStepData(data: any) {
    sessionStorage.setItem('firstStepData', JSON.stringify(data)); 
  }

  getFirstStepData() {
    const data = sessionStorage.getItem('firstStepData'); 
    return data ? JSON.parse(data) : {}; 
  }

  resetData() {
    sessionStorage.removeItem('firstStepData'); 
  }
}
