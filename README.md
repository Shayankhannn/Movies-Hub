TODO : MODAL

movies app using react 19

will use appwrite an open source backend for react app

top trending list will be based on real time data like the more user search about movie the more it will come on top

 Trending Movies Algorithm

 adding debouncing to limit api request on seardch
 install npm i react-use for debouncing 

 to execute appwrite file we need to create a function

updateSearchCount function : 

 // 1. Use Appwrite SDK to check if the search term exists in the database
  // 2. If it does, update the count
  // 3. If it doesn't, create a new document with the search term and count as 1