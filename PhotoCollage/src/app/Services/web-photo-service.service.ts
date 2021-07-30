import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebPhotoService {
  private API_Key: string = environment.PIXABAY_API_KEY;
  private API_URL: string = environment.PIXABAY_API_URL;

  constructor(private http: HttpClient) {}

  getImages = async (query, amountOfResults = 20) =>
    await this.http.get(
      `${this.API_URL}${this.API_Key}&q=${query}&per_page=${amountOfResults}`
    );
}
