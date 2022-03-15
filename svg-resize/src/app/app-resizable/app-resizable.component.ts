import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, from, fromEvent, ignoreElements, of, repeat, skipUntil, Subscription, switchMap, take, takeLast, takeUntil, takeWhile, timer } from 'rxjs';
import { Status } from '../enums/status.enums';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-resizable',
  templateUrl: './app-resizable.component.html',
  styleUrls: ['./app-resizable.component.scss']
})
export class AppResizableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input('width') public width: number = 0;
  @Input('height') public height: number = 0;
  @Input('left') public left: number = 0;
  @Input('top') public top: number = 0;
  @Output() updateData: EventEmitter<Object> =  new EventEmitter<Object>()
  @ViewChild("rectangle") public rectangle: ElementRef;
  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };
  public mouse: { x: number, y: number }
  public status: Status = Status.OFF;
  public stokeWidth = 3;
  private mouseup: Subscription;
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  ngOnDestroy(): void {
    this.mouseup?.unsubscribe();
  }

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
  }

  private loadBox() {
    const { left, top } = this.rectangle.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
  }

  private loadContainer() {
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 1380;
    const bottom = top + 900;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else this.loadBox();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) this.resize();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    console.log('this.width: ', this.width);
    console.log('this.height: ', this.height);
    console.log('this.top: ', this.top);
    console.log('this.left: ', this.left);
    let url = 'https://jsonplaceholder.typicode.com/todos/1';
    this.updateData.emit({
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left
    })
    // this.mouseup =  this.http.get(url).subscribe(data => {
    //   console.log('data: ', data);
    // })

  }

  private resize() {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
    }
  }


  private resizeCondMeet() {
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }
}
