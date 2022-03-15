import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'svg-resize';

  public initialdata :{
    width: number,
    height: number,
    left: number,
    top: number,
    id: number,
  } = {
    "width" : 200 ,
    "height": 150,
    "left": 100,
    "top": 100,
    "id": 1
  };
  constructor( public dataService: DataService){}

  ngOnInit() { 
    this.dataService.getRectangleData().subscribe((data: any)=>{
      console.log('data: ', data);
      this.initialdata = data?.length ? {...data[0] }: {... this.initialdata};
    })
  }
  ngOnDestroy(): void {
  }

  updateRectangleData(event: Object){
    console.log('event: ', event);
    let data = {...event, id: this.initialdata.id};
    this.dataService.updateRectangleData(data).subscribe((data: any)=>{
      console.log('data: updated ', data);
      this.initialdata = data?.length ? {...data[0] }: {... this.initialdata};
    })
  }


}
