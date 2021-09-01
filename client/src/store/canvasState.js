import { makeAutoObservable } from "mobx";

class CanvasState {
   canvas = null
   redoList = []
   undoList = []
   username = ''
   ws = null
   session = null

   constructor() {
      makeAutoObservable(this)
   }

   setUsername(name) {
      this.username = name
   }

   setWSocket = (ws) => {
      this.ws = ws
   }

   setSession = (sessionId) => {
      this.session = sessionId
   }

   setCanvas(canvas) {
      this.canvas = canvas
   }

   pushToRedo(data) {
      this.redoList.push(data)
   }

   pushToUndo(data) {
      this.undoList.push(data)
   }
   undo() {
      let ctx = this.canvas.getContext('2d')
      if (this.undoList.length > 0) {
         let dataURL = this.undoList.pop()
         this.redoList.push(this.canvas.toDataURL())
         let img = new Image()
         img.src = dataURL
         img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
         }
      } else {
         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
   }

   redo() {
      let ctx = this.canvas.getContext('2d')
      if (this.redoList.length > 0) {
         let dataURL = this.redoList.pop()
         this.undoList.push(this.canvas.toDataURL())
         let img = new Image()
         img.src = dataURL
         img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
         }
      }
   }
}

export default new CanvasState()