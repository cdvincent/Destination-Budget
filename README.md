<h1>Destination-Budget</h1>

<h4>Link</h4>
<p>https://destination-budget.herokuapp.com/</p>

<h4>Technology used</h4>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>Bootstrap</li>
    <li>Javascript</li>
    <li>React</li>
    <li>React Router Dom</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>PassportJs</li>
    <li>bcrypt</li>
    <li>SkyScanner API</li>
    <li>react-calendar</li>
    <li>react-toastify</li>
</ul>

<h2>Description</h2>
<p>Destination: Budget is an application created to budget flights for users. The user can create a budget, search for a trip, view all of their trips, and view the amount they need to save to go on that trip.</p>

<h2>Development</h2>
<p>Destination: Budget's routes are inaccessible unless the user has an account and is logged in. The login function is done using PassportJs and bcrypt to hash the user created password. Using MongoDB and Mongoose, the users login information, trips, and budget are all stored in a database.</p>

<p>If the user does not have an existing budget, they will be greeted with a budget form. Otherwise, their budget will be shown. Each budget is comprised of different category of payments and calculates the users "disposable income" by taking the difference between the users monthly income and the total bills amount.</p>

<p>The user can also make a search by interfacing with the SkyScanner API. The user search uses the react-calendar npm to capture the desired travel dates, and a form to capture the destination and origin cities. The app will make an API call to supply different airports for the user to choose from.</p>

<p>Once two airports are selected (a destination ariport and an origin airport), another API call is made to supply all flights found given the users parameters, and returns the cost for each flight found. First, the user will be prompted to select a departing flight. Once selected, the departed flights while stop showing using a ternary, and the returning flights will be shown. Once the user selects both flights, the trip will be added to the database for that user.</p>

<p>On the trips page, the user can view all of their trips and click the budget button to see how much they would need to save daily in order to afford the trip. The user can also click the delete button in order to delete a specific trip from the database.</p>