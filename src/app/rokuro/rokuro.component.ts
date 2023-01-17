import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {interval} from 'rxjs';

type Coordinate = {x: number, y: number}

@Component({
  selector: 'app-rokuro',
  templateUrl: './rokuro.component.html',
  styleUrls: ['./rokuro.component.css']
})
export class RokuroComponent implements AfterViewInit{

  @ViewChild('rokuro')
  rokuro: ElementRef<HTMLCanvasElement> | undefined;
  context: CanvasRenderingContext2D | null | undefined;

  @ViewChild('rokuroBase')
  rokuroBase: ElementRef<HTMLCanvasElement> | undefined;
  baseContext: CanvasRenderingContext2D | null | undefined;

  start: Coordinate  | null = null
  ngAfterViewInit() {
    const canvasElm = this.rokuro?.nativeElement;
    this.context = canvasElm?.getContext('2d');
    const baseCanvasElm = this.rokuroBase?.nativeElement;
    this.baseContext = baseCanvasElm?.getContext('2d');
    this.drowRokuro()
  }

  drowRokuro() {
    const ctx = this.context;
    const baseCtx = this.baseContext
    if(!ctx || !baseCtx) return;

    this.drawBase()

    let degree = 0



    interval(10)
      .subscribe(() => {
        ctx.save()
        this.drawBase()
        ctx.beginPath()

        ctx.translate( 250, 250 ) ;
        ctx.rotate( ++degree * Math.PI / 45 ) ;
        ctx.translate( -250, -250 ) ;



        ctx.restore() ;
      })
  }

  drawBase() {
    const baseCtx = this.baseContext
    if(!baseCtx) return;
    baseCtx.fillStyle = '#000000'
    baseCtx.rect(245, 0, 10, 250)
    baseCtx.fillRect(245, 0, 10, 500)
    baseCtx.fillRect(0, 245, 500, 10)

    baseCtx.fillStyle = '#ffffff'
    baseCtx.arc( 250, 250, 240, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    baseCtx.fill()
  }

  onMouseDown(e: MouseEvent) {
    this.start = {x: e.offsetX, y: e.offsetY}
  }

  onMouseMove(e: MouseEvent) {
    this.drawPen(e)
  }

  onMouseUp() {
    this.start = null
  }

  // drawCanvasエリア描画(ペン)
  drawPen(e: MouseEvent) {
    const drawCtx = this.context
    if(!drawCtx || !this.isDrawing(this.start)) return
    const brushSize = 10
    const canvasRgba = '#000000'

    drawCtx.restore()

    drawCtx.lineWidth = brushSize;
    drawCtx.strokeStyle = canvasRgba;
    drawCtx.lineJoin = "round";
    drawCtx.lineCap = "round";
    drawCtx.globalCompositeOperation = 'source-over';
    drawCtx.beginPath();
    drawCtx.moveTo(this.start.x, this.start.y); // 開始座標（前回座標）
    drawCtx.lineTo(e.offsetX, e.offsetY); // 終了座標（現在座標）
    drawCtx.stroke(); // 直線を描画
    drawCtx.closePath();


    // 次の描画に向けて現在の座標を保持（開始・終了を同じ座標で描画すると、マウスを高速に移動したときに歯抜け状態になる）
    this.start = {x: e.offsetX, y: e.offsetY};
  }

  isDrawing(coordinate: Coordinate| null): coordinate is Coordinate {
    return !!coordinate
  }
}
