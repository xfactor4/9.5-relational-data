import $ from 'jquery'
import Backbone from 'backbone';
import User from './user';

const Session = Backbone.Model.extend({
  authenticate(options) {
      if (options.username && options.password) {
        return $.ajax({
          url: "https://api.parse.com/1/login",
          data: {
            username: options.username,
            password: options.password
          }
        }).then((response) => {
          this.set('currentUser', new User(response));
          localStorage.setItem('parse-session-token', response.sessionToken);
          this.trigger('authenticationSucceeded');
          return true;
        }, () => false);
      } else if (options.sessionToken) {
        // I'm authenticating with a sessionToken
        var user = new User(options);
        this.set('currentUser', user);
        this.trigger('authenticationSucceeded');
        return user.fetch().then(() => {
          return true;
        }, () => false);
      } else {
        console.error("Invalid arguments to authenticate");
        var dfd = new $.Deferred();
        dfd.reject("Invalid arguments to authenticate");
        return dfd.promise();
      }
    },
    restore() {
      var token = localStorage.getItem('parse-session-token')
      if (token) {
        this.authenticate({
          sessionToken: token
        })
      }
    },
    invalidate() {
      localStorage.removeItem('parse-session-token');
      this.trigger('invalidationSucceeded')
      window.location.reload();
    },
    isAuthenticated() {
      return !!this.get('currentUser')
    }
});
export default Session;
