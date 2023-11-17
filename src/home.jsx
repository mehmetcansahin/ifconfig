import countries from "./country.json";

export const Home = (params) => {
    const {request} = params

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
        {name: "ASN Organization", value: "asOrganization"}
    ]

    const html = {
        fontFamily: "'Raleway', sans-serif",
    }
    const container = {
        display: "flex",
        justifyContent: "center"
    }
    const table = {
        borderCollapse: "collapse",
        borderRadius: "10px",
    }
    const th = {
        color: "#fff",
        backgroundColor: "#333",
        padding: "10px",
    }
    const td = {
        padding: "10px",
        backgroundColor: "#eee"
    }

    return (<html lang="en" style={html}>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <link rel="preconnect" href="https://fonts.bunny.net"/>
            <link href="https://fonts.bunny.net/css?family=raleway:500" rel="stylesheet"/>
            <title>ifconfig</title>
        </head>
        <body>
        <div style={container}>
            <table style={table}>
                {headerParams.map((item) => {
                    return <>
                        <tr>
                            <th style={th}>{item.name}</th>
                            <td style={td}>{request.header(item.value)}</td>
                        </tr>
                    </>
                })}
                <tr>
                    <th style={th}>Country</th>
                    <td style={td}>{countries.find((country) => country["alpha-2"] === request.header("CF-IPCountry"))?.name}</td>
                </tr>
                {cfParams.map((item) => {
                    return <>
                        <tr>
                            <th style={th}>{item.name}</th>
                            <td style={td}>{request.raw.cf[item.value]}</td>
                        </tr>
                    </>
                })}
            </table>
        </div>
        </body>
        </html>
    )
}
