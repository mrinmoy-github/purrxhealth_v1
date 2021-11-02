import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-modifier',
  templateUrl: './quantity-modifier.component.html',
  styleUrls: ['./quantity-modifier.component.css']
})
export class QuantityModifierComponent implements OnInit {
  
  @Input() productId : number;

  @Input() quantity = 1;

  @Output() quantityChanged = new EventEmitter();
  
  private maxQty = 10;

  constructor() { }

  ngOnInit() {
  }
  public validateNumber(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = theEvent.clipboardData.getData('text/plain');
    } else if(theEvent.keyCode  == 8 || theEvent.keyCode == 46) {
      // handle backspae & delete
        return true;
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  public updateQuantity() {
    if(this.quantity) {
      const newData = {'productId' : this.productId, 'quantity' : this.quantity};
      this.quantityChanged.emit(newData);
    }
  }
  public decreaseQty() {
    this.quantity = isNaN(this.quantity) ? 1 : this.quantity;
    if(this.quantity > 1) {
      this.quantity--;
      this.updateQuantity();
    }
  }
  public increaseQty() {
    this.quantity = isNaN(this.quantity) ? 1 : this.quantity;
    if(this.quantity < this.maxQty) {
      this.quantity++;
      this.updateQuantity();
    }
  }

}
