var google_map; // variable created to store the map

function displaying_map() { //function which is get called at the time of retriving map from the api key
    google_map = new google.maps.Map(document.getElementById('map'), { //use to create the map
        center: {
            lat: 30.210994, //coordinates for the map
            lng: 74.9454745
        },
        zoom: 14,
        mapTypeControl: false
    });
    infowindow = new google.maps.InfoWindow(); //infowindow appears to show content about the marker
    ko.applyBindings(new ViewModel()); // a knockout observable used to call the ViewModel

}

function map_error() { // whenever google fails to laod the map an error function will get called
    document.getElementById('map').innerHTML = "Map Failed to load :( try after sometime";
}
var initialMarker = [{ // array for the markers info located about all mentioned locations
    title: 'Dominoz-the pizza hub',
    name: 'Dominoz',
    lat: 30.230389,
    lng: 74.935299,
    id: "4d3062f410e9b1f7b985baf1", // foursquare id used to retrive the information from particular location
    show_marker: true,
    selected: false
}, {
    title: 'Subway-Eat Fresh!',
    name: 'Subway',
    lat: 30.229916,
    lng: 74.936676,
    id: "4d020a0ab82d721e43417634",
    show_marker: true,
    selected: false
}, {
    title: 'Best Clothing shop in the city',
    name: "Shopping",
    lat: 30.211795,
    lng: 74.943345,
    id: "4e85da7749019ae6611678a4",
    show_marker: true,
    selected: false
}, {
    title: 'India best hospital',
    name: "Hospital",
    lat: 30.220367,
    lng: 74.938947,
    id: "4d30650596fe6ea8cfaf1444",
    show_marker: true,
    selected: false
}, {
    title: 'Bathinda: city of lakes',
    name: "Main City",
    lat: 30.210994,
    lng: 74.9454745,
    id: "4d81ddb6c8bdb1f741bed1c2",
    show_marker: true,
    selected: false
}];

var ViewModel = function() { // basically a view model, the changes are referred here
  var image_logo = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: new google.maps.Size(19,31),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,31)
   };
    var self = this;
    self.errorDisplay = ko.observable(''); //knockout variable is udes to display the error if not http request get returned
    self.search = ko.observable(''); // knockout variable used to store the input of the search bar
    self.markerList = [];
    for (var i = 0; i < initialMarker.length; i++) { //this is used to create all the markers which we require to display on the map
        var loc = new google.maps.Marker({
            position: {
                lat: initialMarker[i].lat,
                lng: initialMarker[i].lng
            },
            map: google_map,
            name: initialMarker[i].name,
            title: initialMarker[i].title,
            icon: image_logo,
            show: ko.observable(initialMarker[i].show_marker), //knockout observable used to show the marker on the map
            selected: ko.observable(initialMarker[i].selected), //knockout variable used to select/show the marker
            venueid: initialMarker[i].id, //foursquare id has been used
            animation: google.maps.Animation.DROP // used to animate the marker
        });

        self.markerList.push(loc); //marker created and store in markerlist array

    }


    self.bounce_animation = function(marker) { // function created to bounce(animation) the marker

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 800);
    };

    self.addinfo = function(marker) { // used to get the information from the http request send by the user if it clicks the particular marker
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/" + marker.venueid + '?client_id=MWXJ5BLPNQSJWTMFGPTEFXUC52CGSKVBUOADBKDY3PMCDUO1&client_secret=A1FO0MOLXSZU1WLGAVQXD5530U3FJ2Z000LEVSX5XWILZSP1&v=20170208',
            dataType: "json",
            success: function(data) {
                var output = data.response.venue; // all the information we get has been stored in this variable
                marker.rating = output.hasOwnProperty('rating') ? output.rating : '';
            },
            error: function(e) {
                self.errorDisplay("Information is not avaible right now :(");
            }
        });
    };

    var marker_info = function(marker) { // used to get the info about the particular marker when it get clicked by the user
        self.addinfo(marker);
        marker.addListener('click', function() {
            self.select_marker(marker); // will call the fucntion select_marker which will give the information collected from that particular location
        });
    };

    self.currentloc = self.markerList[0];

    self.select_marker = function(location) { //used to store the information which we get from the browser
        self.unselectall();
        location.selected(true);

        self.currentloc = location;

        Rating_of_place = function() {
            if (self.currentloc.rating === '' || self.currentloc.rating === undefined)
                return "Ratings not available";
            else {
                return "This location has " + self.currentloc.rating + "/10 rating";
            }
        };
        var set_content = "<h5>" + self.currentloc.title + "</h5>" + "<div>" + "<div>" + Rating_of_place() + "</div>";
        infowindow.setContent(set_content);
        infowindow.open(google_map, location);
        self.bounce_animation(location);
    };


    for (var i = 0; i < self.markerList.length; i++) {
        marker_info(self.markerList[i]);
    }


    self.myfunc = function() { // it is used to filter the list accordingly the user enters the query

        var value = self.search();

        infowindow.close();

        if (value.length === 0) {
            self.showall();
        } else {
            for (var i = 0; i < self.markerList.length; i++) { //logic behind the filtering the request
                if (self.markerList[i].name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    self.markerList[i].show(true);
                    self.markerList[i].setVisible(true);
                } else {
                    self.markerList[i].show(false);
                    self.markerList[i].setVisible(false);
                }
            }
        }
        infowindow.close(); // closes the infowindow

    };

    self.showall = function() { // uses to show all the markers on the google map
        for (var i = 0; i < self.markerList.length; i++) {
            self.markerList[i].show(true);
            self.markerList[i].setVisible(true);
        }
    }

    self.unselectall = function() { // used to unslect all the marker
        for (var i = 0; i < self.markerList.length; i++) {
            self.markerList[i].selected(false);
        }
    };


};
