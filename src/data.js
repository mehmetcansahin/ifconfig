import countries from "./country.json";

export const data = (request) => {
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
    let result = {};
    headerParams.forEach((param) => {
        result[param.name] = request.header(param.value)
    })
    cfParams.forEach((param) => {
        result[param.name] = request.raw.cf[param.value]
    })
    result["country"] = countries.find((country) => country["alpha-2"] === request.header("CF-IPCountry"))?.name
    return result;
}
