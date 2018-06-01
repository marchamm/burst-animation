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
  var opacity = burstConfig.opacity
  var clones = burstConfig.randomize ? (burstConfig.clones * ( Math.random() + .5 ) ) : burstConfig.clones
  
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
