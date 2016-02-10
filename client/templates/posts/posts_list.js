'use strict';
/* globals Template, Posts */

Template.postsList.helpers({
    posts: function() {
        return Posts.find();
    }
});