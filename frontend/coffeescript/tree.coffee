ll = ll or {}
    
class ll.Tree
    constructor: (@containerid, @treename) ->
        @container = d3.select "##{@containerid}"
        # ll.dispatch.on "dbchanged", @dbchanged
        @top = @container.append "ul"
            .classed "tree", true
            .attr "id", "treetop"
        d3.json "/tree/"
            .then @initial
        return

    dbchanged: (value) =>
        @currentdb = value
        d3.json "/tree/?elemname=#{@currentdb}&elemtype=database", @initial
        return

    initial: (json) =>
        console.log "In Here"
        if @top? then @top.remove()
        @top = @container.append "ul"
            .classed "tree", true
            .attr "id", "treetop"

        lis = @top.selectAll "li"
            .data json
            .enter()
            .append "li"
            .attr "class", (d) -> d.class
            .attr "elemname", (d) -> d.elemname
            .attr "elemtype", (d) -> d.elemtype
            .attr "parentname", (d) -> d.parentname
            .append "div"
            
        lis.append "div"
            .attr "style", "float:left;"
            .append "span"
            .text (d) -> d.elemname

        lis.append "div"
            .append "svg"
            .attr "width", "20px"
            .attr "height", "20px"
            .attr "viewBox", "0 0 20 20"
            .append "use"
            .attr "xlink:href", (d) ->
                switch d.geomtype
                    when "POINT"
                        return "defs.svg#sympoint"
                    when "LINESTRING", "MULTILINESTRING"
                        return "defs.svg#symline"
                    when "POLYGON", "MULTIPOLYGON"
                        return "defs.svg#sympoly"

        @top.selectAll ".branch"
            .on "click", @branchClicked
        @top.selectAll ".branch"
            .on "contextmenu", @contextMenu
        @top.selectAll ".leaf"
            .on "click", @leafClicked
        @top.selectAll "svg"
            .on "click", @svgClicked
        return

    contectMenu: () =>
        d3.event
            .stopPropagation
        elem = d3.select d3.event.currentTarget
        if elem.classed "tree"
            @toggleMenuOn
        return

    toggleMenuOn: () ->
        menu = d3.select ".context-menu"
            
            
    branchClicked: () =>
        d3.event
            .stopPropagation()
        elem = d3.select d3.event.currentTarget
        if elem.classed "expanded"
            elem.selectAll("ul").remove()
            elem.classed "expanded", false
        else
            elem.classed "expanded", true
            d3.json "/tree/?elemname=#{elem.attr 'elemname'}&elemtype=#{elem.attr 'elemtype'}&parentname=#{elem.attr 'parentname'}"
                .then (json) => @newChildren(json, elem)
        return

    newChildren: (json, elem) ->
        elem.node()
            .appendChild html
            
        elem.selectAll ".branch"
            .on "click", @branchClicked
        elem.selectAll ".leaf"
            .on "click", @leafClicked
        elem.selectAll "svg"
            .on "click", @svgClicked
        return

    leafClicked: () ->
        d3.event
            .stopPropagation()
        return

    svgClicked: () ->
        d3.event
            .stopPropagation()
        console.log "SVG Clicked"
        return
