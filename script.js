function Review(description, category, experience) {
    this.description = description;
    this.category = category;
    this.experience = experience;
}


Review.prototype.getSummary = function () {
    return `${this.category.toUpperCase()} - ${this.description} (${this.experience})`;
};


const ReviewManager = {
    getReviews() {
        return JSON.parse(localStorage.getItem("reviews")) || [];
    },
    savereviews(reviews) {
        localStorage.setItem("reviews" , JSON.stringify(reviews));
    },

    addReview(review) {
        const reviews = this.getReviews();
        reviews.push(review);
        this.savereviews(reviews);
    }
};

function displayReviews() {
    const list = document.getElementById("review-list");
    if (!list) return;

    const reviews = ReviewManager.getReviews();

    list,innerHTML = "";

    reviews.forEach(r => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.textContent = `${r.category.toUpperCase()} - ${r.description} (${r.experience})`;
        list.appendChild(card);
    });
}


function handleAddTask() {
    const desc = document.getElementById("t-desc").value;
    const category = document.getElementById("t-category").value;
    const experience = document.getElementById("t-experience").value;

    if(!desc) {
        alert("please enter description");
        return;
    }


    const review = new Review(desc,category,experience);

ReviewManager.addReview(review);

document.getElementById("t-desc").value = "";

displayReviews();
}

window.onload = displayReviews;