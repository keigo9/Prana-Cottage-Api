# Prana Cottage API

## Local で起動する場合

```
npm run start
```

- 3000 番ポートからはアクセス可能

ex

```
const res = await fetch("http://localhost:4000/api/calendar/events")
const result = await res.json()
console.log(result)
```
