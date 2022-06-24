const canvas = document.querySelector('canvas') // Grab canvas from DOM
const c = canvas.getContext('2d') // Get context to access 2D canvas functions
canvas.width = 1024 // Set canvas' width to full width of window
canvas.height = 576 // Set canvas' height to full height of window

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
  constructor({position, velocity, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 },}) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale 
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5 
    this.offset = offset
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
  
  update(){
    this.draw()
    this.animateFrames()
    
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0
    }else this.velocity.y += gravity
    
  }
}

const player = new Sprite({
  position: {
    x: 450,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  imageSrc: './img/Wizard Pack/Idle.png',
  framesMax: 6,
  offset: {
    x: 0,
    y: 104
  }, 
  scale: 1.8 
})

function animate(){
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
}
animate()