console.log("Test: app.js"); //Make sure console is connected

// TEST TO GET ALL DATA
// d3.json("/samples.json").then((data) => {
//     console.log(data);
// })



// ------------------------- START OF ACTUAL CODE


// EVENT HANDLER
// Install Event Handler to grab dataset value

d3.selectAll("body").on("change", updateAll);

function updateAll() {
    var dropdownMenu = d3.select("#selDataset");

    var dataset = dropdownMenu.node().value;

    console.log("***---***---***"); // Will run when new dropdown item is selected
    console.log("*** updateAll Function Running ***"); // Tell console the function is running

    // Pass dataset onto functions
    buildDemo(dataset);
    buildPlots(dataset);
    buildGuage(dataset);
};


// DEMOGRAPHIC BUILD OUT FUNCTION 
// function to build out demographic box with sample data

function buildDemo(info){
    d3.json("samples.json").then((meta) => {

        console.log("*** buildDemo function running ***"); // Tell console the function is running
        
        // Grab selected Dataset from Metadata using Subject ID no. from dropdown
        var selectedData = meta.metadata.filter(x => x.id === parseInt(info));
        
        console.log(`buildDemo using ${info}`);
        console.log(selectedData[0]);

        // Use D3 to select Demographic Panel to put sample info
        var demoPanel = d3.select("#sample-metadata");

        // Clear any existing info in panel
        demoPanel.html("");

        // Iterate through selectedData object to get key/value pairs
        Object.entries(selectedData[0]).forEach(([key, value]) => {
            demoPanel.append("h6").text(`${key}:${value}`);
        })
    });
    };

// BUILD CHARTS FUNCTION 
// function to build out charts with specific sample data

function buildPlots(info){
    d3.json("samples.json").then((meta) => {

        console.log("*** buildPlots function running ***"); // Will run when new dropdown item is selected
        console.log(`buildPlots on ${info}`);

        // Grab selected Dataset from samples using Subject ID No. from dropdown
        var selectedData = meta.samples.filter(x => x.id === info);

        // ---- BUBBLE CHART ----
        // Grab variables for Bubble Chart
        var sample_values = selectedData[0].sample_values;
        var otu_ids = selectedData[0].otu_ids;
        var otu_labels = selectedData[0].otu_labels

        // console.log(otu_labels); // TEST

        var bubble1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        var data = [bubble1];

        var layout = {
            title: 'Bubble Chart',
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', data, layout);

        // ----- BAR CHART -----
        // Organize by top 10 OTUs found in individual

        // console.log(topTenOtuIDs);
     
        var bar1 = {
            x: selectedData[0].sample_values.slice(0,10).reverse(),
            y: selectedData[0].otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse(),
            text: selectedData[0].otu_labels.slice(0,10).reverse(),
            // name: "Sample",
            type: "bar",
            orientation: "h",
            marker: {
                color: "#FFA85C"
            }
        };

        var barData = [bar1];

        var barLayout = {
            title: "Top 10 OTUs Found in Sample",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
              }
        };

        Plotly.newPlot("bar", barData, barLayout);

    })

    
};


// BUILD GUAGE FUNCTION -- EXTRA
// function to build out guage with specific sample data wash frequency

function buildGuage(info) {
    d3.json("samples.json").then((meta) => {
        console.log("*** buildGuage function running ***"); 
        
        var selectedData = meta.metadata.filter(x => x.id === parseInt(info));

        var wfreq = selectedData[0].wfreq;
        console.log(`WASH FREQUENCY OF : ${wfreq}`); 

        // Code mostly copied from https://plotly.com/javascript/indicator/

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text: "Wash Frequency" },
              type: "indicator",
              mode: "gauge+number+delta",
            //   delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "#9e5226"},
                steps: [
                  { range: [0, 1], color: "#FFF2E5"},
                  { range: [1, 2], color: "#FFE6CC" },
                  { range: [2, 3], color: "#FFDAB2" },
                  { range: [3, 4], color: "#FFCD99" },
                  { range: [4, 5], color: "#FFC17F" },
                  { range: [5, 6], color: "#FFB566" },
                  { range: [6, 7], color: "#FFA84C" },
                  { range: [7, 8], color: "#FF9C33" },
                  { range: [8, 9], color: "#FF9019" }
                ],
                threshold: {
                  line: { color: "black", width: 4 },
                  thickness: 0.75,
                  value: 9
                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);
    })
}

// INITIALIZE FUNCTION
// Code will run when you enter the page

function init() {

    // Get reference to dropdown select element
    var select = d3.select("#selDataset");

    // Use list of names to populate options
    d3.json("samples.json").then((navel) => {
        
        console.log("*** init function running ***"); // Tell console the function is running
        var names = navel.names;
        
        // console.log(names); // TEST

        // run through list using forEach and append
        // use selector to append "option" to dropdown and add name and value

        names.forEach((name) => {
            select.append("option").text(name).property("value", name); 
        });

        // Initialize first sample data to build initial charts
        var firstData = names[0];
        buildDemo(firstData);
        buildPlots(firstData);
        buildGuage(firstData);

    });
};

init();