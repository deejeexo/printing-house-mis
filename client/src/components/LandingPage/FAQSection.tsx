function FAQSection() {
  return (
    <div>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Dažniausiai užduodami klausimai
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="mb-12">
              <p className="font-bold mb-4">
                Kokias siūlote spausdinimo paslaugas?
              </p>
              <p className="text-gray-500">
                Mūsų spaustuvė siūlo platų spausdinimo paslaugų spektrą,
                įskaitant skaitmeninę, ofsetinę, didelio formato spausdinimas,
                spausdinimas pagal užsakymą ir dar daugiau. Galime spausdinti
                ant įvairių medžiagų, įskaitant popierių, kartoną, vinilą ir kt.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                Ar galite spausdinti nestandartinius dydžius arba dizainą?
              </p>
              <p className="text-gray-500">
                Taip, galime spausdinti nestandartinius dydžius ir dizainą.
                Turime komandą grafikos dizainerių, kurie gali padėti jums
                sukurti individualų dizainą arba galite pateikti savo dizainą.
                Taip pat galime spausdinti ant įvairių medžiagų ir bet kokio
                reikiamo dydžio.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                Per kiek laiko gausiu savo spausdintą medžiagą?
              </p>
              <p className="text-gray-500">
                Spausdintinės medžiagos parengimo laikas priklauso nuo nuo jūsų
                projekto dydžio ir sudėtingumo, taip pat nuo mūsų dabartinės
                gamybos grafiko. Vidutiniškai mūsų darbų atlikimo laikas yra 2-7
                darbo dienų. Jei spausdintinės medžiagos reikia greičiau, mes
                siūlome skubios spaudos paslaugas.
              </p>
            </div>

            <div className="col-md-12 mb-12">
              <p className="font-bold mb-4">Ar siūlote siuntimo paslaugas?</p>
              <p className="text-gray-500">
                Taip, siūlome siuntimo paslaugas į bet kurią pasaulio vietą. Mes
                naudojame patikimais vežėjais, kad užtikrintume, jog jūsų
                spausdintinė medžiaga bus pristatyti saugiai ir laiku. Siuntimo
                kaina priklauso nuo jūsų siuntos dydžio ir svorio, taip pat nuo
                pristatymo paskirties vietos.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                Kokia yra jūsų grąžinimo politika?
              </p>
              <p className="text-gray-500">
                Mūsų tikslas - užtikrinti, kad būtumėte visiškai patenkinti jūsų
                spausdinta medžiaga. Jei nesate patenkinti savo užsakymu,
                susisiekite su mumis per 7 dienas nuo siuntos ir mes kartu su
                jumis išspręsime visas problemas. Jei reikia grąžinti,
                pateiksime instrukcijas, kaip tai padaryti ir kaip elgtis.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                Kaip pateikti užsakymą arba gauti pasiūlymą?
              </p>
              <p className="text-gray-500">
                Galite pateikti užsakymą arba paprašyti pasiūlymo susisiekę su
                mumis tiesiogiai telefonu, el. paštu arba per mūsų svetainę.
                Mūsų klientų aptarnavimo komanda mielai jums padės ir atsakys į
                visus klausimus.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FAQSection;
