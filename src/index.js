import {Hono} from 'hono'
import countries from './country.json' assert {type: 'json'};

const app = new Hono()
const Home = (params) => {
    const {request} = params
    console.log(params.request);
    let headerParams = [
        {name: "IP", value: "CF-Connecting-IP"},
        {name: "IPv6", value: "CF-Connecting-IPv6"},
        {name: "Country Code", value: "CF-IPCountry"}
    ]
    let cfParams = [
        {name: "City", value: "city"},
        {name: "Region", value: "region"},
        {name: "Postal Code", value: "postalCode"},
        {name: "Region Code", value: "regionCode"},
        {name: "Timezone", value: "timezone"},
        {name: "Longitude", value: "longitude"},
        {name: "Latitude", value: "latitude"},
        {name: "Http Protocol", value: "httpProtocol"},
        {name: "Datacenter", value: "colo"},
        {name: "ASN", value: "asn"},
        {name: "ASN Organization", value: "asOrganization"},

    ]

    return <div>
        {headerParams.map((item) => {
            return <p>{item.name}: {request.header(item.value)}</p>
        })}
        <p>Country: {countries.find((country) => country["alpha-2"] == request.header("CF-IPCountry"))?.name}</p>
        {cfParams.map((item) => {
            return <p>{item.name}: {request.raw.cf[item.value]}</p>
        })}
    </div>
}

app.get('/', (c) => {
    return c.html(
        <Home request={c.req}/>
    )
})

export default app
