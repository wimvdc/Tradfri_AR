var config = {};

config.tradfri = {};
config.web = {};

config.tradfri.coapClientPath = process.env.COAP_CLIENT_PATH || '/usr/local/bin/coap-client';
config.tradfri.securityId=  process.env.SECURITY_ID || 'abc123';
config.tradfri.hubIpAddress=  process.env.HUB_IP_ADDRESS || '192.168.0.156';
config.web.port = process.env.PORT || 9400;

module.exports = config;
