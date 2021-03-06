Template.postEdit.onCreated(function() {
    Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
    errorMessage: function(field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    }
});

Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var postAttributes = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            _id: this._id
        }

        var errors = validatePost(postAttributes);
        if (errors.title || errors.url)
            return Session.set('postEditErrors', errors);

        Meteor.call('postUpdate', postAttributes, function(error, result) {
            // display the error to the user and abort
            if (error) {
                // display the error to the user
                Errors.throw(error.reason);
            }

            // show this result but route anyway
            if (result.postExists) {
                Errors.throw('This link has already been posted');
            }

            Router.go('postPage', {
                _id: result._id
            });
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('home');
        }
    }
});
