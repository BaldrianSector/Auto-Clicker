// content.js
window.onload = function () {
    console.log("Page loaded:", window.location.href);
 
    // Function to fetch the list of websites from the JSON file
    async function fetchWebsites() {
       const response = await fetch("websites.json");
       const data = await response.json();
       return data;
    }
 
    // Check if the current URL matches any entry in the list
    fetchWebsites().then((websites) => {
       const currentUrl = window.location.href;
       const currentSite = websites.find((site) => currentUrl.includes(site.url));
 
       if (currentSite) {
          // If a matching entry is found, click the associated button
          let button;
 
          // Try to find the button by class
          if (currentSite.buttonClass) {
             button = document.querySelector(`.${currentSite.buttonClass}`);
          }
 
          // If the button is not found by class or if there is no class specified, try finding it by id
          if (!button && currentSite.buttonIdentifier) {
             button = document.getElementById(currentSite.buttonIdentifier);
          }
 
          if (button && button.textContent.trim() === currentSite.buttonText) {
             console.log("Button found on:", currentUrl);
             button.click();
             console.log("Button clicked on:", currentUrl);
          } else {
             console.log("Button not found or does not match the specified criteria:", currentUrl);
          }
       } else {
          console.log("No matching entry found for:", currentUrl);
       }
    });
 };
 