import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BackendapiService {

  //for Live
  API_URL = "https://www.purrxhealth.com/backend/api/";
  BASE_URL = "https://www.purrxhealth.com/backend/public/";
  
  //for staging
  //API_URL = "https://store.purcbdhealth.com/backend/api/";
  //BASE_URL = "https://store.purcbdhealth.com/backend/public/";
  
  //for local
  //API_URL = "http://127.0.0.1:8000/api/";
  //BASE_URL = "http://127.0.0.1:8000/";
  //API_URL = "https://purcbd.localhost.com/api/";
  //BASE_URL = "https://purcbd.localhost.com/";

  SITENAME = "PurRX";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };


  private dataSource = new BehaviorSubject("");
  currentMessage = this.dataSource.asObservable();
  constructor(private httpClient: HttpClient) {}

  commonDataFetchFn(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  commonDataPostFn(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  commonDataPostByGETFn(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getSiteName(): any {
    return this.SITENAME;
  }

  getCountryList(requiredCountries = ""): any {
    if (requiredCountries !== "") {
      return this.httpClient.get(
        this.API_URL + "getCountryList?id=" + requiredCountries
      );
    } else {
      return this.httpClient.get(this.API_URL + "getCountryList");
    }
  }

  getStateList(countryCode): any {
    return this.httpClient.get(this.API_URL + "getStateList?id=" + countryCode);
  }

  getUserData(method, email): any {
    return this.httpClient.get(this.API_URL + method + "?email=" + email);
  }

  getProducts(method, params = ""): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getProduct(method, id): any {
    return this.httpClient.get(this.API_URL + method + "?id=" + id);
  }

  getAccessContents(method, params = ""): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getAccessContent(method, id): any {
    return this.httpClient.get(this.API_URL + method + "?id=" + id);
  }

  getCategories(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getHotCategories(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  addToCart(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  isAddedToCart(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getCartCount(method): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getCms(method, slug): any {
    return this.httpClient.get(this.API_URL + method + "?slug=" + slug);
  }

  getSettings(method, params = ""): any {
    return this.httpClient.get(this.API_URL + method);
  }

  getBaseUrl(): any {
    return this.BASE_URL;
  }

  updateData(message: any) {
    this.dataSource.next(message);
  }

  postContactForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  postLoginForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  postSigninForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  updateShippingInfoForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }
  updateBillingInfoForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  deleteBillingInfoForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }

  postMembershipOrderForm(method, model): any {
    return this.httpClient.post(this.API_URL + method, model, this.httpOptions);
  }
}
