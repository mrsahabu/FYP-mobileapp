import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
	public detectedImage;
	private dataForm: FormGroup;
	cid: AbstractControl;
	readingType: AbstractControl;
	divison: AbstractControl;
	subdivison: AbstractControl;
  reading: AbstractControl;
  public customerId;
	
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public form_builder: FormBuilder,
  	public http: HttpClient) {

  	// let image=this.navParams.get('image');
 		this.detectedImage = this.navParams.data;
		this.dataForm = this.form_builder.group({

			cid: ['', Validators.compose([Validators.minLength(15),Validators.maxLength(15), Validators.required])],
			readingType: ['', Validators.required],
      reading: ['', Validators.required],
			divison: ['', Validators.required],
			subdivison: ['',Validators.required],
			checked: [false, Validators.compose(
				[Validators.pattern('true'), Validators.required])]});

  	this.getReading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  getReading(){
   var  response=this.navParams.get('response');
   debugger
    this.reading = response.response;
    this.customerId = response.customerId;
  }

  getUrl(url){
  	return this.http.post<any>(url,{});
  	
  }
  submit(){

  }
}
