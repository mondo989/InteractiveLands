// Initialize variables
var title;
var questions;

// Fetch the custom.glowbom data
fetch('assets/custom.glowbom')
    .then(response => response.json())
    .then(data => {
        // Initialize variables with the fetched data
        title = data.title;
        questions = data.questions;

        // If GlowbyScreen is enabled, set appScreen to "Glowbom"
        if (GlowbyScreen.enabled) {
            appScreen = "Glowbom";
        } else {
            appScreen = "Questions";
        }
        // Call updateUI to reflect the new state
        updateUI();
    });


// Update the UI based on the appScreen state
function updateUI() {
    const contentDiv = document.querySelector('#content');
    switch (appScreen) {
        case "Loading":
            contentDiv.innerHTML = "Loading...";
            break;
        case "Questions":
            // Generate HTML for the questions
            var questionsHtml = questions.map(question => {
                switch (question.description) {
                    case "Image":
                        return `
                            <div class="question">
                                <img src="${question.buttonsTexts[0]}" style="max-width: 320px; max-height: 200px; display: block; margin: auto;">
                            </div>
                        `;
                    case "Text":
                        return `
                            <div class="question">
                                <p style="padding: 10px; max-width: 320px;">${question.buttonsTexts[0]}</p>
                            </div>
                        `;
                    case "Button":
                        return `
                            <div class="question">
                                <a href="${question.buttonsTexts[1]}" class="button" style="padding: 10px; max-width: 320px;">${question.buttonsTexts[0]}</a>
                            </div>
                        `;
                    default:
                        return `
                            <div class="question">
                                <p>Unsupported question type</p>
                            </div>
                        `;
                }
            }).join('');
            // Add the generated HTML to the content div
            contentDiv.innerHTML = '<h1 id="title">' + title + '</h1>' + questionsHtml;
            break;
        case "Glowbom":
            // Check if the GlowbyScreen is enabled
            if (GlowbyScreen.enabled) {
                // Render the GlowbyScreen
                contentDiv.innerHTML = GlowbyScreen.render();
            } else {
                // If GlowbyScreen is not enabled, display a placeholder message
                contentDiv.innerHTML = "GlowbyScreen is disabled";
            }
            break;
        default:
            contentDiv.innerHTML = `Unexpected appScreen value: ${appScreen}`;
            break;
    }
}
