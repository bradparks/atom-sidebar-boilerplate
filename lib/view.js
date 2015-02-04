// - -------------------------------------------------------------------- - //
// - Libs

var pkg = require("../package.json");
var CompositeDisposable = require("atom").CompositeDisposable;

// - -------------------------------------------------------------------- - //
// - Class SidebarView

// new SidebarView(state) :SidebarView
function SidebarView(state) {
  this.disposable = new CompositeDisposable();
  this.element = document.createElement("div");
  this.element.className = pkg.name;
  this.resizable();
}

SidebarView.prototype = {

  // .getElement() :HTMLElement
  getElement: function() {
    return this.element;
  },
  
  // .focusable() :void
  focusable: function() {
    // TODO
  },

  // .resizable() :void
  resizable: function() {
    
    var elm = this.getElement();
    var doc = document;
    var distance = 8;
    var pos;
    var over;
    var start;
    var width;
    var resizing;
    
    function resize(event) {
      var left = event.pageX;
      var resized = start - left;
      elm.style.width = (width + resized).toString() + "px";
    }
    
    elm.addEventListener("mouseenter",function() {
      var left = 0;
      var node = this;
      while (node) {
        left += parseInt(node.offsetLeft);
        node = node.offsetParent;
      }
      pos = left;
    });
    
    elm.addEventListener("mousedown",function(event) {
      if (over) {
        start = event.pageX;
        width = this.offsetWidth;
        resizing = true;
        doc.addEventListener("mousemove",resize);
      }
    });
    
    elm.addEventListener("mouseup",function(event) {
      if (resizing) {
        start = undefined;
        width = undefined;
        resizing = false;
        doc.removeEventListener("mousemove",resize);
      }
    });
    
    elm.addEventListener("mousemove",function(event) {
      if (!resizing) {
        over = event.pageX < pos + distance;
        if (over) {
          this.style.cursor = "w-resize";
        } else {
          this.style.cursor = "default";
        }
      }
    });
    
  },

  // .destroy() :void
  destroy: function() {
    var elm = this.element;
    elm.parentNode.removeChild(elm);
    this.disposable.dispose();
  },

  // .serialize() :Object
  serialize: function() {
  },

};

// - -------------------------------------------------------------------- - //
// - exports

module.exports = SidebarView;

// - -------------------------------------------------------------------- - //
