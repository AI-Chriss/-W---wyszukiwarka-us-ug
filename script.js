import uslugi from "./testsList.js";

const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === "") {
    resultDiv.innerHTML = ""; // Wyczyszczenie wyników, gdy pole wejściowe jest puste
    return;
  }

  const foundServices = uslugi.filter(
    (service) =>
      service.nazwa && service.nazwa.toLowerCase().includes(searchTerm)
  );

  if (foundServices.length > 0) {
    resultDiv.innerHTML = "";
    const resultHTML = foundServices
      .map((foundService) => {
        const {
          nazwa,
          definicja,
          metody_wykonywania,
          przygotowanie,
          dodatkowe_informacje
        } = foundService;

        const definitions = [
          nazwa && `<h3 class="name"><strong>Nazwa:</strong> ${nazwa}</h3>`,
          definicja && `<p><strong>Definicja:</strong> ${definicja}</p>`,
          metody_wykonywania &&
            `<p><strong>Metody wykonywania:</strong> ${metody_wykonywania}</p>`,
          przygotowanie &&
            `<p><strong>Przygotowanie:</strong> ${przygotowanie}</p>`,
          dodatkowe_informacje &&
            `<p><strong>Dodatkowe informacje:</strong> ${dodatkowe_informacje}</p>`
        ]
          .filter(Boolean)
          .join("");

        return `<div class="usluga">${definitions}</div>`;
      })
      .join("");

    resultDiv.innerHTML += resultHTML;
  } else {
    resultDiv.innerHTML = "<p>Nie znaleziono pasujących usług.</p>";
  }
}