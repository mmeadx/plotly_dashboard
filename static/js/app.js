// console.log("Test: app.js"); //Make sure console is connected

// TEST TO GET ALL DATA
// d3.json("samples.json").then((data) => {
//     console.log(data);
// })



// EVENT HANDLER
// Install Event Handler to grab dataset value

d3.selectAll("body").on("change", updateAll);

function updateAll() {
    var dropdownMenu = d3.select("#selDataset");

    var dataset = dropdownMenu.node().value;

    console.log("***---***---***"); // Will run when new dropdown item is selected
    console.log("*** updateAll Function Running ***"); // Tell console the function is running
    buildDemo(dataset);
    buildPlots(dataset);
};


// DEMOGRAPHIC BUILD OUT FUNCTION 
// function to build out demographic box with sample data

function buildDemo(info){
    d3.json("/samples.json").then((meta) => {

        console.log("*** buildDemo function running ***"); // Tell console the function is running
        
        // Grab selected Dataset from Metadata using Subject ID no. from dropdown
        var selectedData = meta.metadata.filter(x => x.id === parseInt(info));
        
        console.log(`buildDemo using ${info}`);
        console.log(selectedData[0]);

        // Use D3 to select Demographic Panel to put sample info
        var demoPanel = d3.select("#sample-metadata");

        // Clear any existing info in panel
        demoPanel.html("");

        Object.entries(selectedData[0]).forEach(([key, value]) => {
            demoPanel.append("h6").text(`${key}:${value}`);
        })
    });
    };

function buildPlots(info){
    d3.json("/samples.json").then((meta) => {

        console.log("*** buildPlots function running ***");
        console.log(`buildPlots on ${info}`);

        // Grab selected Dataset from samples using Subject ID No. from dropdown
        var selectedData = meta.samples.filter(x => x.id === info);

        var sample_values = selectedData[0].sample_values;
        var otu_ids = selectedData[0].otu_ids;
        var otu_labels = selectedData[0].otu_labels

        // console.log(otu_labels); // TEST
    })
    // console.log("buildPlots Function Running");
    // console.log(`sample data of ${info}`);
    
};

// INITIALIZE FUNCTION

function init() {

    // Get reference to dropdown select element
    var select = d3.select("#selDataset");

    // Use list of names to populate options
    d3.json("/samples.json").then((navel) => {
        
        console.log("*** init function running ***"); // Tell console the function is running
        var names = navel.names;
        
        // console.log(names); // TEST

        // run through list using forEach and append
        // use selector to append "option" to dropdown and add name and value

        names.forEach((name) => {
            select.append("option").text(name).property("value", name); 
        });

        // Initialize first sample data to build first plots
        var firstData = names[0];
        buildDemo(firstData);
        buildPlots(firstData);

    });
};

init();