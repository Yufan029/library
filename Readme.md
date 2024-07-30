Live Demo: <a href="https://yufan029.github.io/library/">Library</a>
1. The svg cannot be click.

  Adding the event listener for svg, then not working, search a bit find this file:
https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/

then adding this to the css file
svg {
    pointer-events: none;
}

still not working, but it works on CodePen, so trying to find another reason.

then I found:
The before and after content has the z-index higher than the svg graph, the svg can be seen, but cannot be clicked.

2. What learned

create svg under certain namespace.

3. Code still bit tangled, can be refactor for more easy for further extension and maintain.

4. Not adding the remove from library array, since the data will be refresh every time when reload.


5. Difference between ```prototype```, ```__proto__``` and ```[[prototype]]```

```__proto__``` is ```[[prototype]]```, same thing. ```Object.setPrototypeOf()``` is setting the instance's ```__proto__```

```prototype``` is an ordinary property.

    Every Function has a prototype property.

    Every Object has a __proto__ property.

    So every function has not only prototype property, but also __proto__ property. Function is an Object.


The inheritance looks like this:

    instance --> Instance.prototype --> Object.prototype --> null


How to implement? <br>
    When you create a new instance based on the factory function or class Instance,
    it will assign the ```Instance.prototype``` property to the new created ```instance.__proto__```(which is ```[[prototype]]```).
    
    instance.__proto__ === Instance.prototype;

    instance.__proto__.__proto__ === Instance.prototype.__proto__ === Object.prototype;

    instance.__proto__.__proto__.__proto__ === object.prototype.__proto__ === null;

    Object.getPrototypeOf(instance), this is getting the __proto__, which is [[prototype]], not the instance's prototype property.


6. ```super()``` in the constructor of subclass is calling the constructor of the superclass which ```class.__proto__``` point to. <br>

```
  class Polygon {
      value =1;
      constructor() {
        this.name = "Polygon";
        console.log(this.name);
      }

      say() {
        console.log(`Pppppppolygon  ${this.value}`);
      }

      sayArrow = () => console.log(this.value);
  }
  
  class Rectangle {
      value = 2;
      constructor() {
        this.name = "Rectangle";
        console.log(this.name);
      }

      say() {
        console.log(`Rrrrrrrrrrrrrrrrectangle   ${this.value}`);
      }
      
      sayArrow = () => console.log(this.value);
  }
    
  class Square extends Polygon {
      constructor() {
        super();
        this.say();
      }
  }

  Object.setPrototypeOf(Square, Rectangle);
  const square = new Square();
  //console.dir(square);

  // Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
  // const newSquare = new Square();
  // console.dir(newSquare);
```

After resetting the ```Square.__proto__```, the ```super()``` will call constructor in Rectangle, <br>
but the inheritance chain is not changed: <br>
    ```square --> Square.prototype --> Polygon.prototype --> Object.prototype --> null.```<br>

The value is initilized before ```super()``` in the Rectangle, then copy to the new instance.<br>
The ```super()``` is running the constructor which Square.```__proto__``` point to.<br>
The ```say()``` function is found through the inheritance chain, so the ```Polygon.say()``` being found, but using the new created ```value``` for the new instance.<br>
One thing worth to note is that, the arrow function, which is bound to the new created instance, which is not in the prototypal chain, it is copied to the new created instance directly.<br>

So the result is:<br>
````
    Rectangle<br>
    Pppppppolygon  2<br>
    2<br>
````