const year = document.getElementById("year");
const month = document.getElementById("month");
const searchBox = document.getElementById("searchBox");
const search = document.getElementById("search");
const result = document.getElementById("result");

let certificates = [];

// 🔹 Year change → load JSON file
year.addEventListener("change", () => {
    if (!year.value) return;

    fetch(`${year.value}.json`)
    .then(res => res.json())
    .then(data => {
        certificates = data;
        result.innerHTML = "";
        search.value = "";
        searchBox.style.display = "none";
    })
    .catch(() => {
        result.innerHTML = "<p style='color:red'>Data load error</p>";
    });
});

// 🔹 Month select → show search box
month.addEventListener("change", () => {
    if (month.value) {
        searchBox.style.display = "block";
        result.innerHTML = ""; // আগের result clear
    } else {
        searchBox.style.display = "none";
        result.innerHTML = "";
    }
});

// 🔍 Search (startsWith logic)
search.addEventListener("input", () => {
    let value = search.value.toLowerCase().trim();

    // ❌ empty হলে কিছুই না
    if (value === "") {
        result.innerHTML = "";
        return;
    }

    let filtered = certificates.filter(c =>
        c.month === month.value &&
        (
            c.name.toLowerCase().startsWith(value) ||
            c.certNo.toLowerCase().startsWith(value)
        )
    );

    display(filtered);
});

// 🔹 Display function (multiple data fix)
function display(data) {
    result.innerHTML = "";

    if (data.length === 0) {
        result.innerHTML = "<p style='color:red'>No Certificate Found</p>";
        return;
    }

    data.forEach(c => {
        result.innerHTML += `
        <div class="card">
            <b>Name:</b> ${c.name}<br>
            <b>Certificate No:</b> ${c.certNo}<br>
            <b>Caste:</b> ${c.caste}
        </div>
        `;
    });
}
