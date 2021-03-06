
const list = document.getElementById("list");

  window.actions = {

    drawList: (items) => {
      //list.children.remove();
      list.innerHTML = '';
      items.map( item => {
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode(item.data.id);
        newDiv.appendChild(newContent)
        list.appendChild(newDiv)
      })
    }

  };

    // the flat data
    var flatDataList = [
      {"name": "Top Level", "parent": null, "hasChildren": true},
      {"name": "Level 2: A", "parent": "Top Level", "hasChildren": true },
      {"name": "Level 2: B", "parent": "Top Level","hasChildren": true },
      {"name": "Level 3: A", "parent": "Level 2: A","hasChildren": true },
      {"name": "Level 3: B", "parent": "Level 2: A","hasChildren": true },
      {"name": "Level 3: C", "parent": "Level 2: A","hasChildren": true },
      {"name": "Level 4: A", "parent": "Level 3: C","hasChildren": true },
      {"name": "Level 4: B", "parent": "Level 3: C","hasChildren": true },
      {"name": "Level 4: C", "parent": "Level 3: C","hasChildren": true }
    ];

      var flatData = [];
      flatDataList.map( data => {
        if (data.hasChildren) flatData.push(data);
      })

      const handleNodeClick = d => {
      console.log(d)
     	if (d.children && d.children.length > 0) window.actions.drawList(d.children)
    }

    function drawHorizontalTree(flatData) {

    // convert the flat data into a hierarchy
    var treeData = d3.stratify()
      .id(function(d) { return d.name; })
      .parentId(function(d) { return d.parent; })
      (flatData);

    // assign the name to each node
    treeData.each(function(d) {
        d.name = d.id;
      });

    // set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 660 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(treeData, function(d) {
        return d.children;
      });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    const drawLink = d => {
      if (d.children && d.children.length > 0)
      return "M" + d.y + "," + d.x
             + "C" + (d.y + d.parent.y) / 2 + "," + d.x
             + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
             + " " + d.parent.y + "," + d.parent.x;
           }


    // adds the links between the nodes
    var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
      .enter().append("path")
        .attr("class", "link")
        .attr("d", drawLink);

    const getOnlyChildren = (descendants) => {
      console.log(descendants)
      const onlyChildren = [];
      descendants.map( descendant => {
        if (descendant.children) onlyChildren.push(descendant)
       })
      return onlyChildren;
    }



    // adds each node as a group
    var node = g.selectAll(".node")
        .data(getOnlyChildren ( nodes.descendants() ))
      .enter().append("g")
        .attr("class", function(d) {
          return "node" +
            (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")"; })
      	.on('click', handleNodeClick);

    // adds the circle to the node
    node.append("circle")
      .attr("r", 10);

    // adds the text to the node
    node.append("text")
      .attr("dy", ".35em")
      .attr("x", function(d) { return d.children ? -13 : 13; })
      .style("text-anchor", function(d) {
        return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.name; });

      }

      function drawVerticalTree(flatData) {
            // ************** Generate the tree diagram	 *****************
        var margin = {top: 40, right: 120, bottom: 20, left: 120},
          width = 960 - margin.right - margin.left,
          height = 300 - margin.top - margin.bottom;

        var i = 0;

            // convert the flat data into a hierarchy
        var treeData = d3.stratify()
          .id(function(d) { return d.name; })
          .parentId(function(d) { return d.parent; })
          (flatData);

        // assign the name to each node
        treeData.each(function(d) {
            d.name = d.id;
          });


        var tree = d3.tree()
          .size([height, width]);

            const diagonal = d => {
          if (d.children && d.children.length > 0)
          return "M" + d.y + "," + d.x
                 + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                 + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                 + " " + d.parent.y + "," + d.parent.x;
               }

        // set the dimensions and margins of the diagram
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
            width = 660 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data( nodes.descendants().slice(1))
          .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
               return "M" + d.x + "," + d.y
                 + "C" + d.x + "," + (d.y + d.parent.y) / 2
                 + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
                 + " " + d.parent.x + "," + d.parent.y;
               });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
          .enter().append("g")
            .attr("class", function(d) {
              return "node" +
                (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")"; })
        		.on('click', handleNodeClick);

        // adds the circle to the node
        node.append("circle")
          .attr("r", 10);

        // adds the text to the node
        node.append("text")
          .attr("dy", ".35em")
          .attr("y", function(d) { return d.children ? -20 : 20; })
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.name; });

      }

      drawVerticalTree(flatData);
      //drawHorizontalTree(flatData);
