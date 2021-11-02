import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class LocalCartService {

  constructor() {}

  addToCart(product_id: number, quantity: number, billingModel= null):boolean{
    let _response: boolean = false;
    product_id = product_id || 0;
    quantity = quantity || 0;
    if(product_id > 0 && quantity > 0){
      let _cart = localStorage.getItem('ab_cart');
      let _products: any = [];
      if(_cart && _cart != "[]"){
        _cart = JSON.parse(_cart);
        let _isFound = false;
        for(let i= 0; i < _cart.length; i++){
          if(_cart[i]['product_id'] == product_id){
            let _tmpCart = _cart[i]
            _tmpCart['quantity'] = quantity;
            _tmpCart['billing_model'] = billingModel ? billingModel : _tmpCart['billing_model'];
            _products.push(_tmpCart);
            _isFound = true;
          }
          else{
            _products.push(_cart[i]);
          }
        }
        if(!_isFound){
          let _tmpCart = {
            "product_id" : product_id,
            "quantity" : quantity,
            "billing_model" : billingModel,
          };
          _products.push(_tmpCart);
        }
      }
      else{
        _products = [{
          "product_id" : product_id,
          "quantity" : quantity,
          "billing_model" : billingModel
        }];
      }
      localStorage.removeItem('ab_cart');
      localStorage.setItem('ab_cart', JSON.stringify(_products));
      _response = true;
    }
    return _response;
  }

  removeFromCart(product_id: number){
    let _response: boolean = true;
    product_id = product_id || 0;
    if(product_id > 0){
      let _cart = localStorage.getItem('ab_cart');
      let _products: any = [];
      if(_cart && _cart != "[]"){
        _cart = JSON.parse(_cart);
        for(let i= 0; i < _cart.length; i++){
          if(_cart[i]['product_id'] == product_id){
            ; // Do Nothing
          }
          else{
            _products.push(_cart[i]);
          }
        }
      }
      localStorage.removeItem('ab_cart');
      localStorage.setItem('ab_cart', JSON.stringify(_products));
      _response = true;
    }
    return _response;
  }

  getCart(){
    let _response = [];
    let _cart = localStorage.getItem('ab_cart');
    if(_cart && _cart != "[]"){
      _response = JSON.parse(_cart);
    }
    return _response;
  }

  clearCart(){
    localStorage.removeItem('ab_cart');
  }

  getCount(){
    let _cart = localStorage.getItem('ab_cart');
    let _count = 0;
    if(_cart != undefined && _cart != "[]"){
      _cart = JSON.parse(_cart);
      _count = _cart.length;
    }
    return _count;
  }

  checkProductExists(product_id: number):boolean{
    let _response : boolean = false;
    let _cart = this.getCart();
    if(_cart != []){
      for(let i= 0; i < _cart.length; i++){
        if(_cart[i]['product_id'] == product_id){
          _response = true;
          break;
        }
      }
    }
    return _response;
  }

  addInformationToCartProduct(product_id: number, _extraInfo: any){
    let _cart = this.getCart();
    if(_cart != []){
      let _products : any = [];
      for(let i= 0; i < _cart.length; i++){
        if(_cart[i]['product_id'] == product_id){
          let _tmpCart = {
            "product_id" : product_id,
            "quantity" : _cart[i]['quantity'],
            "billing_model" : _cart[i]['billing_model'],
            "extra" : _extraInfo
          };
          _products.push(_tmpCart);
        }
        else{
          _products.push(_cart[i]);
        }
      }
      localStorage.removeItem('ab_cart');
      localStorage.setItem('ab_cart', JSON.stringify(_products));
    }
  }

  getProduct(product_id:number){
    let _cart = this.getCart();
    let _response = {};
    if(_cart != []){
      for(let i= 0; i < _cart.length; i++){
        if(_cart[i]['product_id'] == product_id){
          _response = _cart[i];
          break;
        }
      }
    }
    return _response;
  }

  removeExtra(product_id:number){
    let _cart = this.getCart();
    if(_cart != []){
      let _products : any = [];
      for(let i= 0; i < _cart.length; i++){
        if(_cart[i]['product_id'] == product_id){
          let _tmpCart = {
            "product_id" : product_id,
            "quantity" : _cart[i]['quantity'],
            "billing_model" : _cart[i]['billing_model'],
          };
          _products.push(_tmpCart);
        }
        else{
          _products.push(_cart[i]);
        }
      }
      localStorage.removeItem('ab_cart');
      localStorage.setItem('ab_cart', JSON.stringify(_products));
    }
  }
  removeOutOfStockProduct(outOfStockItems) {
    let availableProducts = JSON.parse(localStorage.getItem('ab_cart')).filter(item => outOfStockItems.indexOf(item.product_id) > -1);
    localStorage.setItem('ab_cart', JSON.stringify(availableProducts));
  }
}
