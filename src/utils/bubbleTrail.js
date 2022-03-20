(function (exports) {
  const overallSpeed = 20;
  const trailLength = 2;
  let trail = []; // Trail of the mouse pointer
  let thresholds = []; // speed changes according to threshold. The closer to pointer, the lower the speed
  let step = 30;

  /**
   * Wrapper for the mouse functions and data.
   * Calculates acceleration and updates mouse position.
   */
  let mouse = {
    _x: -1,
    _y: -1,
    active: false,
    init: function (parentNode) {
      window.addEventListener('mousemove', function (e) {
        var bodyRect = document.body.getBoundingClientRect(),
          elemRect = parentNode.getBoundingClientRect(),
          offsetTop = elemRect.top - bodyRect.top,
          offsetLeft = elemRect.left - bodyRect.left;

        mouse.x = e.pageX - offsetLeft;
        mouse.y = e.pageY - offsetTop;

        // If mouse has moved and animation of cursors hasn't been started, initiate it
        if (mouse.active === false) {
          requestAnimationFrame(exports.moveNodesCloser);
          mouse.active = true;
        }
      });
    },
  };
  Object.defineProperty(mouse, 'x', {
    get: function () {
      return this._x;
    },
    set: function (val) {
      this._x = parseFloat(val);
    },
  });
  Object.defineProperty(mouse, 'y', {
    get: function () {
      return this._y;
    },
    set: function (val) {
      this._y = parseFloat(val);
    },
  });

  /**
 * Node is a wrapper for DOM node.
 * Makes it easier to handle CSS position values.
 r @param {object} node DOM node.
 * @param {int} speed speed at which node moves.
 */
  var Node = function (node, speed) {
    this.node = node;
    this.speed = speed;
    this.x = mouse.x;
    this.y = mouse.y;
  };
  Object.defineProperty(Node.prototype, 'x', {
    get: function () {
      return this._x;
    },
    set: function (val) {
      this._x = parseFloat(val);
      this.node.style.left = this._x + 'px';
    },
  });
  Object.defineProperty(Node.prototype, 'y', {
    get: function () {
      return this._y;
    },
    set: function (val) {
      this._y = parseFloat(val);
      this.node.style.top = this._y + 'px';
    },
  });

  /**
   * Move nodes closer to the mouse with each animation frame.
   * Algorithm works by calculating difference between the node and mouse.
   * With each frame, node moves "speed" amount of pixels.
   * How much the node moves in Y and X directions is determined by the ratio
   * of how far the node is from the cursor in Y and X axis.
   * Once the node is close enough to the cursor, it disappears and gets
   * same coordinates as the mouse pointer.
   */
  exports.moveNodesCloser = function () {
    var movingNodes = 0;
    for (var len = trail.length, i = 0; i < len; i++) {
      var node = trail[i];
      var diff = {
        x: mouse.x - node.x,
        y: mouse.y - node.y,
      };
      var diffSum = Math.abs(diff.x) + Math.abs(diff.y);
      var xSpeed = (Math.abs(diff.x) / diffSum) * node.speed;
      var ySpeed = (Math.abs(diff.y) / diffSum) * node.speed;
      var absX = Math.abs(diff.x);
      var absY = Math.abs(diff.y);

      if (absX > thresholds[0][0] || absY > thresholds[0][0]) {
        for (var k = thresholds.length - 1; k > -1; k--) {
          if (absX > thresholds[k][0]) {
            if (k === 0) node.x += diff.x > 0 ? 1 : -1;
            else
              node.x +=
                diff.x > 0
                  ? xSpeed * thresholds[k][1]
                  : -xSpeed * thresholds[k][1];
            break;
          }
        }

        for (k = thresholds.length - 1; k > -1; k--) {
          if (absY > thresholds[k][0]) {
            if (k === 0) node.y += diff.y > 0 ? 1 : -1;
            else
              node.y +=
                diff.y > 0
                  ? ySpeed * thresholds[k][1]
                  : -ySpeed * thresholds[k][1];
            break;
          }
        }
        movingNodes++;
      }
    }

    // If no more active nodes moving closer to the target, don't request another animation frame
    if (movingNodes > 0) requestAnimationFrame(exports.moveNodesCloser);
    else mouse.active = false;
  };

  /**
   * Initialize all the nodes.
   * Speed is dependent upon average sum of all nodes.
   * @param {int} length number of follower cursors.
   */
  exports.mouseTrail = function (parentNode) {
    let i = 0,
      len;
    step = overallSpeed / 10;
    thresholds = [[step, 0]];
    for (i = step * 2; i <= overallSpeed; i += step)
      thresholds.push([i * 1.5, i / overallSpeed]);

    // Re-initialize nodes if changing number of cursors
    if (trail.length > 0) {
      for (i = 0, len = trail.length; i < len; i++)
        parentNode.removeChild(trail[i].node);
      trail = [];
    }

    for (i = 0; i < trailLength; i++) {
      let node = document.createElement('div');
      node.className = 'trail';
      if (i < 1) {
        node.className = 'trail small';
      }
      node.setAttribute('data-position', i);
      parentNode.appendChild(node);
      trail.push(
        new Node(node, overallSpeed + ((i + 1) * overallSpeed) / trailLength)
      );
    }

    mouse.init(parentNode);
  };

  exports.killTrail = function (parentNode) {
    let i = 0,
      len;
    if (trail.length > 0) {
      for (i = 0, len = trail.length; i < len; i++)
        parentNode.removeChild(trail[i].node);
      trail = [];
    }
  };
})((this.mouseEffects = {}));
