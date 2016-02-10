'use strict';
/* globals Meteor, Posts */

Meteor.publish('posts', function(author) {
    return Posts.find({
        author: author
    });
});