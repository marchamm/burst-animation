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

#### Example
```
  <div 
    class="burst" 
    data-burst-clones="16"
    data-burst-randomClones="false"
    data-burst-time="10">
    ❤️
  </div>
```

#### Parameters

| Option                       | Type           |  Default   | Description    |
| :--------------------------- |:---------------| :--------- | :------------- |
| data-burst-clones            | number         | 4          | Number of clones 
| data-burst-randomClones      | boolean        | true       | If true, number of clones will differ by 0-50% for each burst
| data-burst-spread            | number         | 1          | Amount of spread between clones, 1 = width of viewport
| data-burst-rate              | number         | 80         | Time between clones in milliseconds (ms)
| data-burst-scale             | number         | 1          | Final clone size starting from 1
| data-burst-randomScale       | boolean        | true       | If true, final clone size will differ by 0-50% for each clone
| data-burst-opacity           | number         | 1          | End opacity of clone
| data-burst-time              | number         | 8          | Time of animation from start to end for each clone in seconds (s)


## Basic demo
https://codepen.io/marchamm/pen/BVyXYX
