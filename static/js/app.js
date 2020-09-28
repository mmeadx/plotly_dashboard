// console.log("Test"); //Make sure console is connected

//EVENT HANDLER
// Install Event Handler
d3.selectAll("body").on("change", updateAll);

function updateAll() {
    var dropdownMenu = d3.select("#selDataset");

    var dataset = dropdownMenu.node().value;

    console.log("updateAll Function Running"); // Test to be sure it's getting correct value
    buildDemo(dataset);
    buildPlots(dataset);
};


// DEMOGRAPHIC BUILD OUT FUNCTION 
// Function to build out "Demographic Info Box"
function buildDemo(info){
    d3.json("/samples.json").then((meta) => {
        var metadata = meta.metadata;
        console.log("buildDemo Function Running");
    })
};

function buildPlots(info){
    console.log("buildPlots Function Running");
};

// INITIALIZE FUNCTION
// Initialize a function to set names for the dropdown
function init() {
    // Get reference to dropdown select element
    var select = d3.select("#selDataset");

    // Use list of names to populate options
    d3.json("/samples.json").then((navel) => {
        var names = navel.names;
        console.log("NAMES TO BE ADDED TO DROPDOWN:")
        console.log(names);

        // run through list using forEach and append to 
        names.forEach((name) => {
            select.append("option").text(name).property("value", name);
        });

        // Initialize first sample data to build first plots
        var firstData = names[0];
        buildPlots(firstData);
        buildDemo(firstData);

    });
};

init();