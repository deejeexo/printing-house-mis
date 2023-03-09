import React from "react";

function NotFoundPage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://media.tenor.com/vYTwUEafhogAAAAC/404.gif"
          alt=""
        ></img>
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
          <div className="bg-yellow-500 h-full rounded-lg p-6 lg:pl-12 text-white flex items-center text-center lg:text-left">
            <div className="lg:pl-12">
              <h2 className="text-3xl font-bold mb-6">
                Ups! Atsiprašome, bet ieškomo puslapio rasti nepavyko.
              </h2>

              <p>
                Gali būti, kad puslapis pašalintas arba neteisingai nurodytas
                URL adresas. Dar kartą patikrinkite URL, ar jame nėra klaidų,
                arba pabandykite pasinaudoti mūsų svetainės paieškos funkcija,
                kad rastumėte ieškomą turinį. Taip pat galite grįžti į mūsų
                pagrindinį puslapį ir iš ten pereiti prie turinio. Jei ir toliau
                patirsite sunkumų, nedvejodami susisiekite su mumis ir mes
                pasistengsime jums padėti. Dėkojame, kad lankotės mūsų
                svetainėje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
