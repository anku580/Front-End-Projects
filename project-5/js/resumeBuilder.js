var $, HTMLtwitter, HTMLlocation, HTMLworkLocation, HTMLheaderName, HTMLheaderRole, HTMLmobile, HTMLemail, HTMLgithub, HTMLbioPic, HTMLskills, HTMLwelcomeMsg, HTMLskillsStart, HTMLworkStart, HTMLworkEmployer, HTMLworkTitle, HTMLworkDates, HTMLworkDescription, HTMLprojectStart, HTMLprojectTitle, HTMLprojectDates, HTMLprojectDescription, HTMLprojectImage, HTMLschoolStart, HTMLschoolName, HTMLschoolDegree, HTMLschoolDates, HTMLschoolLocation, HTMLschoolMajor, HTMLonlineClasses, HTMLonlineTitle, HTMLonlineSchool, HTMLonlineDates, HTMLonlineURL, googleMap;
var bio = {
    "name": "Anku Garg",
    "role": "Web Developer",
    "contacts": {
        "mobile": "9876556200",
        "email": "ankugarg580@gmail.com",
        "twitter": "anku580",
        "location": "Chandigarh",
        "github": "anku580"
    },
    "welcomeMessage": "hey! welcome to my resume",
    "skills": ["awesomeness", "delivering things", "punctual", "polite"],
    "biopic": "images/anku1.jpg"
};

var work = {
    "jobs": [{
        "employer": "Tution Center",
        "title": "A Teacher",
        "dates": "January 3000 - Future",
        "location": "Chandigarh",
        "description": "Informally the role of teacher may be taken on by anyone (e.g. when showing a colleague how to perform a specific task). In some countries, teaching young people of school age may be carried out in an informal setting, such as within the family, (homeschooling) rather than in a formal setting such as a school or college. Some other professions may involve a significant amount of teaching (e.g. youth worker, pastor)."
    }, {
        "employer": "Pizza Boy",
        "title": "Delivery boy",
        "dates": "January 3000 - Future",
        "location": "Patiala",
        "description": "Pizza delivery is a service in which a pizzeria or pizza chain delivers a pizza to a customer. An order is typically made either by telephone or over the internet to the pizza chain, in which the customer can request pizza type, size and other products alongside the pizza, commonly including soft drinks. Pizzas may be delivered in pizza boxes or delivery bags, and deliveries are made with either an automobile, motor scooter, or bicycle. Customers can, depending on the pizza chain, choose to pay online, or in person, with cash, credit or a debit card. A delivery fee is usually charged with what the customer has bought."
    }]
};

var education = {
    "schools": [{
            "name": "Chitkara University",
            "location": "Chandigarh",
            "degree": "B.Tech",
            "majors": ["CS"],
            "dates": "2015",
            "url": "http://example.com"
        }, {
            "name": "Chandigarh University",
            "location": "Chandigarh",
            "degree": "BA",
            "majors": ["CS"],
            "dates": "2005",
            "url": "http://example1.com"
        }

    ],
    "onlineCourses": [{
        "title": "Front-End nanodegree",
        "school": "udacity",
        "dates": "2014",
        "url": "http://www.udacity.com"
    }]
};

var projects = {
    "projects": [{
        "title": "Magnus Effect",
        "dates": "2014",
        "description": "The Magnus effect is the commonly observed effect in which a spinning ball (or cylinder) curves away from its principal flight path. It is important in many ball sports. It affects spinning missiles, and has some engineering uses, for instance in the design of rotor ships and Flettner aeroplanes.",
        "images": [
            "images/download.png",
            "images/download1.jpg"
        ]
    }]
};


bio.display = function() {
    var myname = HTMLheaderName.replace('%data%', bio.name);
    var myrole = HTMLheaderRole.replace('%data%', bio.role);
    $('#header').prepend(myrole);
    $('#header').prepend(myname);
    var mobileno = HTMLmobile.replace('%data%', bio.contacts.mobile);
    var emailid = HTMLemail.replace('%data%', bio.contacts.email);
    var githubid = HTMLgithub.replace('%data%', bio.contacts.github);
    var twitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var pic = HTMLbioPic.replace('%data%', bio.biopic);
    var msg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var location = HTMLlocation.replace("%data%", bio.contacts.location);
    $('#header').append(pic + msg);
    $('#header').append(HTMLskillsStart);
    for (var index = 0; index < bio.skills.length; index++) {
        var skillhead = HTMLskills.replace('%data%', bio.skills[index]);
        $('#header').append(skillhead);
    }
    $('#topContacts,#footerContacts').append(mobileno + emailid + githubid + twitter + location);
};

work.display = function() {
    var job;
    for (job = 0; job < work.jobs.length; job++) {
        $('#workExperience').append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace('%data%', work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace('%data%', work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $('.work-entry:last').append(formattedEmployerTitle);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $('.work-entry:last').append(formattedDates);

        var formattedlocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $('.work-entry:last').append(formattedlocation);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
    }
};

projects.display = function() {
    var project;
    for (project = 0; project < projects.projects.length; project++) {
        if (project >= 0) {
            $('#projects').append(HTMLprojectStart);

            var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
            $('.project-entry:last').append(formattedTitle);

            var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
            $('.project-entry:last').append(formattedDates);

            var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
            $('.project-entry:last').append(formattedDescription);

            if (projects.projects[project].images.length > 0) {
                var image;
                for (image = 0; image < projects.projects[project].images.length; image++) {
                    var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                    $(".project-entry:last").append(formattedImage);
                }
            }
        }
    }
};

education.display = function() {
    var edu;
    for (edu = 0; edu < education.schools.length; edu++) {
        $('#education').append(HTMLschoolStart);

        var formattededucation = HTMLschoolName.replace("%data%", education.schools[edu].name);
        $('.education-entry:last').append(formattededucation);

        var formatteddegree = HTMLschoolDegree.replace("%data%", education.schools[edu].degree);
        $('.education-entry:last').append(formatteddegree);

        var formatteddates = HTMLschoolDates.replace("%data%", education.schools[edu].dates);
        $('.education-entry:last').append(formatteddates);

        var formattedlocation = HTMLschoolLocation.replace("%data%", education.schools[edu].location);
        $('.education-entry:last').append(formattedlocation);

        var formattedmajor = HTMLschoolMajor.replace("%data%", education.schools[edu].majors);
        $('.education-entry:last').append(formattedmajor);
    }

    for (edu = 0; edu < education.onlineCourses.length; edu++) {

        $('.education-entry:last').append(HTMLonlineClasses);

        var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[edu].title);
        $('.education-entry:last').append(formattedTitle);

        var formattedschool = HTMLonlineSchool.replace("%data%", education.onlineCourses[edu].school);
        $('.education-entry:last').append(formattedschool);

        var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[edu].dates);
        $('.education-entry:last').append(formattedDates);

        var formattedurl = HTMLonlineURL.replace("%data%", education.onlineCourses[edu].url);
        $('.education-entry:last').append(formattedurl);
    }
};


$('#mapDiv').append(googleMap);

bio.display();
work.display();
projects.display();
education.display();
