
var defaultConfig = {
  clones: 4,            // number of clones  
  randomClones: true,   // number of clones will differ by 0-50% for each burst
  spread: 0.8,            // spread of clones
  rotate: 480,          // rotation of clones starting from 0
  angle: 0,             // direction of burst in degrees, 0 only support at the moment
  opacity: 1,           // end opacity of clone
  origin: 'element',    // burst starting point
  element: null,        // element to use as clone
  rate: 80,             // time between clones
  scale: 1,             // final clone size starting from 1
  randomScale: true,    // final clone size will differ by 0-50% for each clone
  time: 8,              // time of animation for each clone
}

var burstConfig = {
  clones: 4,            // number of clones  
  randomClones: true,   // number of clones will differ by 0-50% for each burst
  spread: 0.8,            // spread of clones
  rotate: 480,          // rotation of clones starting from 0
  angle: 0,             // direction of burst in degrees, 0 only support at the moment
  opacity: 1,           // end opacity of clone
  origin: 'element',    // burst starting point
  element: null,        // element to use as clone
  rate: 80,             // time between clones
  scale: 1,             // final clone size starting from 1
  randomScale: true,    // final clone size will differ by 0-50% for each clone
  time: 8,              // time of animation for each clone
}

var triggers = Object.keys(document.getElementsByClassName('burst')).map(key => document.getElementsByClassName('burst')[key])

triggers.forEach(function(element) {

  element.onclick = function() {
    burstConfig.clones = this.getAttribute("data-burst-clones") ? parseFloat(this.getAttribute("data-burst-clones")) : defaultConfig.clones
    burstConfig.spread = this.getAttribute("data-burst-spread") ? parseFloat(this.getAttribute("data-burst-spread")) : defaultConfig.spread
    burstConfig.rate = this.getAttribute("data-burst-rate") ? parseFloat(this.getAttribute("data-burst-rate")) : defaultConfig.rate
    burstConfig.time = this.getAttribute("data-burst-time") ? parseFloat(this.getAttribute("data-burst-time")) : defaultConfig.time
    burstConfig.scale = this.getAttribute("data-burst-scale") ? parseFloat(this.getAttribute("data-burst-scale")) : defaultConfig.scale
    burstConfig.opacity = this.getAttribute("data-burst-opacity") ? parseFloat(this.getAttribute("data-burst-opacity")) : defaultConfig.opacity
    burstConfig.randomScale = this.getAttribute("data-burst-randomScale") === 'false' ? false : defaultConfig.randomScale
    burstConfig.randomClones = this.getAttribute("data-burst-randomClones") === 'false' ? false : defaultConfig.randomClones
    burstConfig.origin = this.getAttribute("data-burst-origin") ? this.getAttribute("data-burst-origin") : defaultConfig.origin
    burstConfig.element = this.getAttribute("data-burst-element") ? this.getAttribute("data-burst-element") : defaultConfig.element
    
    var item = (burstConfig.element != defaultConfig.element) ? document.querySelector(burstConfig.element) : this
    clone(item)

  };

});

function clone(item) {

  var transitionTimingFunction = 'cubic-bezier(.1,1,.1,1)'
  var zIndex = parseInt(Math.random() * 100)
  var rate = burstConfig.rate
  var opacity = burstConfig.opacity
  var time = burstConfig.time
  var clones = burstConfig.randomize ? parseInt((burstConfig.clones * ( Math.random() + .5 ) ), 10) : burstConfig.clones

  var position = item.getBoundingClientRect();
  var clone = {
    top: position.top, 
    left: position.left,
    width: item.offsetWidth,
    height: item.offsetHeight
  }

  var viewport = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  var body = document.getElementsByTagName("BODY")[0]

  for (var i = 0; i < clones; i++) {

    setTimeout(function(){

      if (burstConfig.origin === 'top') {
        clone = {
          top: -clone.height,
          left: Math.floor( Math.random() * viewport.width ),
          width: item.offsetWidth,
          height: item.offsetHeight
        }
        transitionTimingFunction = 'cubic-bezier(.63,.01,.72,.28)'
      } else if (burstConfig.origin === 'bottom') {
        clone = {
          top: viewport.height,
          left: Math.floor( Math.random() * viewport.width ),
          width: item.offsetWidth,
          height: item.offsetHeight
        }
        transitionTimingFunction = 'cubic-bezier(.1,1,.1,1)'
      }
      
      var el = item.cloneNode(true);
      el.className += " clone";
      
      body.appendChild(el);
      
      el.style.top = clone.top+'px'
      el.style.left = clone.left+'px'
      el.style.width = clone.width+'px'
      el.style.opacity = 1
      el.style.display = 'block'
      el.style.zIndex = zIndex
      el.style.transitionDuration = time+'s'
      el.style.position = 'fixed'
      el.style.transitionTimingFunction= transitionTimingFunction
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
    var removeCloneTime = burstConfig.time*1000

    spread = Math.floor( Math.random() * (viewport.width/2*burstConfig.spread) )
    scale = burstConfig.randomScale ? (Math.random() + .4) * burstConfig.scale : burstConfig.scale
    
    spread = Math.random() < 0.5 ? spread : spread * -1
    rotate = Math.random() < 0.5 ? rotate : rotate * -1
    transformOrigin = Math.random() < 0.5 ? 'top left' : 'top right'
  
    angle = ( clone.top + clone.height * 2 ) * -1

    if (burstConfig.origin === 'top'){
      angle = viewport.height + clone.height * scale * 2
      spread = 0
    } else if (burstConfig.origin === 'bottom') {
      angle = (viewport.height + clone.height * scale * 2) * -1
      spread = 0
    }

    el.offsetHeight // hack for transitions to work
    
    el.style.opacity = burstConfig.opacity
    el.style.transform = "translate3d("+ spread +"px,"+ angle +"px,0) rotate("+ rotate +"deg) scale("+scale+")" 
    el.transformOrigin = transformOrigin
    
    setTimeout(function(){
      el.outerHTML = ""
    }, removeCloneTime)

}
