// GlowbyScreen is an example object that can be replaced or extended
var GlowbyScreen = {
  // Set enabled to true
  enabled: true,

  // Initialize function to kick off the script
  initialize: function () {
      if (this.enabled) {
          this.fetchArtists();
      }
  },

  // Function to fetch artists from the provided URL
  fetchArtists: function () {
      var url = 'https://www.jambase.com/jb-api/v1/outside-llms-2023?&apikey=7f2a85d4-f546-4975-9589-f8c5611814e0';

      // Making a GET request to the provided URL
      fetch(url)
          .then(response => response.json())
          .then(data => this.displayArtists(data))
          .catch(error => console.error('Error:', error));
  },

  // Function to display artists on the webpage
  displayArtists: function (data) {
      // Create a new container
      var artistsContainer = document.createElement('div');
      artistsContainer.id = 'artists-container';

      // Add header image
      var headerImage = document.createElement('img');
      headerImage.src = "../custom/assets/imgs/ol.svg"; // Replace with your header image URL
      headerImage.alt = 'Header Image';
      headerImage.style.width = '100%'; // Adjust as necessary
      artistsContainer.appendChild(headerImage);

      // A Set to keep track of performer names we've already processed
      var processedPerformers = new Set();

      // Check if the events array exists in the response data
      if (data.events) {
          data.events.forEach(event => {
              // Only process performers for the "Outside Lands" event
              if (event.name === "Outside Lands") {
                  // Check if the performer array exists in the event
                  if (event.performer) {
                      event.performer.forEach(performer => {
                          // Log a message when processing an artist
                          console.log('Processing performer:', performer.name);

                          // Skip this performer if we've already processed them
                          if (processedPerformers.has(performer.name)) {
                              console.log('Skipping duplicate performer:', performer.name);
                              return;
                          }

                          var performerElement = document.createElement('div');
                          performerElement.className = 'performer';

                          var performerName = document.createElement('h2');
                          performerName.textContent = performer.name;
                          performerElement.appendChild(performerName);

                          var performerImage = document.createElement('img');
                          performerImage.src = performer.image;
                          performerElement.appendChild(performerImage);

                          artistsContainer.appendChild(performerElement);

                          // Add the performer's name to the Set of processed performers
                          processedPerformers.add(performer.name);
                      });
                  }
              }
          });
      } else {
          console.error('Error: events array not found in response data');

          // Display the raw response data
          var rawDataElement = document.createElement('pre');
          rawDataElement.textContent = JSON.stringify(data, null, 2);
          artistsContainer.appendChild(rawDataElement);
      }

      // Append the container to the body
      document.body.appendChild(artistsContainer);
  },

  // Render function to be called from app.js
  render: function () {
      // Implementation depends on how you want to use this function
      // For now, I'll just call the initialize function
      this.initialize();
  }
}

// Kick off the script
// GlowbyScreen.render();
