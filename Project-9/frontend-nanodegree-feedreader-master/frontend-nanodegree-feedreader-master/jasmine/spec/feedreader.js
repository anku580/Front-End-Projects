/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {

    describe('RSS Feeds', function() { /* first test suite has been created*/

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        it('URL defined', function() { /* url is defined  it tests whether url is working or not*/
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url).not.toBe("");
            }
        })



        it('name defined', function() { /* url is defined  it tests whethername name is not empty*/
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name).not.toBe("");
            }
        })

    });



    describe('The Menu', function() { /*new test suite name menu is defined*/


        it('is hidden by default', function() { /* this test ensures the menu us hidden by default*/
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });


        it('Visibility got changed', function() { /*it ensures the visibly chnages everytimr when it get clicked*/
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function() { /* a new test case with name initial enteries is created*/
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('Feed container contains atleast of 1 entry', function(done) { /*it ensures that feed container contains minimum of one entry*/
            expect($('.feed .entry').length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() { /*new test named New Feed Selection is created*/
        var ofeed, nfeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                ofeed = $('.feed').html();
                loadFeed(1, function() {
                    nfeed = $('.feed').html();
                    done();
                });
            });
        });

        it('diffrent from old feed', function() { /*it function created to check*/
            expect(nfeed).not.toEqual(ofeed);
        });
    });
}());
