// popup.js
document.addEventListener("DOMContentLoaded", function () {
    let data; // Declare data as a global variable

    // Function to fetch and display the list of websites
    async function fetchAndDisplayWebsites() {
        try {
            const response = await fetch("websites.json");
            data = await response.json(); // Assign the response to the global data variable

            // Check if there is data in the JSON file
            if (data && data.length > 0) {
                populateList(data);
            } else {
                // Display a message if no websites are saved
                const popupContent = document.getElementById("popupContent");
                popupContent.innerHTML = "<p>No websites are saved in the JSON file.</p>";
            }
        } catch (error) {
            console.error("Error fetching or parsing JSON:", error);
        }
    }

    // Function to add a new item to the list
    function addNewItem() {
        const newDataItem = {
            url: "",
            buttonText: "",
        };
        data.push(newDataItem);
        saveChanges(data);
    }
      
    // Function to save changes to the JSON file
    async function saveChanges(websites) {
      try {
        const response = await fetch("websites.json", {
          method: "PUT", // Use the appropriate HTTP method for your server (e.g., PUT, POST)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(websites),
        });
  
        const result = await response.json();
        console.log("Changes saved:", result);
  
        // Fetch and display the updated list after saving changes
        fetchAndDisplayWebsites();
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  
    // Function to populate and display the list
    function populateList(data) {
      const popupContent = document.getElementById("popupContent");
      popupContent.innerHTML = ""; // Clear existing content
  
      data.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
  
        // Display URL input
        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = entry.url || "";
        urlInput.placeholder = "Website URL";
        urlInput.addEventListener("change", (event) => {
          data[index].url = event.target.value;
          saveChanges(data); // Save changes on URL input change
        });
        entryDiv.appendChild(urlInput);
  
        // Display buttonText input
        const buttonTextInput = document.createElement("input");
        buttonTextInput.type = "text";
        buttonTextInput.value = entry.buttonText || "";
        buttonTextInput.placeholder = "Button Text";
        buttonTextInput.addEventListener("change", (event) => {
          data[index].buttonText = event.target.value;
          saveChanges(data); // Save changes on buttonText input change
        });
        entryDiv.appendChild(buttonTextInput);
  
        // Display additional properties based on your requirements (e.g., buttonIdentifier, buttonClass, etc.)
  
        popupContent.appendChild(entryDiv);
      });
    }
  
    // Initial population
    fetchAndDisplayWebsites();
  
    // Save changes button
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
        // Fetch and display the updated list after saving changes
        fetchAndDisplayWebsites();
    });

    // Add new item button
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
        addNewItem();
    });
});