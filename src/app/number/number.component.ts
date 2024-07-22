import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Country } from '../classes/country';
import { FormsModule, NgModel } from '@angular/forms';
import { NumberInForm } from '../classes/number';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [MatButton, FormsModule],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})

export class NumberComponent implements OnInit {
  countriesList!:Country[];
  constructor(private countryService:CountryService){}

  numberInForm:NumberInForm=new NumberInForm();
  countryName:string='';

  generatedNumbers:string[]=[];

  ngOnInit(): void {
    this.countriesList=this.countryService.getAllCountries()
    console.log(this.countriesList)
  }
  fetchCountryByName(name: string):Country | undefined{
    return this.countriesList.find(country => country.name === name);
  }
  generateNumbers(){
    this.numberInForm.countrySelected=this.fetchCountryByName(this.countryName);
    console.log(this.numberInForm.countrySelected.name)
    this.generatedNumbers=[];
    for (let index = 1; index < (this.numberInForm.numberCount+1); index++) {
      const numberToAdd = `${this.numberInForm.countrySelected.dialCode} ${this.getRandomDigits(this.numberInForm.countrySelected.dialCodeLength)}`;
      this.generatedNumbers.push(numberToAdd);
    }
    this.print()
  }

  print(){
      this.generatedNumbers.forEach(element => {
        console.log(element)
      });
  }
  // Function to generate a random sequence of digits of a specified length
  getRandomDigits(lengthOrArray: number | number[]): string | string[] {
    if (Array.isArray(lengthOrArray)) {
      // Handle array input (multiple lengths)
      const results: string[] = [];
  
      lengthOrArray.forEach((length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
          const digit = Math.floor(Math.random() * 10); // Generates a random digit (0-9)
          result += digit.toString(); // Append the digit to the result string
        }
        results.push(result); // Store each result in the array
      });
  
      return results;
    } else {
      // Handle single number input (single length)
      const length = lengthOrArray;
      let result = '';
      for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10); // Generates a random digit (0-9)
        result += digit.toString(); // Append the digit to the result string
      }
      return result;
    }
  }
  
  selectAll(){
    const copyArea: HTMLTextAreaElement = document.getElementById('copyArea') as HTMLTextAreaElement;
    copyArea.value = this.generatedNumbers.join('\n');
    copyArea.select();
  }
  copyToClipboard(){
    const copyArea: HTMLTextAreaElement = document.getElementById('copyArea') as HTMLTextAreaElement;
    copyArea.value = this.generatedNumbers.join('\n');
    copyArea.select();
    document.execCommand('copy');
  }
}
