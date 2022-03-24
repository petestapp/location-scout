import React from 'react';

function AboutPage() {
  return (
    <div className="container">
      <div
      // class="row"
      >
        <div
        // class="col-sm-8"
        >
          <h2>The Story</h2>
          <p>
            My dad is a photographer who loves to travel around the Upper Midwest taking pictures of small towns. He has a big map printed out with letter grades on the towns for how photographic he deems them. I wanted to digitize this system to make it more manageable and accessible.
          </p>
        </div>
        <div
        // class="col-sm-6"
        >
          <h2>Technologies Used</h2>
          <ul>
            <li>React</li>
            <li>Javascript</li>
            <li>PostgreSQL</li>
            <li>Redux-Saga</li>
            <li>Node</li>
            <li>Express</li>
            <li>Google Maps API</li>
            <li>Bootstrap</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>My Biggest Challenge</h2>
        <p>
          Implementing the Google Maps API was very challenging. Getting the location of the user's click on the addNewLocation page took the most work and thinking. The method built into @google-maps-react/api was not working as intended and the fixes I could find on the internet were not working either. I had to figure out how to reverse engineer a click to send the coordinates to the component, which would then use the Google Maps Reverse Geolocating API to find the city, state, and ZIP code info that matched. Getting the click to work ended up being a pretty simple fix, but it was a journey getting there.
        </p>
      </div>
      <div>
        <h2>Next Steps</h2>
        <p>
          My next steps are refining some of the Google Maps features. I'd like to find a way that the click on the addNewLocation component would drop a marker down, which might take some more reverse engineering of a feature that isn't working.
        </p>
        <p>
          I'd also need to create some sort of zooming algorithm. From what I can tell, you can only set two variables regarding zoom when a map loads, the zoom level and center. I want to figure out a way to zoom the map to frame all of the locations in a list. It's not difficult to approximate the zoom level if the locations in a list are relatively close to each other, but as they spread out it gets harder.
        </p>
      </div>
      <div>
        <h2>Thanks</h2>
        <p>
          I'd like to thank my instructor, Dev, all of my cohortmates at Prime, and especially the morning study group. I'd also like to thank my dad for providing me with such a good problem to solve.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
