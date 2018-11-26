// Generated by CoffeeScript 2.1.1
var ll, main;

ll = ll || {};

main = function() {
  ll.tree = new ll.Tree("tree", "servers");
};

ll = ll || {};

ll.Tree = class Tree {
  constructor(containerid, treename) {
    this.dbchanged = this.dbchanged.bind(this);
    this.initial = this.initial.bind(this);
    this.contectMenu = this.contectMenu.bind(this);
    this.branchClicked = this.branchClicked.bind(this);
    this.containerid = containerid;
    this.treename = treename;
    this.container = d3.select(`#${this.containerid}`);
    // ll.dispatch.on "dbchanged", @dbchanged
    this.top = this.container.append("ul").classed("tree", true).attr("id", "treetop");
    d3.json("/tree/").then(this.initial);
    return;
  }

  dbchanged(value) {
    this.currentdb = value;
    d3.json(`/tree/?elemname=${this.currentdb}&elemtype=database`, this.initial);
  }

  initial(json) {
    var lis;
    console.log("In Here");
    if (this.top != null) {
      this.top.remove();
    }
    this.top = this.container.append("ul").classed("tree", true).attr("id", "treetop");
    lis = this.top.selectAll("li").data(json).enter().append("li").attr("class", function(d) {
      return d.class;
    }).attr("elemname", function(d) {
      return d.elemname;
    }).attr("elemtype", function(d) {
      return d.elemtype;
    }).attr("parentname", function(d) {
      return d.parentname;
    }).append("div");
    lis.append("div").attr("style", "float:left;").append("span").text(function(d) {
      return d.elemname;
    });
    lis.append("div").append("svg").attr("width", "20px").attr("height", "20px").attr("viewBox", "0 0 20 20").append("use").attr("xlink:href", function(d) {
      switch (d.geomtype) {
        case "POINT":
          return "defs.svg#sympoint";
        case "LINESTRING":
        case "MULTILINESTRING":
          return "defs.svg#symline";
        case "POLYGON":
        case "MULTIPOLYGON":
          return "defs.svg#sympoly";
      }
    });
    this.top.selectAll(".branch").on("click", this.branchClicked);
    this.top.selectAll(".branch").on("contextmenu", this.contextMenu);
    this.top.selectAll(".leaf").on("click", this.leafClicked);
    this.top.selectAll("svg").on("click", this.svgClicked);
  }

  contectMenu() {
    var elem;
    d3.event.stopPropagation;
    elem = d3.select(d3.event.currentTarget);
    if (elem.classed("tree")) {
      this.toggleMenuOn;
    }
  }

  toggleMenuOn() {
    var menu;
    return menu = d3.select(".context-menu");
  }

  branchClicked() {
    var elem;
    d3.event.stopPropagation();
    elem = d3.select(d3.event.currentTarget);
    if (elem.classed("expanded")) {
      elem.selectAll("ul").remove();
      elem.classed("expanded", false);
    } else {
      elem.classed("expanded", true);
      d3.json(`/tree/?elemname=${elem.attr('elemname')}&elemtype=${elem.attr('elemtype')}&parentname=${elem.attr('parentname')}`).then((json) => {
        return this.newChildren(json, elem);
      });
    }
  }

  newChildren(json, elem) {
    elem.node().appendChild(html);
    elem.selectAll(".branch").on("click", this.branchClicked);
    elem.selectAll(".leaf").on("click", this.leafClicked);
    elem.selectAll("svg").on("click", this.svgClicked);
  }

  leafClicked() {
    d3.event.stopPropagation();
  }

  svgClicked() {
    d3.event.stopPropagation();
    console.log("SVG Clicked");
  }

};
