import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http : ApiHttpService
  ) { }

  post(file: File){
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(adminApi.upload, formData);
  };

  get(){
    const url = adminApi.upload;
    return this.http.get(url);
  };
  
}
