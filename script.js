
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("status");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const data = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = "I have recieved your message, I'll respond shortly.";
            status.classList.add("success");
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.textContent = "Oops! There was a problem sendin your message, please try again.";
                }
            });
            status.classList.add("error");
        }
    });
});
