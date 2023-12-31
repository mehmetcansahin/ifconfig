import labels from "./labels.json";
import {data} from "./data";

export const Home = (params) => {
    const {request, result} = params
    const pathName = new URL(request.url).pathname
    const dataList = data(request)

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
        fontFamily: "'Open Sans', sans-serif",
    }
    const container = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem"
    }
    const table = {
        borderCollapse: "collapse",
        border: "1px solid black",
    }
    const th = {
        padding: "5px",
        border: "1px solid black",
    }
    const td = {
        padding: "5px",
        border: "1px solid black",
    }
    const aButton = {
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        margin: "0 2px"
    }
    const footerButton = {

        color: "#333",
    }
    const resultView = {
        minHeight: "4em",
        whiteSpace: "pre",
        overflowX: "scroll",
        maxWidth: "550px",
        padding: "0.5rem",
        border: "1px solid grey",
        marginTop: "0.5rem",
        boxSizing: "border-box"
    }
    const mapStyle = {
        marginTop: "2rem",
        width: "810px",
        height: "300px"
    }

    const initMap = `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" ></script>
        <script>
            var getMap = document.getElementById('map');
            var lat = getMap.getAttribute("lat");
            var lon = getMap.getAttribute("lon");
            var map = L.map('map').setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(map);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
        </script>`

    return (<html lang="en" style={html}>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <link rel="profile" href="https://gmpg.org/xfn/11"/>
            <link rel="canonical" href="https://ifconfig.mehmetcansahin.com/"/>
            <meta name="description"
                  content="Find out what your public IPv4 and IPv6 address is revealing about you! My IP address information shows your IP location; city, region, country, ISP and location on a map."/>
            <meta property="og:locale" content="en"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="What Is My IP Address? IP Address Tools and More"/>
            <meta property="og:description"
                  content="IP address lookup, location, proxy detection, email tracing, IP hiding tips, blacklist check, speed test, and forums. Find, get, and show my IP address."/>
            <meta property="og:url" content="https://ifconfig.mehmetcansahin.com/"/>
            <meta property="og:site_name" content="WhatIsMyIPAddress"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:description"
                  content="IP address lookup, location, proxy detection, email tracing, IP hiding tips, blacklist check, speed test, and forums. Find, get, and show my IP address."/>
            <meta name="twitter:title" content="What Is My IP Address? IP Address Tools and More"/>
            <meta name="twitter:image"
                  content="https://ifconfig.mehmetcansahin.com/static/img/cover.png"/>
            <link rel="preconnect" href="https://fonts.bunny.net"/>
            <link href="https://fonts.bunny.net/css?family=open-sans:500" rel="stylesheet"/>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
            <title>What is my IP Address - ifconfig</title>
        </head>
        <body>
        <div style={container}>
            <h1>What is my IP Address ?</h1>
        </div>
        <div style={container}>
            <table style={table}>
                {Object.entries(dataList).map((item) => {
                    return <>
                        <tr>
                            <th style={th}>{labels[item[0]]}</th>
                            <td style={td}>{item[1]}</td>
                        </tr>
                    </>
                })}
            </table>
            <div>
                <b>Command line interface examples</b>
                <p>You can try curl examples using the buttons below.</p>
                <div>
                    <a href={"/ip"} style={aButton}>ip</a>
                    <a href={"/country"} style={aButton}>country</a>
                    <a href={"/country-iso"} style={aButton}>country-iso</a>
                    <a href={"/city"} style={aButton}>city</a>
                    <a href={"/asn"} style={aButton}>asn</a>
                    <a href={"/json"} style={aButton}>json</a>
                </div>
                <div style={resultView}>
                    curl https://ifconfig.mehmetcansahin.com{pathName === "/" ? "/json" : pathName}
                </div>
                <div style={resultView}>
                    {typeof result == "object" ? JSON.stringify(result, null, 2) : result}
                </div>
            </div>
        </div>
        <div style={container}>
            <div id="map" style={mapStyle} lat={dataList.latitude} lon={dataList.longitude}></div>
        </div>
        <div style={container}>
            <div>
                Source code is available on &nbsp;
                <a href="https://github.com/mehmetcansahin/ifconfig" style={footerButton}>Github</a>
            </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: initMap}}/>
        </body>
        </html>
    )
}
