import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { cors } from 'hono/cors';
import countries from "./country.json";
import { data } from "./data";
import { Home } from "./home";

const app = new Hono()

app.use(
    '/*',
    cors({
        origin: "*",
        allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
        allowMethods: ['GET', 'OPTIONS'],
        exposeHeaders: [],
        maxAge: 600,
        credentials: true,
    })
)

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

app.get('/', (c) => {
    let result = data(c.req)
    if (c.req.header("Content-Type") == "application/json" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.json(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/json', (c) => {
    let result = data(c.req)
    if (c.req.header("Content-Type") == "application/json" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.json(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/ip', (c) => {
    let result = c.req.header("CF-Connecting-IP")
    if (c.req.header("Content-Type") == "text/plain" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/country', (c) => {
    let result = countries.find((country) => country["alpha-2"] === c.req.header("CF-IPCountry"))?.name
    if (c.req.header("Content-Type") == "text/plain" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/country-iso', (c) => {
    let result = c.req.header("CF-IPCountry")
    if (c.req.header("Content-Type") == "text/plain" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/city', (c) => {
    let result = c.req.raw.cf["city"]
    if (c.req.header("Content-Type") == "text/plain" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

app.get('/asn', (c) => {
    let result = c.req.raw.cf["asn"]
    if (c.req.header("Content-Type") == "text/plain" || ["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result} />
        )
    }
})

export default app
