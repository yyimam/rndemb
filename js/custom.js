document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("quoteForm");
    const messageBox = document.getElementById("formMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        messageBox.innerHTML = "";

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const mobile = form.mobile.value.trim();
        const message = form.message.value.trim();

        const file1 = form.file_1.files.length;
        const file2 = form.file_2.files.length;
        const file3 = form.file_3.files.length;

        // Basic Validation
        if (name === "") {
            showError("Name field is required");
            return;
        }

        if (email === "") {
            showError("Email field is required");
            return;
        }

        if (!validateEmail(email)) {
            showError("Please enter a valid email");
            return;
        }

        if (file1 === 0 && file2 === 0 && file3 === 0) {
            showError("Please attach at least one file");
            return;
        }

        const formData = new FormData(form);

        fetch("send-quote.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                messageBox.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                form.reset();
            } else {
                showError(data.message);
            }
        })
        .catch(error => {
            showError("Something went wrong. Please try again.");
        });
    });

    function showError(msg) {
        messageBox.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
    }

    function validateEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }

});
