import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Allergy, PatientIntialCheckup } from 'src/app/Models/database.models';
import { AllergyService } from 'src/app/Service/allergy.service';
import { NurseService } from 'src/app/Service/nurse.service';
import { PatientServicesService } from 'src/app/Service/patient-services.service';

@Component({
  selector: 'app-view-check-up',
  templateUrl: './view-check-up.component.html',
  styleUrls: ['./view-check-up.component.css']
})


export class ViewCheckUpComponent implements OnInit{

  allergy:Allergy[]=[];
  checkupdata:PatientIntialCheckup={
    picId :'',
    appointmentId :'',
    height :0,
    weight :0,
    temperature :0,
    spo2 :0,
    bloodPressure :'',
    sugarLevel :0,
    additionalDetails :'',
    chechupStatus :false,
  }
  dummydata:any;
  appointmentId:string|any='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private checkupservice:NurseService,private allergyService:AllergyService){
    this.appointmentId=this.data.dataKey
    console.log(this.appointmentId)
  }
  status:string='';
  ngOnInit(): void {

    this.checkupservice.getCheckupInfo(this.appointmentId).subscribe({
      next:(response)=>{
        console.log(response);
        this.checkupdata=response;
        console.log(this.checkupdata)

      }
    })
    this.allergyService.getAllAllergy(this.appointmentId).subscribe({
      next:(response)=>{
        console.log(response);
        if(response!=null)
        {
          this.allergy=response;
        }
      }
    })
  }
}
