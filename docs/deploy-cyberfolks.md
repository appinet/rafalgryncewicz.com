# Wdrożenie na hosting cyber_Folks

Instrukcja dla hostingu współdzielonego cyber_Folks z panelem **DirectAdmin** (Apache / LiteSpeed, SSH, bez roota).
Strona (`web/`) to statyczne pliki, API (`api/`) to Laravel na PHP 8.3+.

> Panel **cyber_Admin** (nowszy panel cyber_Folks) ma inne menu i aliasy PHP (`php83` itd.), ale kroki są takie same.
> Ścieżki poniżej (`/home/LOGIN/domains/…`, `/opt/alt/php83/…`) to typowy układ DirectAdmin + CloudLinux:
> sprawdź je na swoim koncie poleceniami podanymi w krokach, zanim cokolwiek usuniesz.

Docelowo:

| Adres | Co | Katalog na serwerze |
|---|---|---|
| `https://rafalgryncewicz.com` | strona (statyczna) | `~/domains/rafalgryncewicz.com/public_html` |
| `https://api.rafalgryncewicz.com` | API (Laravel) | `~/domains/api.rafalgryncewicz.com/public_html` → symlink do `repo/api/public` |

---

## 1. Panel: domeny, PHP, SSL, SSH

1. **Domeny**: `rafalgryncewicz.com` jako domena główna konta. `api.rafalgryncewicz.com` dodaj jako **osobną domenę**
   (w DirectAdmin: *Zarządzanie domenami → Dodaj domenę*). Wtedy dostaje własny katalog
   `~/domains/api.rafalgryncewicz.com/public_html`, który w kroku 3 zamienisz na symlink do Laravela.
   (Subdomena też zadziała, jeśli panel pozwala zmienić jej katalog główny na `…/api/public`.)
2. **PHP**: dla `api.rafalgryncewicz.com` ustaw **PHP 8.3 lub 8.4** (*Wybór wersji PHP*). Laravel 13 nie ruszy na starszym.
   Potrzebne rozszerzenia (zwykle włączone): `pdo_sqlite` (lub `pdo_mysql`), `mbstring`, `openssl`, `curl`, `fileinfo`, `intl` (zalecane).
