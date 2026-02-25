//fecth javascript method use to fecth http request.
//fecth return promises.

//basic syntax - fetch('url');
fetch("https://jsonplaceholder.typicode.com/users/1")
.then(response=>response.json())
.then(data=>console.log(data))
.catch(error=>console.log(error))

//unserstand line by line
//async , await with fetch method.
//fetch user diplay name in html list
//fetch post show only first 5 only records
//create a fake promise manually and resolve after 3 second and reject after 3 secons
//what is promise in js
//what is promise status
//differnet between callback and promises
//what is fetch method in js
//what does fecth return
//why do we respose.json()
//differnet between then and catch and async and await
//what is promise chain

