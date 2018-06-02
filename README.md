# burst-animation
A simple library that enables a burst animation on any selected element.

## Simple installation

#### Include burst.js in your project, example:
```
<body>
  <!-- Your content here -->
  <script src="js/burst.js"></script>
</body>
```

#### Add the class "burst" to an element or container, example:
```
<div class="burst">
  ❤️
</div>
```

## Options
Quickly adjust the behaviour of the burst with custom data attributes to override defaults.

#### Custom data attributes, example:
```
  <div 
    class="burst" 
    data-burst-clones="2"       // number of clones
    data-burst-spread="1"      // distance between clones
    data-burst-rate="80"        // time between clones in ms
    data-burst-scale=".6"       // final clone size
    data-burst-velocity="10">   // animation speed of clones in seconds, lower is faster
    ❤️
  </div>
```
#### 

## Basic demo
https://codepen.io/marchamm/pen/BVyXYX
