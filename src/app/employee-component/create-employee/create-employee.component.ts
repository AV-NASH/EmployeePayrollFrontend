import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlDirective, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserserviceService } from '../../Services/userervice/userservice.service'
import { Employee } from "../../Employee";
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox:QueryList<any>;
  id: any;
  a: boolean = false;
  employee: Employee = new Employee();
  submitted = false;
  userDetail: FormGroup;
  checked = [];
  precio = 0;
  isEdit: Boolean;
  isDisabled:Boolean;
  departments: string[] =[]
  department =['Hr','Sales', 'Finance', 'Engineer','Other'];
  

  constructor(private employeeService: UserserviceService,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userDetail = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(2),
      Validators.pattern('(^[A-Z])([a-zA-Z]){2,}')])],
      salary: [null, Validators.required],
      gender: [null, Validators.required],
      day: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      notes:[null,Validators.required],
      profilepic:[null,Validators.required]

    });

    this.route.params.subscribe(param => {
      console.log(param)
      if (param && param.id) {
        console.log("inside if")
        this.employeeService.getEmployee(param.id).subscribe((response: any) => {
          console.log(response)
          this.id = param.id;
          this.isEdit = true;
          this.userDetail.controls["name"].setValue(response.name)
           this.userDetail.controls["salary"].setValue(response.salary)
           this.userDetail.controls["gender"].setValue(response.gender)
           var str = response.startDate;
           var splited: [0, 1, 2] = str.split(" ");
          // console.log("splitted is", splited)
           this.departments = response.department;         
             this.userDetail.controls["day"].setValue(splited[0])
          this.userDetail.controls["month"].setValue(splited[1])
          this.userDetail.controls["year"].setValue(splited[2])
          this.userDetail.controls["notes"].setValue(response.notes)
          this.userDetail.controls["profilepic"].setValue(response.profilepic)

        })
      }
    })

  } 

  getCheckbox(){
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => {
      console.log(data.value)
      var a=data.value;
      this.checked.push(a)
    })
  }

  getPrecio(event) {
    this.precio = event.value;
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  

  Day = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  Month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov.',
    'Dec',
  ];

  Year = [
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
  ];

  Department = [
    'Hr',
    'Sales',
    'Finance',
    'Engineer',
    'Other',
  ];

  register() {
    console.log(this.checked)
    var x = this.checked
    console.log(x)
    var employeeDto = {
      'name': this.userDetail.controls['name'].value,
      'salary': this.precio,
      'department':this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'notes':this.userDetail.controls['notes'].value,
      'profilepic':this.userDetail.controls['profilepic'].value
    };           
    console.log("employee dto is", employeeDto)
    this.employeeService.createEmployee(employeeDto).subscribe((response: any) => {
      this.router.navigate(["/"]);
      console.log("response",response.object)
    })
  }

  update() {
    this.getCheckbox();
    console.log(this.checked)
    var x = this.checked
    console.log(x)
    var employeeDto = {
      'name': this.userDetail.controls['name'].value,
      'salary': this.userDetail.controls['salary'].value,
      'department': this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'notes':this.userDetail.controls['notes'].value,
      'profilepic':this.userDetail.controls['profilepic'].value,
      'id': this.id,
    
    };
    console.log(employeeDto.department+" "+employeeDto.notes+" "+employeeDto.salary+" "+employeeDto.startDate);
    this.employeeService.updateEmployee(employeeDto).subscribe((response: any) => {
      console.log("response is " + response);
      this.router.navigate(["/"]);

    })
  }


  onSubmit() {
    this.submitted = true;
    this.register();
  }
  reset(){
    this.userDetail.reset();
  }

  toggleCheckBox(dept){
    return (this.departments.includes(dept)) ? true : false;
 }

 reviewButton(){
   this.isDisabled=true;
   if(!(this.userDetail.controls['name'].value===null)&&!(this.userDetail.controls['salary'].value===0)&&!(this.userDetail.controls['gender'].value===null)
   &&!(this.userDetail.controls['day'].value===null)&&!(this.userDetail.controls['month'].value===null)&&!(this.userDetail.controls['year'].value===null)
   &&!(this.userDetail.controls['notes'].value===null)&&!(this.userDetail.controls['profilepic'].value===null)){
     this.isDisabled=false;
   }
   return this.isDisabled;
 }

}
