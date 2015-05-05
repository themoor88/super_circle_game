// Create a new class for Circle
function Circle(elem) {
  this.elem = elem; // JQuery selector for a specific element in the DOM.
  this.diameter = 30 + Math.random() * 50; //
  this.x = Math.random() * (400 - this.diameter); // This helps the circle stay in the box.
  this.y = Math.random() * (400 - this.diameter); // This helps the circle stay in the box.
  this.speed = 400 + Math.random() * 400; // This number is actually a time that will go in duration for the animation.
  // this.color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16); // Random hex color codes.
  var colors = ["#33363F", "#4C0C03", "#B74C2C", "#FF6B25", "#FFA328"] // Selecting from an array of a color palette.
  this.color = colors[Math.floor(Math.random() * colors.length)]

  // this.elem.css helps change the size of the actual circles and their relative position.
  this.elem.css({
    width: this.diameter,
    height: this.diameter,
    top: this.y,
    left: this.x,
    backgroundColor: this.color
  });

  // Move the circle in a random direction using animation for jquery.
  this.move = function() {
    var self = this; // this refers to <div class="circle"></div>.
    this.elem.animate({
      top: Math.random() * (400 - this.diameter),
      left: Math.random() * (400 - this.diameter)
    }, {
      queue: false, // No queue means that the animation does not necessarily have to be completed on a click.
      duration: this.speed,
      complete: function() {
        self.move();
        console.log(this);// this refers to <div class="circle"></div>.
        console.log(self); // self refers to the Circle object with diameter, x, y, and speed.
      }
    });
  };

  // Listen for a click event and handle the event for the circle.
  this.listen = function() {
    var self = this;
    this.elem.on('click', function() {
      $(this).css('background-color', 'red')
      .effect({
        effect: 'explode',
        duration: 150,
        queue: false,
        complete: function() {
          window.score.increase();
          $(self).off('click');
          console.log(this); // this refers to <div class="circle"></div>
          console.log(self); // self refers to the Circle object with diameter, x, y, and speed.
        }
      });
    });
  }
}


// Create a new Score class of which we can instantiate a new object later.
function Score(elem) {
  this.elem = elem;
  this.points = 0;

  this.reset = function() {
    this.points = 0;
  };

  this.increase = function() {
    this.points = this.points + 100;
    this.elem.html(this.points); // Outputs the updated score to the screen on the HTML document.
  };
}


$(document).ready(function() {

  window.score = new Score($('#score'));
  window.score.reset();

  var circles_count = 10 + Math.random() * 30;
  var duration = 10000; // 10 second timeout.

  for (var i = 0; i < circles_count; i++) {
    var element = $('<div class="circle"></div>') // A new jQuery selector needs to be created and appended.
    element.appendTo('#game');
    var circle = new Circle(element);
    circle.move();
    circle.listen();
  }

  setTimeout(function() {
    alert("GAME OVER: Refresh page to start again!");
    $.each($('.circle'), function() {
      $(this).off('click');
      $(this).hide();
    });
  }, duration);

});

// This way is for less memory usage during load time. Instead of using a for loop, the HTML is rendered
// for the number of circle divs.

// var circles = []; An empty array of circles.

// The each function iterates for each class in the actual HTML document which is 10. This refers to the circle.

// $.each($('.circle'), function() {
//   var circle = new Circle($(this))
//   circles.push(circle);
//   circle.move();
//   circle.listen();
// });

