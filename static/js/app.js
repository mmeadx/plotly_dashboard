// console.log("Test");

d3.json("/samples.json").then(function(data) {

    // Grab values from the response json object to build the plots
    var name = data.names;
    console.log(name);
    var metadata = data.metadata;
    console.log(metadata);
    var samples = data.samples;
    console.log(samples);
});