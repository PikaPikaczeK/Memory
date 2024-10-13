addEventListener("DOMContentLoaded", () => {
  const karty = document.querySelectorAll(".karta");
  let licznik = 0;
  let stos = [];
  let wartosci = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  for (let i = 0; i < 12; ++i) {
    stos[i] = karty[i];
  }
  for (let i = 0; i < 12; ++i) {
    const wylosowana = losowanie(wartosci.length);
    karty[i].value = wartosci[wylosowana];
    wartosci.splice(wylosowana, 1);
  }
  let aktywne = [];
  let odgadniete = 0;
  let ruchy = 0;
  karty.forEach((element) => {
    element.addEventListener("click", () => {
      ++ruchy;
      if (!aktywne.includes(element)) {
        licznik++;
        const paragraf = document.createElement("p");
        paragraf.classList.add("tekst");
        const tekst = document.createTextNode(`${element.value}`);

        if (licznik <= 2) {
          aktywne.push(element);
          element.classList.add("flipped");
          setTimeout(() => {
            paragraf.appendChild(tekst);
            element.appendChild(paragraf);
          }, 200);
        }

        if (licznik === 2) {
          if (aktywne[0].value === aktywne[1].value) {
            odgadniete++;
            aktywne.forEach((karta) => {
              karta.classList.add("odgadnieta");
            });
            aktywne = [];
            licznik = 0;
            if (odgadniete === 6) {
              document.querySelector(
                "body"
              ).innerHTML = `Gratulacje!</br>Ukończyłeś grę w </br> ${ruchy} ruchach!`;
            }
          } else {
            setTimeout(() => {
              aktywne.forEach((karta) => {
                karta.classList.remove("flipped");
                const paragraf = karta.querySelector("p");
                if (paragraf) {
                  paragraf.remove();
                }
              });
              aktywne = [];
              licznik = 0;
            }, 1000);
          }
        }
      }
    });
  });
});

const losowanie = (zakres) => {
  let liczba = Math.floor(Math.random() * zakres);
  return liczba;
};
