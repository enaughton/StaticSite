const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const { projects } = require('./data.json');
const projectsRoute = require('./project.js');


const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.use('/projects', projectsRoute);

app.get('/' , (req, res) => {
	res.render('index',  {
        heading: 'Hi, my name is Emmett!',
        description: 'Discipline Equals Freedom - Jocko Wilink',
        projects
        
    });
})

app.get('/about', (req, res) => {
	res.render('about')
})

app.get('/project', (req, res) => {
	res.render('project', projectsRoute )
	})

// not found error handling
app.use((req, res, next) => {
    const error = new Error('The Route Does not Exsist');
    error.status = 404;
    next(error);
   
});

// error handling middleware
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    // set locals
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);

});


app.listen(port, () => {
    console.log(`App running at port :${port}`);
});