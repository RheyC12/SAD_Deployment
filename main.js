// Firebase configuration
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCZP6ZL856lPO2cfu65dY4NUYt3dxrBjcU",
    authDomain: "sadresearch-ef6a0.firebaseapp.com",
    databaseURL: "https://sadresearch-ef6a0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sadresearch-ef6a0",
    storageBucket: "sadresearch-ef6a0.appspot.com",
    messagingSenderId: "855295287598",
    appId: "1:855295287598:web:e773796d57dc1bd3809abf",
    measurementId: "G-K6D7DW9JZ3"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// Reference to the Firebase database
const database = firebase.database();

// Function to fetch and display featured program
// Function to fetch and display featured program
function displayFeaturedProgram() {
  const featuredProgramRef = database.ref('featuredPrograms');
  featuredProgramRef.once('value', (snapshot) => {
    const featuredProgramData = snapshot.val();
    console.log("Featured Program Data:", featuredProgramData); // Debugging
    const featuredProgramContainer = document.getElementById('featuredProgram');
    if (featuredProgramData) {
      for (const key in featuredProgramData) {
        const program = featuredProgramData[key];
        const featuredProgramCard = document.createElement('div');
        featuredProgramCard.classList.add('home-card');
        featuredProgramCard.onclick = function() {
          redirectToProgramDetails(program.link);
        };
        featuredProgramCard.innerHTML = `
          <a href="/Program_Details/program_details.html?id=1">
            <img src="${program.imageURL}" alt="${program.title}">
            <h3>${program.title}</h3>
            <p>${program.description}</p>
          </a>`;
        featuredProgramContainer.appendChild(featuredProgramCard);
      }
    } else {
      featuredProgramContainer.innerHTML = "<p>No featured program available</p>";
    }
  });
}

// Function to redirect to program details page
function redirectToProgramDetails(link) {
  window.location.href = link;
}



// Function to fetch and display recent events
// Function to fetch and display recent events
function displayRecentEvents() {
  const recentEventsRef = database.ref('recentEvents');
  recentEventsRef.once('value', (snapshot) => {
    const recentEventsData = snapshot.val();
    console.log("Recent Events Data:", recentEventsData); // Debugging
    const recentEventsContainer = document.getElementById('recentEvents');
    if (recentEventsData) {
      let recentEventsHtml = '';
      for (const key in recentEventsData) {
        const event = recentEventsData[key];
        const eventCard = document.createElement('li');
        eventCard.classList.add('home-card');
        eventCard.onclick = function() {
          redirectToAnnouncement(event.link);
        };
        eventCard.innerHTML = `
          <a href="announcements.html">
            <img src="${event.imageURL}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
          </a>`;
        recentEventsHtml += eventCard.outerHTML;
      }
      recentEventsContainer.innerHTML = recentEventsHtml;
    } else {
      recentEventsContainer.innerHTML = "<p>No recent events available</p>";
    }
  });
}

// Function to redirect to announcement details page
function redirectToAnnouncement(link) {
  window.location.href = link;
}


// Call functions to display featured program and recent events
displayFeaturedProgram();
displayRecentEvents();


function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a');

  // Clear the search input field
  searchInput.value = '';

  // Remove the highlight from all elements
  allTextElements.forEach(element => {
    element.classList.remove('highlight');
  });

  // Check if the search term is a program name or "portfolios"
  const programs = ['community', 'education', 'project scholar', 'health', 'sports'];
  if (programs.includes(searchTerm)) {
    const programSection = document.getElementById('programs');
    programSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return; // Exit the function
  } else if (searchTerm === 'portfolios') {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return; // Exit the function
  }

  let found = false;
  allTextElements.forEach(element => {
    const text = element.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      console.log('Found:', element.textContent);
      element.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      found = true;
      element.classList.add('highlight');
    }
  });

  if (!found) {
    alert('No matching result found.');
  }
}

// Add an event listener to prevent default action on click
searchInput.addEventListener('click', function(event) {
  event.preventDefault();
});

// Add an event listener to the search input for focus
searchInput.addEventListener('focus', function(event) {
  // Clear the search input field when focused
  searchInput.value = '';
});







document.getElementById('searchIcon').addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      handleSearch();
  }
});


