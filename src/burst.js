var config = {
  clones: 2,            // number of clones  
  randomize: true,      // if true, the number of clones will be +- 50% for each burst  
  spread: .8,           // spread of clones
  rotate: 480,          // rotation of clones starting from 0
  angle: 0,             // direction of burst in degrees, 0 only support at the moment
  opacity: .8,          // starting opacity of clone
  rate: .8,              // time between clones
  scale: .6,            // final clone size starting from 1
  scaleSpread: .6,      // level of variety in clone sizes
  velocity: .8,         // speed of clones
}

var triggers = document.getElementsByClassName('burst');
for(var i = 0; i < triggers.length; i++) {
  var element = triggers[i];   
  element.onclick = function() {
    clone(this)
  };
}

function clone(item) {
  
  var position = item.getBoundingClientRect();
  var element = item
  
  var i
  var velocity
  var rate
  var opacity = config.opacity
  var clones = config.randomize ? (config.clones * ( Math.random() + .5 ) ) : config.clones
  
  rate = 100 / config.rate 
  velocity = 4 / config.velocity * 1000
  
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
    var rotate = config.rotate
    var removeDelay = 4 / config.velocity * 1000

    spread = Math.floor( Math.random() * (viewport/2*config.spread) )
    scale = config.scale + Math.random() * config.scaleSpread
    
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
