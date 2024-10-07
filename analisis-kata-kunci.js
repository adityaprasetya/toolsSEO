document.getElementById('analyze-btn').addEventListener('click', function () {
            const keyword = document.getElementById('keyword').value;
            if (!keyword) {
                alert('Masukkan kata kunci terlebih dahulu.');
                return;
            }

            // Menampilkan SweetAlert untuk loading
            Swal.fire({
                title: 'Memuat...',
                html: 'Sedang mengambil data, harap tunggu.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // API Key dari SERPstack (masukkan API Key Anda)
            const apiKey = '79564a1eae72b2e278640126a57dbe90';
            const url = `https://api.serpstack.com/search?access_key=${apiKey}&query=${keyword}`;

            // Lakukan request ke SERPstack API menggunakan Fetch
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    displayResults(data);
                    Swal.close(); // Menutup SweetAlert setelah data diterima
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi kesalahan!',
                        text: 'Gagal mengambil data. Silakan coba lagi.',
                    });
                });
        });

        // Fungsi untuk menampilkan hasil pencarian
        function displayResults(data) {
            const resultsDiv = document.getElementById('analysis-result');
            resultsDiv.innerHTML = ''; // Kosongkan hasil sebelumnya

            if (data.organic_results && data.organic_results.length > 0) {
                // Buat tabel untuk hasil
                let tableHTML = `
                    <table>
                        <tr>
                            <th>No.</th>
                            <th>Keyword</th>
                            <th>URL</th>
                            <th>Snippet</th>
                        </tr>`;
                
                data.organic_results.forEach((result, index) => {
                    tableHTML += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${result.title}</td>
                            <td><a href="${result.url}" target="_blank">${result.url}</a></td>
                            <td>${result.snippet}</td>
                        </tr>`;
                });

                tableHTML += `</table>`;
                resultsDiv.innerHTML = tableHTML; // Masukkan tabel ke div
            } else {
                resultsDiv.innerHTML = '<p>Tidak ada hasil ditemukan.</p>'; // Pesan jika tidak ada hasil
            }
        }
