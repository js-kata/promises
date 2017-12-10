# JS Kata - Promises

## Jak odpalić testy

### Jeśli masz Node.js 7+

Jeśli odpalasz je po raz pierwszy, zainstaluj zależności:

```
npm install
```

Następnie, aby puścić testy:

```
npm test
````

Jeśli wszystko poszło dobrze, powinieneś zobaczyć w konsoli, że wszystkie testy kończą się niepowodzeniem.

Aby puścić pojedynczy test, możesz wykonać:

```
npm test -- problem1
```

### Jeśli masz Dockera (i `docker-compose`)

Wystartuj kontener za pomocą `docker-compose`:

```
docker-compose up -d
```

Następnie możesz wejść do kontenera za pomocą komendy:

```
docker-compose exec node sh
```

Teraz po wpisaniu komendy `ls` powinieneś zobaczyć pliki, które znajdują się w repo - np. folder `node_modules`.

Od teraz możesz posługiwać się konsolą tak, jakbyś miał zainstalowanego Node.js (patrz wyżej).

Po zakończeniu pracy puść następującą komendę, aby wyłączyć kontener:

```
docker-compose down
```
