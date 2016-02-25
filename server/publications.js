'use strict';
/* globals Meteor, Posts */

Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function() {
    return Comments.find();
});