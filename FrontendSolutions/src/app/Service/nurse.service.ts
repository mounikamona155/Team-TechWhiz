import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Appointment, Patient } from '../Models/database.models';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  baseApiUrl:string=environment.baseApiUrl1;

  constructor(private http:HttpClient) { }

  getAllAppointmets(datee:string):Observable<Appointment[]>
  {
    let header=new HttpHeaders({
      'Content-Type':'application/json',
      'resposneType':'json',
      'date1':datee
    });
    

    return this.http.get<Appointment[]>(this.baseApiUrl+'/Appointment/getappointmentsbyDate',{headers:header});
  }
 
}
