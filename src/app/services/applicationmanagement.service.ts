import { Injectable } from '@angular/core';
import { environment} from "../../environments/environment";
import { HttpClient} from "@angular/common/http";
import { AnnouncementModel} from "../models/announcement.model";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationmanagementService {

  db = environment.firebase.databaseURL;


  constructor(private _http: HttpClient) { }

  getAnnouncements(): Observable<AnnouncementModel> {
    return this._http.get<AnnouncementModel>(this.db + 'application_management.json');
  }

  createAnnouncement(announcement: AnnouncementModel): Observable<any> {
    return this._http.post(this.db + 'application_management.json', announcement);
  }

  updateAnnouncement(announcement: AnnouncementModel): Observable<any> {
    return this._http.put(this.db + 'application_management/' + announcement.key + '.json', announcement);
  }

  deleteAnnouncement(announcement: AnnouncementModel): Observable<any> {
    return this._http.delete(this.db + 'application_management/' + announcement.key + '.json');
  }
}
