import {Hono} from 'hono'
import {Home} from "./home";
import countries from "./country.json";

const app = new Hono()

app.get('/', (c) => {
    return c.html(
        <Home request={c.req}/>
    )
})

app.get('/json', (c) => {
    let headerParams = [
        {name: "ip", value: "CF-Connecting-IP"},
        {name: "ipv6", value: "CF-Connecting-IPv6"},
        {name: "country_code", value: "CF-IPCountry"}
    ]
    let cfParams = [
        {name: "city", value: "city"},
        {name: "region", value: "region"},
        {name: "postal_code", value: "postalCode"},
        {name: "region_code", value: "regionCode"},
        {name: "timezone", value: "timezone"},
        {name: "longitude", value: "longitude"},
        {name: "latitude", value: "latitude"},
        {name: "http_protocol", value: "httpProtocol"},
        {name: "datacenter", value: "colo"},
        {name: "asn", value: "asn"},
        {name: "asn_organization", value: "asOrganization"}
    ]
    console.log(c.req.raw.cf);
    let result = {};
    headerParams.forEach((param) => {
        result[param.name] = c.req.header(param.value)
    })
    cfParams.forEach((param) => {
        result[param.name] = c.req.raw.cf[param.value]
    })
    result["country"] = countries.find((country) => country["alpha-2"] === c.req.header("CF-IPCountry"))?.name
    return c.json(result)
})

app.get('/ip', (c) => {
    return c.text(c.req.header("CF-Connecting-IP"))
})

app.get('/country', (c) => {
    return c.text(countries.find((country) => country["alpha-2"] === c.req.header("CF-IPCountry"))?.name)
})

app.get('/country-iso', (c) => {
    return c.text(c.req.header("CF-IPCountry"))
})

app.get('/city', (c) => {
    return c.text(c.req.raw.cf["city"])
})

app.get('/asn', (c) => {
    return c.text(c.req.raw.cf["asn"])
})

export default app
