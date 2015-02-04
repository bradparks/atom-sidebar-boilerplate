// - -------------------------------------------------------------------- - //
// - libs

var pkg = require("../package.json");
var SidebarView = require("./view.js");
var CompositeDisposable = require("atom").CompositeDisposable;

// - -------------------------------------------------------------------- - //
// - Sidebar

var Sidebar = {

  view: null,
  panel: null,
  disposable: null,

  // .active(state) :void
  activate: function(state) {

    this.view = new view(state.view);
    this.disposable = new CompositeDisposable();

    this.panel = atom.workspace.addRightPanel({
      item: this.view.getElement(),
      visible: false,
    });

    this.disposable.add(
      atom.commands.add(
        "atom-text-editor",
        pkg.name + ":toggle",
        this.toggle.bind(this)
      )
    );

  },

  // .serialize() :Object
  serialize: function() {
    return {
      view: this.view.serialize(),
    };
  },

  // .deactivate() :void
  deactivate: function() {
    this.view.destroy();
    this.panel.destroy();
    this.disposable.dispose();    
  },

  // .toggle() :void
  toggle: function() {
    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
    }
  },

};

// - -------------------------------------------------------------------- - //
// - exports

module.exports = SymbolsSidebar;

// - -------------------------------------------------------------------- - //
