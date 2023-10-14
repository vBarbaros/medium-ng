import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-opportunity-cost-calculator',
  templateUrl: './opportunity-cost-calculator.component.html',
  styleUrls: ['./opportunity-cost-calculator.component.css']
})
export class OpportunityCostCalculatorComponent implements OnInit {

  myForm: FormGroup;
  referenceValue: FormControl;
  referenceName: FormControl | undefined;
  newItemValue: FormControl | undefined;
  newItemName: FormControl | undefined;
  conclusionIsReady: boolean = false;

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      'referenceValue': [null, Validators.nullValidator],
      'referenceName': ['', Validators.nullValidator],
      'newItemValue': [null, Validators.nullValidator],
      'newItemName': ['',Validators.nullValidator ],
    });
    this.referenceValue = this.myForm.controls['referenceValue'] as FormControl;
  }

  ngOnInit() {
    // @ts-ignore
    this.referenceValue.valueChanges.subscribe(value => {
      // Make sure the control exists before using it
      this.referenceName = value.referenceName;
      this.referenceValue = value.referenceValue;
      this.newItemName = value.newItemName;
      this.newItemValue = value.newItemValue;
    });
  }

  onSubmit(form: any): void {
    this.referenceName = form.referenceName.value;
    this.referenceValue = form.referenceValue.value;
    this.newItemName = form.newItemName.value;
    this.newItemValue = form.newItemValue.value;
  }

  resetForm() {
    this.myForm.reset();
  }

  calculateQuantity(): String {
    const referenceValue = this.myForm.value.referenceValue;
    const newItemValue = this.myForm.value.newItemValue;
    let finalWorthItMessage = 'By choosing differently, you could afford  ';
    if (referenceValue >= newItemValue && referenceValue > 0 && newItemValue > 0) {
      finalWorthItMessage += this.formatDecimal(referenceValue / newItemValue);
    } else if (referenceValue < newItemValue && referenceValue > 0 && newItemValue > 0) {
      finalWorthItMessage += this.formatDecimal(newItemValue / referenceValue);
    }
    finalWorthItMessage += ' ' + this.myForm.value.referenceName + '(s) instead of just one ' + this.myForm.value.newItemName;
    finalWorthItMessage += ' illustrating the substantial opportunity cost you gain.';
    return finalWorthItMessage;
  }

  areFormControlsValid(): boolean {
    const formControls = this.myForm.controls;
    if (formControls['referenceName'].value !== null &&
      formControls['referenceValue'].value !== null &&
      formControls['newItemName'].value !== null &&
      formControls['newItemValue'].value !== null) {
      return (
        formControls['referenceName'].value !== null &&
        formControls['referenceValue'].value !== null &&
        formControls['newItemName'].value !== null &&
        formControls['newItemValue'].value !== null
      );
    }
    return false;
  }

  formatDecimal(decimalNumber: number): string {
    // Use the toFixed method to format the number to two decimal places
    return decimalNumber.toFixed(2);
  }
}
