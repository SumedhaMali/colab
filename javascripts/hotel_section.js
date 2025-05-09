//booking stays
document.addEventListener("DOMContentLoaded", function () {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("checkin").min = today;
    document.getElementById("checkout").min = today;

    const hotelImages = {
        "Grand Palace": "https://via.placeholder.com/600x200?text=Grand+Palace",
        "Oceanview Resort": "https://via.placeholder.com/600x200?text=Oceanview+Resort",
        "Mountain Inn": "https://via.placeholder.com/600x200?text=Mountain+Inn"
    };

    const checkTotalPrice = () => {
        let checkin = new Date(document.getElementById("checkin").value);
        let checkout = new Date(document.getElementById("checkout").value);
        let rooms = parseInt(document.getElementById("rooms").value);
        let roomRate = parseInt(document.getElementById("room-type").value);
        let error = document.getElementById("error-message");

        if (isNaN(checkin) || isNaN(checkout) || !rooms || !roomRate) {
            error.textContent = "Please fill all required fields.";
            return;
        }

        if (checkout <= checkin) {
            error.textContent = "Check-out date must be after check-in date.";
            return;
        }

        let nights = (checkout - checkin) / (1000 * 60 * 60 * 24);
        let total = nights * rooms * roomRate;
        document.getElementById("total-price").textContent = `$${total}`;
        error.textContent = "";
    };

    document.getElementById("calculate-price").addEventListener("click", checkTotalPrice);

    document.getElementById("check-availability").addEventListener("click", function () {
        let hotel = document.getElementById("hotel").value;
        let checkin = document.getElementById("checkin").value;
        let checkout = document.getElementById("checkout").value;
        let rooms = document.getElementById("rooms").value;
        let guests = document.getElementById("guests").value;
        let roomType = document.getElementById("room-type").value;
        let error = document.getElementById("error-message");

        if (!hotel || !checkin || !checkout || !rooms || !guests || !roomType) {
            error.textContent = "Please complete all fields before checking availability.";
            return;
        }

        error.textContent = "";
        document.getElementById("availability-msg").textContent = "Rooms are available! Proceed to booking.";
        document.getElementById("booking-summary").style.display = "block";
        document.getElementById("hotel-img").src = hotelImages[hotel] || "";
        document.getElementById("summary-text").textContent =
            `Hotel: ${hotel}\nGuests: ${guests}, Rooms: ${rooms}, From: ${checkin} To: ${checkout}`;
    });
});

//reviews
document.addEventListener("DOMContentLoaded", function () {
    const reviewsContainer = document.getElementById("reviews-container");
    const submitButton = document.getElementById("submit-review");
    const errorMessage = document.getElementById("error-message");

    submitButton.addEventListener("click", function () {
        let username = document.getElementById("username").value.trim();
        let reviewText = document.getElementById("user-review").value.trim();
        let rating = document.getElementById("user-rating").value;

        // Validate input
        if (username === "" || reviewText === "") {
            errorMessage.textContent = "Please fill in all fields.";
            return;
        } else {
            errorMessage.textContent = "";
        }

        // Create new review element
        let newReview = document.createElement("div");
        newReview.classList.add("review");

        let profileImage = document.createElement("img");
        profileImage.src = "default-profile.jpg"; // Default profile image
        profileImage.alt = username;

        let reviewContent = document.createElement("div");
        reviewContent.classList.add("review-content");

        let nameElement = document.createElement("h4");
        nameElement.textContent = username;

        let reviewTextElement = document.createElement("p");
        reviewTextElement.textContent = `"${reviewText}"`;

        let starsElement = document.createElement("div");
        starsElement.classList.add("stars");
        starsElement.innerHTML = "⭐".repeat(rating);

        // Append elements
        reviewContent.appendChild(nameElement);
        reviewContent.appendChild(reviewTextElement);
        reviewContent.appendChild(starsElement);
        newReview.appendChild(profileImage);
        newReview.appendChild(reviewContent);
        reviewsContainer.appendChild(newReview);

        // Clear form
        document.getElementById("username").value = "";
        document.getElementById("user-review").value = "";
    });

});

