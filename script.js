/* Cremeria Santo Stefano: demo site behaviour
   - IT/EN language toggle (full key parity), persisted in localStorage
   - Rotating hero flavour word, per language
   - Scroll reveals + pozzetto lids via IntersectionObserver (content visible without JS)
   - Layered parallax + card tilt: transform/opacity only, rAF-throttled
   - prefers-reduced-motion respected throughout */

(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var STRINGS = {
    it: {
      title: "Cremeria Santo Stefano: Gelateria artigianale a Bologna",
      skip: "Vai ai gusti",
      wordmarkSub: "Gelateria · Cioccolateria, Bologna",
      navGusti: "I gusti",
      navLab: "Il Laboratorio",
      navBottega: "La bottega",
      navVisita: "Visita",
      badgeAward: "Tre Coni: Guida Gelaterie d'Italia del Gambero Rosso",
      h1a: "Una gioielleria",
      h1b: "del gelato",
      h1c: "a Bologna.",
      rotatePrefix: "Oggi in vetrina:",
      rotateWords: ["pistacchio salato del Bosforo", "crema libanese", "cioccolato del Santo", "crema delle Zitelle"],
      heroLede: "Dal 2006, la famiglia Cavallari fa gelato e cioccolato artigianali in un ambiente raccolto dal gusto retrò: materie prime scelte una a una, combinazioni sempre nuove e il sapore autentico di ogni ingrediente. Sotto i portici di via Santo Stefano, a pochi passi da Piazza Santo Stefano.",
      ctaGusti: "Scopri i gusti",
      ctaCall: "Chiama la cremeria",
      ratingText: "4.333 recensioni su Google",
      plaque: "Dal 2006 · Famiglia Cavallari",
      strip1: "Tre Coni del Gambero Rosso",
      strip2: "Dal 2006 in via Santo Stefano",
      strip3: "Laboratorio a vista",
      strip4: "4,7 ★ su Google",
      strip5: "Materie prime scelte",
      gustiTitle: "I gusti per cui si fa la fila",
      gustiLede: "La vetrina cambia con le stagioni e con il mese: questi sono i gusti per cui Bologna fa la fila: un'istantanea del banco, non un menù fisso. Chiedi un assaggio: lo staff consiglia volentieri e fa provare i gusti nuovi.",
      f1Name: "Pistacchio salato del Bosforo",
      f1Desc: "Pistacchi turchi e una punta di sale: il gusto da cui molti giudicano la casa, e quello da cui partire.",
      f1Tag: "Il simbolo della casa",
      f2Name: "Cioccolato del Santo",
      f2Desc: "Fondente da cru del Venezuela: profondo, pulito, mai stucchevole.",
      f3Name: "Crema libanese",
      f3Desc: "Crema di latte con acqua di fiori d'arancio amaro di Vallebona, mandorle e pistacchi.",
      f4Name: "Crema delle Zitelle",
      f4Desc: "Mascarpone e pinoli: velluto e croccante in un solo cucchiaio.",
      f4Tag: "La preferita delle guide",
      f5Name: "Crema Piazza Santo Stefano",
      f5Desc: "La crema dedicata alla piazza delle Sette Chiese, a pochi passi da qui.",
      f6Name: "Speculoos",
      f6Desc: "Biscotto alla cannella e caramello salato, sciolti in crema.",
      f7Name: "Budino di Provenza",
      f7Desc: "Il budino classico, in versione gelato: morbido e profumato.",
      f8Name: "Nocciola di Cravanzana",
      f8Desc: "Nocciole di Cravanzana, tostate e raffinate nel Laboratorio della casa.",
      moreTitle: "Ruotano in vetrina",
      m1: "Chinotto IGP",
      m2: "Latte e fieno",
      m3: "Pera Williams e sedano",
      m4: "Kiwi e sedano",
      m5: "Yuzu, senza latte",
      m6: "Fragola e melissa",
      m7: "Nespola",
      m8: "Ricotta e fichi caramellati",
      m9: "Stracciatella",
      m10: "Fior di latte",
      m11: "Crema bolognese",
      gustiNote: "I gusti ruotano: quelli di frutta seguono la stagione: in primavera compaiono fragola e melissa e la nespola. L'elenco aggiornato è sempre in vetrina e su Instagram.",
      galTitle: "Piccola, raccolta, retrò",
      g1Cap: "Il banco: legno scuro, ottone, erbe essiccate",
      g2Cap: "Sotto i portici di via Santo Stefano",
      g3Cap: "Nel Laboratorio Cavallari, tra frutta secca e confetture",
      g4Cap: "Cioccolata calda, praline e croissant del Laboratorio",
      swipeHint: "Scorri per esplorare",
      bandKicker: "Dicono di noi",
      bandQuote: "«…bisogna aver un po' di pazienza, perché c'è sempre la fila.»",
      bandCite: "Travelnostop, sulle gelaterie Tre Coni d'Italia",
      labTitle: "Il Laboratorio Cavallari, a vista",
      labBody: "A dieci anni dall'apertura è nato, a pochi passi dalla cremeria, il Laboratorio Cavallari: uno spazio di lavoro completamente a vista. È il cuore produttivo della casa: quello che non si vede in vetrina, qui si vede fare.",
      lab1T: "Tostati e raffinati in casa",
      lab1D: "Pistacchi e nocciole vengono tostati e raffinati qui: la base dei gusti più amati nasce nel Laboratorio.",
      lab2T: "Confetture e gelatine di frutta fresca",
      lab2D: "La frutta diventa confettura e gelatina in casa: per variegati, sorbetti e colazioni.",
      lab3T: "Focacce e croissant",
      lab3D: "Dal Laboratorio escono anche focacce e croissant, pensati per accompagnare il gelato.",
      botTitle: "Non solo gelato",
      botLede: "La cremeria è anche cioccolateria e piccola pasticceria: accanto ai coni, una vetrina di cose buone da portare via.",
      b1T: "La cioccolateria",
      b1D: "Praline artigianali e cioccolata calda con panna.",
      b2T: "Macaron e torte",
      b2D: "La piccola pasticceria della casa: macaron e torte per chiudere, o cominciare, in dolcezza.",
      b3T: "Granite e sorbetti",
      b3D: "La parte fresca della vetrina: granite e sorbetti di frutta di stagione.",
      b4T: "Dal Laboratorio",
      b4D: "Confetture di frutta fresca e, a Natale, il panettone artigianale.",
      visTitle: "Sotto i portici, in via Santo Stefano",
      vAddrT: "Dove siamo",
      vAddrD: "Sotto i portici, a pochi passi da Piazza Santo Stefano e dalle Sette Chiese.",
      btnRoute: "Come arrivare",
      vHoursT: "Orari",
      dayMon: "Lunedì",
      dayTue: "Martedì",
      dayWed: "Mercoledì",
      dayThu: "Giovedì",
      dayFri: "Venerdì",
      daySat: "Sabato",
      daySun: "Domenica",
      hClosed: "Chiuso",
      hDay: "11:00-22:30",
      hoursNote: "Orari indicativi: le schede online non concordano del tutto: Google indica mercoledì-domenica 12:00-22:00. Per l'orario di oggi, guarda Instagram o chiamaci: 051 227045.",
      queueNote: "Nel fine settimana si forma la fila davanti alla porta: è il rito della casa: la pazienza viene ripagata al primo cucchiaio.",
      footLine: "Gelateria e cioccolateria artigianale, Via Santo Stefano 70/c, Bologna",
      footFine: "Sito dimostrativo (concept) non affiliato all'attività. Informazioni da fonti pubbliche, novembre 2026: gusti e orari possono variare. Fotografie illustrative generate per questo concept.",
      abGusti: "Gusti",
      abCall: "Chiama",
      abVisit: "Visita",
      altHero: "Cono con tre gusti, pistacchio, crema e cioccolato, sotto i portici di Bologna",
      altPist: "Gelato al pistacchio salato in coppetta di vetro",
      altVetrina: "Il banco retrò della cremeria",
      altPortico: "I portici di via Santo Stefano",
      altLab: "Nel Laboratorio: nocciole, pistacchi e confetture",
      altCioc: "Cioccolata calda con panna, praline e croissant"
    },
    en: {
      title: "Cremeria Santo Stefano: Artisan gelateria in Bologna",
      skip: "Skip to the flavours",
      wordmarkSub: "Gelateria · Chocolate shop, Bologna",
      navGusti: "Flavours",
      navLab: "The Laboratory",
      navBottega: "The shop",
      navVisita: "Visit",
      badgeAward: "Tre Coni: Gambero Rosso Gelaterie d'Italia Guide",
      h1a: "A jewellery box",
      h1b: "of gelato",
      h1c: "in Bologna.",
      rotatePrefix: "On the counter today:",
      rotateWords: ["Bosphorus salted pistachio", "Lebanese cream", "Cioccolato del Santo", "Crema delle Zitelle"],
      heroLede: "Since 2006, the Cavallari family has made artisan gelato and chocolate in an intimate little shop with a retro soul: raw materials chosen one by one, ever-new combinations, and the authentic flavour of every ingredient. Under the porticoes of Via Santo Stefano, a short stroll from Piazza Santo Stefano.",
      ctaGusti: "Discover the flavours",
      ctaCall: "Call the cremeria",
      ratingText: "4,333 reviews on Google",
      plaque: "Since 2006 · The Cavallari family",
      strip1: "Gambero Rosso Tre Coni",
      strip2: "On Via Santo Stefano since 2006",
      strip3: "Open-view laboratory",
      strip4: "4.7 ★ on Google",
      strip5: "Chosen raw materials",
      gustiTitle: "The flavours worth queueing for",
      gustiLede: "The counter changes with the seasons and the month: these are the flavours Bologna queues for: a snapshot of the counter, not a fixed menu. Ask for a taste: the staff happily advise and let you sample the new flavours.",
      f1Name: "Pistacchio salato del Bosforo",
      f1Desc: "Turkish pistachios with a whisper of salt: the scoop many judge the house by, and the one to start with.",
      f1Tag: "The house icon",
      f2Name: "Cioccolato del Santo",
      f2Desc: "Dark chocolate from a Venezuelan cru: deep, clean, never cloying.",
      f3Name: "Crema libanese",
      f3Desc: "Milk cream with bitter orange-blossom water from Vallebona, almonds and pistachios.",
      f4Name: "Crema delle Zitelle",
      f4Desc: "Mascarpone and pine nuts: velvet and crunch in a single spoonful.",
      f4Tag: "The guides' favourite",
      f5Name: "Crema Piazza Santo Stefano",
      f5Desc: "The cream named after the square of the Seven Churches, just steps from here.",
      f6Name: "Speculoos",
      f6Desc: "Cinnamon biscuit and salted caramel, melted into cream.",
      f7Name: "Budino di Provenza",
      f7Desc: "The classic custard pudding as gelato: soft and fragrant.",
      f8Name: "Nocciola di Cravanzana",
      f8Desc: "Cravanzana hazelnuts, toasted and refined in the house Laboratory.",
      moreTitle: "Also rotating on the counter",
      m1: "Chinotto (IGP citrus)",
      m2: "Milk & hay",
      m3: "Williams pear & celery",
      m4: "Kiwi & celery",
      m5: "Yuzu, dairy-free",
      m6: "Strawberry & lemon balm",
      m7: "Medlar",
      m8: "Ricotta & caramelised figs",
      m9: "Stracciatella",
      m10: "Fior di latte",
      m11: "Crema bolognese",
      gustiNote: "Flavours rotate: the fruit ones follow the season: in spring, strawberry & lemon balm and medlar appear. The up-to-date list lives on the counter and on Instagram.",
      galTitle: "Small, intimate, retro",
      g1Cap: "The counter: dark wood, brass, dried herbs",
      g2Cap: "Under the porticoes of Via Santo Stefano",
      g3Cap: "In the Laboratorio Cavallari, among nuts and preserves",
      g4Cap: "Hot chocolate, pralines and a Laboratory croissant",
      swipeHint: "Swipe to explore",
      bandKicker: "What they say",
      bandQuote: "“…you need a little patience, because there is always a queue.”",
      bandCite: "Travelnostop, on Italy's Tre Coni gelaterias",
      labTitle: "The Laboratorio Cavallari, in full view",
      labBody: "Ten years after opening, the Laboratorio Cavallari was born a few steps from the cremeria: a workshop completely open to view. It is the productive heart of the house: what you don't see on the counter, you can watch being made here.",
      lab1T: "Toasted and refined in-house",
      lab1D: "Pistachios and hazelnuts are toasted and refined here: the base of the most-loved flavours is born in the Laboratory.",
      lab2T: "Fresh-fruit jams and jellies",
      lab2D: "Fruit becomes jam and jelly in-house: for ripple flavours, sorbets and breakfasts.",
      lab3T: "Focacce and croissants",
      lab3D: "The Laboratory also bakes focacce and croissants, made to accompany the gelato.",
      botTitle: "Not only gelato",
      botLede: "The cremeria is also a chocolate shop and a small patisserie: next to the cones, a counter of good things to take away.",
      b1T: "The chocolate shop",
      b1D: "Handmade pralines and hot chocolate with whipped cream.",
      b2T: "Macarons and cakes",
      b2D: "The house's little patisserie: macarons and cakes to finish, or to start, sweetly.",
      b3T: "Granite and sorbets",
      b3D: "The fresh side of the counter: granite and seasonal fruit sorbets.",
      b4T: "From the Laboratory",
      b4D: "Fresh-fruit preserves, and, at Christmas, the artisan panettone.",
      visTitle: "Under the porticoes, on Via Santo Stefano",
      vAddrT: "Where we are",
      vAddrD: "Under the porticoes, a short walk from Piazza Santo Stefano and the Seven Churches.",
      btnRoute: "Get directions",
      vHoursT: "Opening hours",
      dayMon: "Monday",
      dayTue: "Tuesday",
      dayWed: "Wednesday",
      dayThu: "Thursday",
      dayFri: "Friday",
      daySat: "Saturday",
      daySun: "Sunday",
      hClosed: "Closed",
      hDay: "11:00-22:30",
      hoursNote: "Indicative hours: online listings don't fully agree: Google currently shows Wednesday-Sunday 12:00-22:00. For today's hours, check Instagram or call us: 051 227045.",
      queueNote: "At weekends a queue forms outside the door: it's the house ritual: the patience is repaid at the first spoonful.",
      footLine: "Artisan gelateria and chocolate shop, Via Santo Stefano 70/c, Bologna",
      footFine: "Unofficial concept demo, not affiliated with the business. Information from public sources (November 2026): flavours and hours may vary. Illustrative photographs generated for this concept.",
      abGusti: "Flavours",
      abCall: "Call",
      abVisit: "Visit",
      altHero: "A three-flavour cone, pistachio, cream and chocolate, under Bologna's porticoes",
      altPist: "Salted pistachio gelato in a vintage glass coupe",
      altVetrina: "The cremeria's retro counter",
      altPortico: "The porticoes of Via Santo Stefano",
      altLab: "In the Laboratory: hazelnuts, pistachios and preserves",
      altCioc: "Hot chocolate with cream, pralines and a croissant"
    }
  };

  var LANG_KEY = "css-lang";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentLang = "it";
  var rotateTimer = null;
  var rotateIdx = 0;

  function dict() { return STRINGS[currentLang]; }

  function applyLang(lang) {
    if (!STRINGS[lang]) lang = "it";
    currentLang = lang;
    var d = STRINGS[lang];
    document.documentElement.lang = lang;
    document.title = d.title;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (d[key] !== undefined) nodes[i].textContent = d[key];
    }
    var altNodes = document.querySelectorAll("[data-i18n-alt]");
    for (var j = 0; j < altNodes.length; j++) {
      var akey = altNodes[j].getAttribute("data-i18n-alt");
      if (d[akey] !== undefined) altNodes[j].setAttribute("alt", d[akey]);
    }
    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var k = 0; k < btns.length; k++) {
      btns[k].classList.toggle("is-active", btns[k].getAttribute("data-lang-btn") === lang);
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    startRotator();
  }

  function startRotator() {
    var el = document.getElementById("rotateWord");
    if (!el) return;
    if (rotateTimer) { clearInterval(rotateTimer); rotateTimer = null; }
    var words = dict().rotateWords;
    rotateIdx = 0;
    el.textContent = words[0];
    if (reduceMotion || words.length < 2) return;
    rotateTimer = setInterval(function () {
      el.classList.add("fading");
      setTimeout(function () {
        rotateIdx = (rotateIdx + 1) % words.length;
        el.textContent = words[rotateIdx];
        el.classList.remove("fading");
      }, 420);
    }, 2800);
  }

  var saved = "it";
  try { saved = localStorage.getItem(LANG_KEY) || "it"; } catch (e) {}
  applyLang(saved);

  var langBtns = document.querySelectorAll("[data-lang-btn]");
  for (var b = 0; b < langBtns.length; b++) {
    langBtns[b].addEventListener("click", function () {
      applyLang(this.getAttribute("data-lang-btn"));
    });
  }

  /* Header shadow */
  var head = document.getElementById("siteHead");
  function onScrollHead() { head.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScrollHead, { passive: true });
  onScrollHead();

  /* Reveals + pozzetto lids */
  var revealTargets = document.querySelectorAll(".rv, #pozzetti");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -6% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* Layered parallax (transform only, rAF-throttled) */
  var plxEls = [];
  if (!reduceMotion) {
    document.querySelectorAll("[data-plx]").forEach(function (el) {
      plxEls.push({ el: el, speed: parseFloat(el.getAttribute("data-plx")) || 0.05 });
    });
  }
  var ticking = false;
  function updateParallax() {
    ticking = false;
    var vh = window.innerHeight;
    for (var i = 0; i < plxEls.length; i++) {
      var item = plxEls[i];
      var host = item.el.closest("section, figure, div");
      var rect = (host || item.el).getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > vh + 120) continue;
      var delta = (rect.top + rect.height / 2 - vh / 2) * -item.speed;
      if (delta > 46) delta = 46;
      if (delta < -46) delta = -46;
      item.el.style.transform = "translate3d(0," + delta.toFixed(1) + "px,0)";
    }
  }
  if (plxEls.length) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  /* Perspective tilt on flavour cards + hero frame (fine pointers only) */
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (ev) {
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateX(" + (-py * 6).toFixed(2) + "deg) rotateY(" + (px * 6).toFixed(2) + "deg) translateY(-3px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
    var frame = document.querySelector("[data-tilt-frame]");
    if (frame) {
      var heroFig = frame.closest(".hero-fig");
      heroFig.addEventListener("pointermove", function (ev) {
        var r = heroFig.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        frame.style.transform = "perspective(1100px) rotateX(" + (-py * 4).toFixed(2) + "deg) rotateY(" + (px * 4).toFixed(2) + "deg)";
      });
      heroFig.addEventListener("pointerleave", function () { frame.style.transform = ""; });
    }
  }
})();
