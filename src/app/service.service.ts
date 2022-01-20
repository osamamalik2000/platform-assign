import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {
    this.http.get('../assets/parent.json');
    this.http.get('../assets/child.json');
  }

  getParent() {
    return this.http.get('../assets/parent.json');
  }
  getChild() {
    return this.http.get('../assets/child.json');
  }
}
