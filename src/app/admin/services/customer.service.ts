import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    
    constructor(
        public http: ApiHttpService,
    ) { }

    allCustomers = [];
    getCustomers(pageObject: any) {
        let url = adminApi.customer.findAll;
        return this.http.get(url, pageObject);
    }

    getCustomerById(customerId: string) {
        const url = adminApi.customer.findOne + '/' + customerId;
        return this.http.get(url);
    }

    createCustomer(obj: any) {
        const body = obj;
        const url = adminApi.customer.create;
        return this.http.post(url, body);
    }

    updateCustomerById(obj: any) {
        const body = obj;
        const url = adminApi.customer.update + '/' + obj.id;
        return this.http.put(url, body);
    }

    deleteCustomerById(id:any){
        const url = adminApi.customer.remove+'/'+id;
        return this.http.delete(url);
      }


}
