# burst-animation
A simple library that enables a burst animation on any selected element.

## Simple installation

#### Include burst.js in your project eg.
```
<body>
  <!-- Your content here -->
  <script src="js/burst.js"></script>
</body>
```

#### Add or wrap elements you want to animate with class '.burst'
```
<div class="burst">
  ❤️
</div>
```

## Options
To quickly adjust the behaviour of the burst there are custom data attributes. They will override the defaults.

#### Using data-attributes
```
  <div 
    class="burst" 
    data-burst-clones="2"       // number of clones
    data-burst-spread=".8"      // distance between clones
    data-burst-rate="80"        // time between clones in ms
    data-burst-scale=".6"       // final clone size
    data-burst-velocity="0.8">  // animation speed of clones in seconds
    ❤️
  </div>
```
#### 

## Basic demo
https://codepen.io/marchamm/pen/BVyXYX
