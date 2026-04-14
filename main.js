const search = document.getElementById("search");
const month = document.getElementById("month");
const year = document.getElementById("year");
const result = document.getElementById("result");

let certificates = [];

// 🔥 Load all JSON data
async function loadData() {
    try {
        let res1 = await fetch("2024.json");
        let res2 = await fetch("2025.json");
        let res3 = await fetch("2026.json");

        let d1 = await res1.json();
        let d2 = await res2.json();
        let d3 = await res3.json();

        certificates = [...d1, ...d2, ...d3];

        console.log("Data Loaded:", certificates);
    } catch (err) {
        result.innerHTML = "<p class='noData'>Data load error</p>";
    }
}

loadData();

// 🔍 Search function
function runSearch() {
    let value = search.value.toLowerCase().trim();

    if (value === "") {
        result.innerHTML = "";
        return;
    }

    let filtered = certificates.filter(c =>
        (year.value === "" || c.year === year.value) &&
        (month.value === "" || c.month.toLowerCase() === month.value.toLowerCase()) &&
        (
            c.name.toLowerCase().startsWith(value) ||
            c.certNo.toLowerCase().startsWith(value)
        )
    );

    display(filtered);
}

// 🔹 Events
search.addEventListener("input", runSearch);
month.addEventListener("change", runSearch);
year.addEventListener("change", runSearch);

// 🔹 Display
function display(data) {
    result.innerHTML = "";

    if (data.length === 0) {
        result.innerHTML = "<p class='noData'>No Certificate Found</p>";
        return;
    }

    data.forEach(c => {
        result.innerHTML += `
        <div class="card">
            <b>Name:</b> ${c.name}<br>
            <b>Certificate No:</b> ${c.certNo}<br>
            <b>Caste:</b> ${c.caste}<br>
            <b>Month:</b> ${c.month}<br>
            <b>Year:</b> ${c.year}
        </div>
        `;
    });
}
