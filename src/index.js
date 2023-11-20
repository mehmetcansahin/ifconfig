import {Hono} from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import {Home} from "./home";
import {data} from "./data";
import countries from "./country.json";

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

app.get('/', (c) => {
    let result = data(c.req)
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.json(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/json', (c) => {
    let result = data(c.req)
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.json(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/ip', (c) => {
    let result = c.req.header("CF-Connecting-IP")
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/country', (c) => {
    let result = countries.find((country) => country["alpha-2"] === c.req.header("CF-IPCountry"))?.name
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/country-iso', (c) => {
    let result = c.req.header("CF-IPCountry")
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/city', (c) => {
    let result = c.req.raw.cf["city"]
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

app.get('/asn', (c) => {
    let result = c.req.raw.cf["asn"]
    if (["curl", "HTTPie", "httpie-go", "Wget", "fetch libfetch", "Go", "Go-http-client", "ddclient", "Mikrotik", "xh"].some(v => c.req.header("User-Agent").includes(v))) {
        return c.text(result)
    } else {
        return c.html(
            <Home request={c.req} result={result}/>
        )
    }
})

export default app
