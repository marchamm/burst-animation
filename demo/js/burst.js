var burstConfig = {
  clones: 2,            // number of clones  
  randomize: false,      // if true, the number of clones will be +- 50% for each burst  
  spread: .8,           // spread of clones
  rotate: 480,          // rotation of clones starting from 0
  angle: 0,             // direction of burst in degrees, 0 only support at the moment
  opacity: .8,          // starting opacity of clone
  rate: .8,              // time between clones
  scale: .6,            // final clone size starting from 1
  scaleSpread: .6,      // level of variety in clone sizes
  velocity: .8,         // speed of clones
}

var triggers = document.getElementsByClassName('burst')
triggers = Object.keys(triggers).map(key => triggers[key])

triggers.forEach(function(element) {

  element.onclick = function() {
    burstConfig.clones = this.getAttribute("data-burst-clones") ? parseFloat(this.getAttribute("data-burst-clones")) : 2
    burstConfig.spread = this.getAttribute("data-burst-spread") ? parseFloat(this.getAttribute("data-burst-spread")) : .8
    burstConfig.rate = this.getAttribute("data-burst-rate") ? parseFloat(this.getAttribute("data-burst-rate")) : .8
    burstConfig.scale = this.getAttribute("data-burst-scale") ? parseFloat(this.getAttribute("data-burst-scale")) : .6
    burstConfig.velocity = this.getAttribute("data-burst-velocity") ? parseFloat(this.getAttribute("data-burst-velocity")) : .8

    clone(this)
  };

});

function clone(item) {

  var position = item.getBoundingClientRect();
  var element = item
  
  var i
  var velocity
  var rate
  var opacity = burstConfig.opacity
  var clones = burstConfig.randomize ? (burstConfig.clones * ( Math.random() + .5 ) ) : burstConfig.clones
  clones = parseInt(clones, 10)

  rate = 100 / burstConfig.rate 
  velocity = 4 / burstConfig.velocity * 1000
  
  var clone = {
    top: position.top, 
    left: position.left,
    width: element.offsetWidth,
    height: element.offsetHeight
  }
  
  var viewport = window.innerHeight
  var body = document.getElementsByTagName("BODY")[0]

  for (i = 0; i < clones; i++) {
    
    setTimeout(function(){
      
      var el = item.cloneNode(true);
      el.className += " clone";
      
      body.appendChild(el);
      
      el.style.top = clone.top+'px'
      el.style.left = clone.left+'px'
      el.style.width = clone.width+'px'
      el.style.opacity = opacity
      el.style.transitionDuration = velocity+'ms'
      el.style.position = 'fixed'
      el.style.transitionTimingFunction= 'cubic-bezier(.1,1,.1,1)'
      el.style.transitionProperty = 'transform, opacity'
      el.style.willChange = 'transform, opacity'
      el.style.pointerEvents = 'none'
      
      animate( el, viewport, clone)
      
    }, rate * i );
  }
 
}

function animate( el, viewport, clone ) {

    var spread
    var scale
    var angle
    var transformOrigin
    var rotate = burstConfig.rotate
    var removeDelay = 4 / burstConfig.velocity * 1000

    spread = Math.floor( Math.random() * (viewport/2*burstConfig.spread) )
    scale = burstConfig.scale + Math.random() * burstConfig.scaleSpread
    
    spread = Math.random() < 0.5 ? spread : spread * -1
    rotate = Math.random() < 0.5 ? rotate : rotate * -1
    transformOrigin = Math.random() < 0.5 ? 'top left' : 'top right'
  
    angle = ( clone.top + clone.height * 2 ) * -1

    el.offsetHeight // hack for transitions to work
    
    el.style.opacity = 1
    el.style.transform = "translate3d("+ spread +"px,"+ angle +"px,0) rotate("+ rotate +"deg) scale("+scale+")" 
    el.transformOrigin = transformOrigin
    
    setTimeout(function(){
      el.outerHTML = ""
    }, removeDelay)

}
