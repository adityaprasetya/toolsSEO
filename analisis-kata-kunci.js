document.getElementById('analyze-btn').addEventListener('click', function () {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        alert('Masukkan kata kunci terlebih dahulu.');
        return;
    }

    // API Key dari SERPstack (masukkan API Key Anda)
    const apiKey = '79564a1eae72b2e278640126a57dbe90';
    const url = `https://api.serpstack.com/search?access_key=${apiKey}&query=${keyword}`;

    // Lakukan request ke SERPstack API menggunakan Fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Fungsi untuk menampilkan hasil pencarian
function displayResults(data) {
    const resultsDiv = document.getElementById('analysis-result');
    resultsDiv.innerHTML = ''; // Kosongkan hasil sebelumnya

    if (data.organic_results && data.organic_results.length > 0) {
        data.organic_results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <h3><a href="${result.url}" target="_blank">${result.title}</a></h3>
                <p>${result.snippet}</p>
            `;
            resultsDiv.appendChild(resultItem);
        });
    } else {
        resultsDiv.innerHTML = '<p>Tidak ada hasil ditemukan.</p>';
    }
}
