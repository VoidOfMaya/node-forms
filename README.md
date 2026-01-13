# base Node /Express app: MVC archeticture

### build instructions
- in CLI: npm install

## included tools:

node
express
express-validation
ejs templating
public folder(for static elements)
MVC folder structure that includes
    - controllers
    - views
    - routes
    - errors

#### assignment goals:
    * Expand the User modelImplement the following fields and validations to your model:
        - Email (required, must be formatted properly)
        - Age (optional, must be a number between 18 and 120)
        - Bio (optional, maximum 200 characters)
    * Implement searching:
        - Add a form with a GET method (in createUser.ejs or another view) which accepts a name or email (or both!)
        - Create a new route /search which accepts a GET request.
        - Add the search logic to your controller which searches your list for a matching user.
            Form data that has been sent via a  GET     
            request will not be available via req.body. You will need to use req.query instead.
            Your GET request should handle searching for the user and then render the search result.
        -Display the search results in a new view: search.ejs.
