import type { Content } from './en'

const pl: Content = {
  meta: {
    title: 'Rafał Gryncewicz — Senior Full-Stack Developer i administrator Linux',
    description: '15 lat doświadczenia: Laravel i PHP, Vue / Nuxt, Node.js, integracje REST API i ERP, WooCommerce, PrestaShop i Shopify oraz administracja serwerami VPS i dedykowanymi na Linuksie. Dla firm, agencji i software house’ów.',
    ogLocale: 'pl_PL',
    role: 'Senior Full-Stack Developer i administrator Linux'
  },
  nav: {
    links: [
      { label: 'Usługi', hash: 'services' },
      { label: 'Realizacje', hash: 'work' },
      { label: 'Software house’y', hash: 'partners' },
      { label: 'Cennik', hash: 'process' },
      { label: 'FAQ', hash: 'faq' }
    ],
    cta: 'Rozpocznij projekt',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    skip: 'Przejdź do treści',
    home: 'strona główna'
  },
  hero: {
    availability: 'Przyjmuję nowe projekty',
    title: 'Doświadczony full-stack developer',
    accent: 'do projektów, które muszą działać.',
    lead: 'Jestem Rafał, od 15 lat buduję aplikacje w Laravelu i Nuxcie, integruję API i systemy ERP, wdrażam sklepy internetowe i administruję serwerami Linux, na których to wszystko działa. Jeden doświadczony inżynier, od bazy danych po wdrożenie.',
    primary: 'Rozpocznij projekt',
    secondary: 'Dla software house’ów',
    profile: 'Pobierz profil (PDF)',
    facts: [
      { value: '15+', label: 'lat na produkcji' },
      { value: 'DB → UI', label: 'plus serwer pod spodem' },
      { value: 'PL · EN', label: 'języki współpracy' },
      { value: 'CET', label: 'Polska, strefa czasowa UE' }
    ]
  },
  stack: { label: 'Codzienne narzędzia' },
  services: {
    eyebrow: 'Usługi',
    title: 'Wszystko, czego potrzebuje produkt webowy,',
    accent: 'w jednym miejscu.',
    lead: 'Od pierwszej tabeli w bazie po serwer, na którym działa aplikacja. Rozmawiasz z osobą, która pisze kod, a nie z opiekunem klienta.',
    items: [
      { icon: 'i-lucide-code-xml', title: 'Aplikacje webowe', text: 'Systemy na zamówienie, produkty SaaS, panele klienta i narzędzia wewnętrzne w Laravelu i PHP, z czystą architekturą, testami i dokumentacją do przekazania.', tags: ['Laravel', 'PHP 8', 'MySQL', 'Kolejki'], wide: true },
      { icon: 'i-lucide-layout-template', title: 'Front-end i UI', text: 'Szybkie, dostępne interfejsy w Vue 3 i Nuxt z Nuxt UI i Tailwind CSS, mobile first i dopracowane pod Core Web Vitals.', tags: ['Vue', 'Nuxt', 'Tailwind'] },
      { icon: 'i-lucide-plug-zap', title: 'Integracje API i ERP', text: 'Projektowanie i dokumentowanie REST API, podłączanie usług zewnętrznych oraz dwukierunkowa synchronizacja z ERP, WMS, księgowością, płatnościami i kurierami.', tags: ['REST', 'Webhooki', 'ERP', 'Node.js'] },
      { icon: 'i-lucide-shopping-bag', title: 'E-commerce', text: 'Sklepy na WooCommerce, PrestaShop i Shopify: własne moduły i motywy, migracje, integracje płatności i feedów oraz optymalizacja, która przekłada się na konwersję.', tags: ['WooCommerce', 'PrestaShop', 'Shopify', 'WordPress'], wide: true },
      { icon: 'i-lucide-server-cog', title: 'Serwery Linux i DevOps', text: 'Konfiguracja, zabezpieczenie i utrzymanie serwerów VPS i dedykowanych: Nginx, PHP-FPM, tuning MySQL, kopie zapasowe, monitoring, SSL, CI/CD i wdrożenia bez przestojów.', tags: ['Linux', 'Nginx', 'CI/CD', 'Backupy'], wide: true },
      { icon: 'i-lucide-life-buoy', title: 'Ratunek i utrzymanie', text: 'Przejmowanie starych lub porzuconych projektów: audyty, aktualizacje, łatki bezpieczeństwa, poprawki błędów i stała opieka w abonamencie.', tags: ['Audyty', 'Aktualizacje', 'SLA'] }
    ]
  },
  work: {
    eyebrow: 'Wybrane realizacje',
    title: 'Prawdziwe problemy,',
    accent: 'mierzalne efekty.',
    lead: 'Kilka ostatnich projektów. Nazwy klientów są objęte NDA, szczegóły chętnie opowiem podczas rozmowy.',
    labels: { challenge: 'Wyzwanie', solution: 'Co zrobiłem', result: 'Efekt' },
    items: [
      {
        sector: 'Hurtownia B2B · PrestaShop + ERP',
        title: 'Synchronizacja zamówień i stanów z ERP w czasie rzeczywistym',
        challenge: 'Zamówienia były ręcznie przepisywane do ERP, a stany magazynowe się rozjeżdżały, co kończyło się sprzedażą towaru, którego nie było.',
        solution: 'Dwukierunkowa integracja PrestaShop z API ERP oparta na kolejkach, z ponowieniami, logami i panelem administracyjnym.',
        result: 'Koniec z ręcznym wprowadzaniem zamówień, stany zgodne w ciągu kilku minut.',
        tags: ['PrestaShop', 'REST API', 'Kolejki Laravel']
      },
      {
        sector: 'SaaS · Laravel + Nuxt',
        title: 'Nowy panel klienta w miejsce starego monolitu PHP',
        challenge: 'Dziesięcioletnia aplikacja PHP, której nikt nie chciał dotykać, wolne strony i brak testów.',
        solution: 'Stopniowe przepisanie na Laravel API i front w Nuxt, moduł po module, pod tymi samymi adresami.',
        result: 'Strony ładują się poniżej sekundy, wdrożenia co tydzień zamiast co kwartał.',
        tags: ['Laravel', 'Nuxt', 'MySQL']
      },
      {
        sector: 'E-commerce · WooCommerce + Linux',
        title: 'Przeniesienie sklepu na zoptymalizowany VPS przed sezonem',
        challenge: 'Hosting współdzielony nie wytrzymywał kampanii, a checkout trwał kilka sekund.',
        solution: 'Migracja na zabezpieczony VPS z Nginx, PHP-FPM, Redis object cache, dostrojonym MySQL, backupami i monitoringiem.',
        result: 'Stabilna praca w szczycie sprzedaży i wyraźnie szybszy checkout.',
        tags: ['WooCommerce', 'Nginx', 'Redis']
      }
    ]
  },
  testimonials: {
    eyebrow: 'Opinie klientów',
    trustedBy: 'Zaufali mi m.in.'
  },
  partners: {
    eyebrow: 'Dla software house’ów i agencji',
    title: 'Doświadczony programista w zespole,',
    accent: 'bez procesu rekrutacji.',
    lead: 'Od lat współpracuję z agencjami i software house’ami jako kontraktor. Dostajesz kogoś, kto przeczyta brief, zada właściwe pytania i dostarczy kod zgodny z Twoimi standardami.',
    points: [
      { icon: 'i-lucide-users', title: 'Wzmocnienie zespołu', text: 'Doświadczony developer, który dołącza do Twojego sprintu, Jiry i Slacka i jest produktywny od pierwszego tygodnia.' },
      { icon: 'i-lucide-handshake', title: 'Realizacja white-label', text: 'Pracuję pod Twoją marką i pozostaję niewidoczny dla Twojego klienta. NDA w standardzie, Twoje umowy i procesy.' },
      { icon: 'i-lucide-git-branch', title: 'Twój workflow', text: 'Git flow, code review, pull requesty, pipeline’y CI i standardy kodowania. Dostosowuję się do Twoich.' },
      { icon: 'i-lucide-zap', title: 'Szczyty i deadline’y', text: 'Dodatkowe moce przerobowe, gdy projekt przyspiesza, albo specjalista od PHP, integracji czy serwerów, których nikt w zespole nie ogarnia.' }
    ],
    business: {
      eyebrow: 'Dla firm i founderów',
      title: 'Jak wygląda współpraca',
      items: [
        'Jasna oferta z zakresem, harmonogramem i stałą ceną lub wyceną',
        'Bezpośredni kontakt z inżynierem, który buduje Twój produkt',
        'Cotygodniowe podsumowania i środowisko testowe, które możesz przeklikać',
        'Pełny kod źródłowy i dokumentacja, wszystko należy do Ciebie',
        'Hosting i utrzymanie po starcie, jeśli tego potrzebujesz'
      ],
      cta: 'Opowiedz mi o projekcie'
    }
  },
  process: {
    eyebrow: 'Jak pracuję',
    title: 'Prosty proces,',
    accent: 'bez niespodzianek.',
    steps: [
      { title: 'Rozmowa wstępna', text: '30 minut, żeby zrozumieć cel, ograniczenia i obecne systemy. Bezpłatnie i bez zobowiązań.' },
      { title: 'Oferta', text: 'W ciągu kilku dni roboczych dostajesz zakres, architekturę, harmonogram oraz stałą cenę albo przejrzystą wycenę.' },
      { title: 'Realizacja', text: 'Krótkie iteracje, środowisko testowe od pierwszego tygodnia i postęp, który widać, a nie tylko raporty.' },
      { title: 'Start i opieka', text: 'Wdrożenie, monitoring i dokumentacja przekazania, potem opcjonalne utrzymanie i opieka nad serwerem.' }
    ],
    modelsTitle: 'Modele współpracy',
    from: 'od',
    vat: 'Ceny netto. Ostateczna wycena zależy od zakresu.',
    models: [
      { key: 'project', title: 'Projekt o stałym zakresie', text: 'Określone rezultaty, stała cena i harmonogram. Najlepsze dla nowych wdrożeń i dobrze opisanych funkcji.', icon: 'i-lucide-file-text' },
      { key: 'hourly', title: 'Time & materials', text: 'Stawka godzinowa lub dzienna, rozliczenie miesięczne. Najlepsze przy wzmacnianiu zespołu, rozwijanych produktach i pracy dla agencji.', icon: 'i-lucide-clock' },
      { key: 'retainer', title: 'Abonament miesięczny', text: 'Zarezerwowane godziny na utrzymanie, aktualizacje, administrację serwerem i priorytetowe wsparcie.', icon: 'i-lucide-refresh-cw' }
    ]
  },
  principles: {
    eyebrow: 'Zasady',
    title: 'Piętnaście lat uczy,',
    accent: 'co jest ważne.',
    lead: 'Widziałem, jak projekty udają się i upadają z tych samych kilku powodów. Na tych zasadach nie idę na kompromis.',
    items: [
      { icon: 'i-lucide-gauge', title: 'Wydajność to funkcja', text: 'Lekkie strony, zcache’owane zapytania, dostrojone serwery. Szybkość jest częścią specyfikacji.' },
      { icon: 'i-lucide-shield-check', title: 'Bezpieczeństwo domyślnie', text: 'Zabezpieczone serwery, kod zgodny z OWASP, sprawdzone kopie zapasowe, konfiguracja zgodna z RODO.' },
      { icon: 'i-lucide-book-open', title: 'Gotowe do przekazania', text: 'Czytelny kod, testy, README i instrukcje. Następny programista Ci podziękuje.' },
      { icon: 'i-lucide-message-square', title: 'Jasna komunikacja', text: 'Uczciwe wyceny, wczesne ostrzeżenia i odpowiedź w ciągu jednego dnia roboczego.' }
    ]
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Pytania,',
    accent: 'które często słyszę.',
    more: 'Masz inne pytanie?',
    ask: 'Napisz.',
    items: [
      { label: 'Czy pracujesz z klientami spoza Polski?', content: 'Tak. Większość komunikacji prowadzę po angielsku, zdalnie, w strefie CET, która dobrze pokrywa się z Wielką Brytanią, resztą Europy i wschodnim wybrzeżem USA. Faktury wystawiam w EUR, USD lub PLN.' },
      { label: 'Czy możesz dołączyć do naszego zespołu lub projektu?', content: 'Tak, to duża część mojej pracy. Mogę dołączyć jako kontraktor w Waszych narzędziach i procesach, przejąć konkretny obszar (back-end, integracje, serwery) albo zrealizować projekt white-label pod Waszą marką.' },
      { label: 'Czy podpisujesz NDA?', content: 'Oczywiście. Podpisuję NDA przed omówieniem szczegółów, a poufność jest standardem w każdej umowie.' },
      { label: 'Jak wyceniasz projekty?', content: 'Stała cena za jasno określony zakres albo rozliczenie godzinowe lub dzienne. Przy stałej współpracy proponuję abonament miesięczny. Zawsze dostajesz pisemną wycenę przed rozpoczęciem prac.' },
      { label: 'Czy przejmiesz istniejący lub stary projekt?', content: 'Tak. Zaczynam od krótkiego, płatnego audytu kodu i infrastruktury, potem proponuję plan: naprawa i stabilizacja, stopniowa modernizacja albo przepisanie tylko tam, gdzie to się opłaca.' },
      { label: 'Czy hostujesz i utrzymujesz to, co zbudujesz?', content: 'Jeśli chcesz, tak. Mogę skonfigurować i administrować dla Ciebie serwer VPS lub dedykowany albo pracować na Twoim obecnym hostingu. Utrzymanie obejmuje aktualizacje, kopie zapasowe, monitoring i łatki bezpieczeństwa.' },
      { label: 'Jak szybko możesz zacząć?', content: 'Zwykle w ciągu jednego do trzech tygodni, zależnie od bieżących zobowiązań. Pilne poprawki i awarie serwerów u stałych klientów obsługuję szybciej.' }
    ]
  },
  contact: {
    eyebrow: 'Kontakt',
    title: 'Zbudujmy',
    accent: 'coś solidnego.',
    lead: 'Opisz projekt, problem albo zespół, któremu potrzebna jest pomoc. Odpowiadam w ciągu jednego dnia roboczego, zwykle z kilkoma pytaniami i propozycją krótkiej rozmowy.',
    book: { title: 'Wolisz porozmawiać?', text: 'Umów bezpłatną 30-minutową rozmowę.', cta: 'Umów rozmowę' },
    channels: { email: 'E-mail', linkedin: 'LinkedIn', linkedinText: 'Dodaj mnie do kontaktów', based: 'Lokalizacja' },
    sent: { title: 'Dziękuję, wiadomość dotarła.', text: 'Odpowiem w ciągu jednego dnia roboczego. W pilnych sprawach napisz na' },
    mailto: { title: 'Jeszcze jeden krok: wyślij ją ze swojej poczty.', text: 'Powinna otworzyć się gotowa wiadomość e-mail. Jeśli nic się nie stało, napisz bezpośrednio na' },
    failed: 'Nie udało się wysłać wiadomości. Napisz bezpośrednio na',
    fields: {
      name: 'Imię i nazwisko', namePh: 'Jan Kowalski',
      email: 'E-mail', emailPh: 'jan@firma.pl',
      company: 'Firma', companyPh: 'Firma sp. z o.o.', optional: 'Opcjonalnie',
      clientType: 'Jestem…', select: 'Wybierz',
      projectType: 'Czego potrzebujesz?', projectPh: 'Wybierz usługę',
      budget: 'Budżet', timeline: 'Termin',
      message: 'Szczegóły projektu', messagePh: 'Co budujesz, jaki jest obecny stan i co będzie oznaczać sukces?',
      privacyA: 'Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie, zgodnie z',
      privacyLink: 'polityką prywatności'
    },
    options: {
      clientTypes: ['Firma / founder', 'Software house', 'Agencja', 'Inne'],
      projectTypes: ['Aplikacja webowa', 'Front-end / UI', 'Integracja API lub ERP', 'Sklep internetowy', 'Administracja serwerem / DevOps', 'Utrzymanie / przejęcie projektu', 'Wzmocnienie zespołu', 'Coś innego'],
      budgets: ['Poniżej 20 tys. zł', '20–60 tys. zł', '60–150 tys. zł', 'Powyżej 150 tys. zł', 'Godzinowo / stała współpraca', 'Jeszcze nie wiem'],
      timelines: ['Jak najszybciej', 'W ciągu miesiąca', '1–3 miesiące', 'Elastycznie']
    },
    errors: {
      name: 'Podaj imię i nazwisko',
      email: 'Podaj poprawny adres e-mail',
      projectType: 'Wybierz jedną z opcji',
      message: 'Napisz trochę więcej (min. 20 znaków)',
      privacy: 'Zgoda jest potrzebna, żebym mógł odpowiedzieć',
      captcha: 'Potwierdź, że nie jesteś robotem',
      captchaFailed: 'Weryfikacja nie powiodła się. Potwierdź ją jeszcze raz.',
      invalid: 'Serwer odrzucił część danych. Sprawdź formularz i spróbuj ponownie.',
      rateLimited: 'Zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za kilka minut albo napisz na'
    },
    trust: 'Twoje dane nie są nikomu przekazywane. NDA na życzenie.',
    submit: 'Wyślij wiadomość',
    sending: 'Wysyłanie…',
    mailSubject: 'Zapytanie o projekt'
  },
  footer: {
    about: 'Buduję i utrzymuję aplikacje webowe, integracje i infrastrukturę od 2010 roku.',
    site: 'Strona', elsewhere: 'W sieci', legal: 'Informacje prawne',
    links: { services: 'Usługi', partners: 'Software house’y', contact: 'Kontakt', privacy: 'Polityka prywatności', cookies: 'Polityka cookies', settings: 'Ustawienia cookies', email: 'E-mail' },
    rights: 'Wszelkie prawa zastrzeżone.'
  },
  cookies: {
    title: 'Twoja prywatność, Twój wybór',
    text: 'Używam opcjonalnych plików cookies do anonimowej analityki. Nic nie jest zapisywane bez Twojej zgody. Szczegóły w',
    policy: 'polityce cookies',
    customize: 'Dostosuj', reject: 'Odrzuć wszystkie', accept: 'Akceptuj wszystkie', save: 'Zapisz wybór',
    modalTitle: 'Ustawienia cookies',
    modalDesc: 'Wybierz, na które opcjonalne cookies się zgadzasz. Możesz to zmienić w każdej chwili w stopce.',
    categories: {
      necessary: { title: 'Niezbędne', desc: 'Potrzebne do działania strony i zapamiętania Twojego wyboru. Zawsze włączone.' },
      analytics: { title: 'Analityczne', desc: 'Anonimowe statystyki (Google Analytics 4), które pomagają mi zrozumieć, które treści są przydatne.' },
      marketing: { title: 'Marketingowe', desc: 'Pomiar kampanii reklamowych (Google Ads). Używane tylko, gdy kampanie są aktywne.' }
    }
  },
  legal: { back: 'Wróć na stronę główną', updated: 'Ostatnia aktualizacja', privacyTitle: 'Polityka prywatności', cookiesTitle: 'Polityka cookies', change: 'Zmień ustawienia cookies' },
  lang: { label: 'Język', switchTo: 'English', short: 'EN' },
  error: {
    notFound: 'Nie znaleziono strony',
    notFoundText: 'Strona, której szukasz, nie istnieje albo została przeniesiona.',
    generic: 'Coś poszło nie tak',
    genericText: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.',
    home: 'Wróć na stronę główną',
    contact: 'Napisz do mnie'
  }
}

export default pl