3. **SSL**: włącz Let's Encrypt dla obu domen (z `www` dla strony głównej).
4. **SSH**: włącz w panelu ([pomoc](https://cyberfolks.pl/pomoc/dostep-ssh-jak-wlaczyc-ssh/)). Logowanie:
   ```bash
   ssh LOGIN@rafalgryncewicz.com -p 222
   ```
   Hasło jak do panelu. Zalecane: [logowanie kluczem](https://cyberfolks.pl/pomoc/logowanie-ssh-z-uzyciem-klucza/).
5. **Poczta**: załóż skrzynkę nadawczą, np. `no-reply@rafalgryncewicz.com` (dane SMTP są w panelu poczty).
6. *(opcjonalnie)* **Baza MySQL**: tylko jeśli nie chcesz SQLite (domyślnie wystarczy SQLite, zero konfiguracji).

## 2. SSH: PHP i Composer

```bash
ls /opt/alt/ | grep php          # dostępne wersje, np. php83 php84
/opt/alt/php83/usr/bin/php -v    # musi pokazać 8.3+
```

W SSH polecenie `php` może wskazywać inną wersję niż ustawiona w panelu, dlatego dalej PHP jest wywoływane pełną ścieżką.
Ustaw zmienną na czas sesji (i dopisz do `~/.bashrc`):

```bash
export PHP=/opt/alt/php83/usr/bin/php
```

Composer: zainstaluj skryptem z [pomocy cyber_Folks](https://cyberfolks.pl/pomoc/instalacja-composera/) (trafia do `~/bin/composer`),
albo ręcznie:

```bash
mkdir -p ~/bin && cd ~/bin
$PHP -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
$PHP composer-setup.php --filename=composer && rm composer-setup.php
$PHP ~/bin/composer --version
```

## 3. API (Laravel)

### Instalacja

```bash
cd ~/domains/api.rafalgryncewicz.com
git clone https://github.com/appinet/rafalgryncewicz.com.git repo
cd repo/api

$PHP ~/bin/composer install --no-dev --optimize-autoloader
cp .env.example .env
nano .env                      # uzupełnij wg sekcji „.env produkcyjny” poniżej
$PHP artisan key:generate
touch database/database.sqlite
$PHP artisan migrate --force
$PHP artisan config:cache
$PHP artisan route:cache
```

> Repozytorium jest publiczne, więc `git clone` po HTTPS działa bez logowania. Jeśli zrobisz je prywatnym,
> wygeneruj na serwerze klucz (`ssh-keygen -t ed25519`) i dodaj go w GitHub jako *Deploy key* (tylko odczyt),
> a klonuj przez `git@github.com:appinet/rafalgryncewicz.com.git`.
> Bez gita: wgraj katalog `api/` przez FTP razem z `vendor/` zbudowanym lokalnie (`composer install --no-dev -o`).

### Katalog publiczny = `api/public`

Tylko `api/public` może być widoczny z sieci (`.env`, `vendor/`, baza SQLite muszą zostać poza nim).
Zamień `public_html` domeny API na symlink (pełna ścieżka, nie względna):

```bash
cd ~/domains/api.rafalgryncewicz.com
ls public_html                 # domyślna strona z panelu – nic ważnego
mv public_html public_html.bak
ln -s ~/domains/api.rafalgryncewicz.com/repo/api/public public_html
ls -l public_html              # → …/repo/api/public
```

Plik `api/public/.htaccess` (standardowy z Laravela) obsługuje przekierowania do `index.php`.

### `.env` produkcyjny

```dotenv
APP_NAME="rafalgryncewicz.com API"
APP_ENV=production
APP_KEY=                        # ustawia `artisan key:generate`
APP_DEBUG=false
APP_URL=https://api.rafalgryncewicz.com

LOG_CHANNEL=stack
LOG_STACK=daily
LOG_LEVEL=warning

DB_CONNECTION=sqlite            # plik database/database.sqlite
# MySQL zamiast SQLite: DB_CONNECTION=mysql, DB_HOST=localhost, DB_DATABASE=…, DB_USERNAME=…, DB_PASSWORD=…

SESSION_DRIVER=database
CACHE_STORE=database            # rate limiting formularza
QUEUE_CONNECTION=sync           # maile wychodzą od razu, bez workera

MAIL_MAILER=smtp
MAIL_SCHEME=smtps
MAIL_HOST=                      # serwer SMTP z panelu poczty cyber_Folks
MAIL_PORT=465
MAIL_USERNAME=no-reply@rafalgryncewicz.com
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=no-reply@rafalgryncewicz.com
MAIL_FROM_NAME="rafalgryncewicz.com"
MAIL_TIMEOUT=10                 # sekundy; po tym czasie formularz i tak zapisze zapytanie

CONTACT_RECIPIENT=hello@rafalgryncewicz.com   # dokąd idą zapytania (wymagane)
CONTACT_RATE_PER_MINUTE=3
CONTACT_RATE_PER_DAY=20
CONTACT_RETENTION_MONTHS=36
CONTACT_IP_RETENTION_DAYS=30
CORS_ALLOWED_ORIGINS=https://rafalgryncewicz.com
TURNSTILE_SECRET_KEY=           # sekret z Cloudflare Turnstile (pusty = bez captchy)
TRUSTED_PROXIES=                # puste; ustaw tylko, jeśli domena idzie przez Cloudflare (pomarańczowa chmurka)
```

Po każdej zmianie `.env`: `$PHP artisan config:cache`.

### Cron (ponowna wysyłka maili, retencja RODO)

W panelu *Zadania Cron* dodaj zadanie **co 5 minut** (`*/5 * * * *`; wystarczy dowolny interwał, który trafia w pełną godzinę):

```bash
/opt/alt/php83/usr/bin/php /home/LOGIN/domains/api.rafalgryncewicz.com/repo/api/artisan schedule:run >> /dev/null 2>&1
```

`LOGIN` = Twój login (`echo $HOME` w SSH pokaże pełną ścieżkę). Co 15 minut uruchamia `leads:renotify` (ponawia maile, których nie udało się wysłać, z ostatnich 7 dni), raz dziennie `leads:anonymize` i `model:prune`.
Sprawdzenie: `$PHP artisan schedule:list`.

### Test API

```bash
curl -s https://api.rafalgryncewicz.com/up                 # 200, strona „Application up”
curl -s -X POST https://api.rafalgryncewicz.com/api/contact \
  -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{}'
# → 422 z listą błędów walidacji = API działa (nic nie zapisuje)
curl -sI https://api.rafalgryncewicz.com/.env | head -1    # musi być 403/404, nigdy 200
```

## 4. Strona (statyczna)

Budujesz lokalnie (na hostingu nie ma Node.js) i wgrywasz gotowe pliki.

### Build

```bash
cd web
cp .env.example .env          # pierwszy raz; uzupełnij klucze (Turnstile, analityka)
npm ci
npm run generate
```

`npm run generate` tworzy `web/.output/public` razem z plikami **`.htaccess`**
(`.htaccess` i `_nuxt/.htaccess`): adresy bez ukośnika na końcu, strona 404, przekierowania `www`/HTTP→HTTPS,
nagłówki bezpieczeństwa, cache i CSP (Report-Only) z hashami **tego** builda.
Dlatego po każdym buildzie wgrywasz całość, łącznie z `.htaccess`.

### Wgranie przez SSH (zalecane)

```bash
cd web/.output/public
tar -czf ../site.tgz .
scp -P 222 ../site.tgz LOGIN@rafalgryncewicz.com:~/
ssh -p 222 LOGIN@rafalgryncewicz.com \
  'cd ~/domains/rafalgryncewicz.com/public_html && tar -xzf ~/site.tgz && rm ~/site.tgz'
```

Stare pliki z `_nuxt/` mogą zostać (mają unikalne nazwy, nie przeszkadzają, a otwarte karty odwiedzających dalej działają).
Przy pierwszym wgraniu usuń domyślny `index.html`/`index.php` z panelu, jeśli tam był.

### Wgranie przez FTP

Wgraj **zawartość** `web/.output/public` do `public_html`. W FileZilli włącz
*Serwer → Wymuś pokazywanie ukrytych plików*, inaczej `.htaccess` się nie wyśle.

### Test strony

```bash
curl -sI https://rafalgryncewicz.com/privacy | head -1       # 200 (nie 301)
curl -sI https://rafalgryncewicz.com/privacy/ | grep -i location   # → /privacy
curl -sI http://www.rafalgryncewicz.com/ | grep -i location        # → https://rafalgryncewicz.com/
curl -sI https://rafalgryncewicz.com/nie-ma | head -1          # 404
curl -sI https://rafalgryncewicz.com/ | grep -iE 'content-security|strict-transport|x-frame'
curl -sI https://rafalgryncewicz.com/.htaccess | head -1       # 403
```

Na koniec wyślij testowe zapytanie z formularza i sprawdź, czy mail dotarł na `CONTACT_RECIPIENT`.

## 5. Aktualizacje

**API** (po zmianach w `api/`):

```bash
cd ~/domains/api.rafalgryncewicz.com/repo/api
git pull
$PHP ~/bin/composer install --no-dev --optimize-autoloader
$PHP artisan migrate --force
$PHP artisan config:cache && $PHP artisan route:cache
```

**Strona**: `npm run generate` lokalnie i wgranie jak w kroku 4.

## 6. CSP: raporty i przejście na wymuszanie

Raporty naruszeń trafiają do API: `~/domains/api.rafalgryncewicz.com/repo/api/storage/logs/csp-*.log`.

```bash
tail -n 50 ~/domains/api.rafalgryncewicz.com/repo/api/storage/logs/csp-$(date +%F).log
```

Gdy przez kilka tygodni nie ma tam niczego niepokojącego, zbuduj stronę z `CSP_ENFORCE=1` w `web/.env` i wgraj ponownie.

## Problemy

| Objaw | Przyczyna / rozwiązanie |
|---|---|
| API: błąd 500, w `storage/logs/laravel-*.log` „Class not found” / „vendor” | brak `composer install` albo uruchomiony starym PHP: użyj `$PHP ~/bin/composer …` |
| API: „Your PHP version … ≥ 8.3” | w panelu ustaw PHP 8.3+ dla domeny API |
| API: biała strona z listą plików albo pobiera się `.env` | `public_html` nie wskazuje na `repo/api/public` (krok 3) |
| Formularz: „The message could not be sent”, w konsoli przeglądarki błąd CORS | `CORS_ALLOWED_ORIGINS` w `api/.env` musi zawierać `https://rafalgryncewicz.com`, potem `config:cache` |
| Zapytania się zapisują, ale mail nie przychodzi | `$PHP artisan leads:renotify` wyśle zaległe od razu; `$PHP artisan tinker` → `Mail::raw('test', fn($m) => $m->to('…'))` pokaże błąd SMTP; sprawdź `MAIL_*` i `CONTACT_RECIPIENT` |
| Strona: `/privacy` przekierowuje na `/privacy/` | nie wgrał się `.htaccess` (ukryty plik w FTP) |
| Wszyscy dostają „Too many requests” | API za proxy/Cloudflare bez `TRUSTED_PROXIES` (wszystkie żądania mają ten sam IP) |
