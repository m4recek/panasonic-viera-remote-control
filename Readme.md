Panasonic Viera remote control
======
This is network remote control for Panasonic Viera TV. It mirrors remote control functionality of *Panasonic TV
Remote 2* app for iOS (version: 2.30).

It was tested on model TX-L42E6E from 2014, but should support any model using standard remote control.

## Usage

- You will need IP address of your TV.
- For list of available commands see `VieraTVRemote.COMMANDS` array in `VieraTVRemote.js` file.
- Check for errors in your console
- Simple example implementation is in `index.html` file.

## Demo
- You will need to run chrome with ``chrome --disable-web-security`` command see
[this link](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome)
- Demo is [available here](http://m4recek.github.io/panasonic-viera-remote-control/)


## Example implementation
```
var tvRemote = new VieraTVRemote();
var ipAddress = '192.168.1.150'  // replace with ip address of your TV
tvRemote.setIp(ipAddress);

/*
 * Provide execute function which will send request from your environment
 * - you can use request library for node.js, or jquery for web application
 */
tvRemote.execute = function(requestUrl, requestMethod, requestHeaders, requestData) {
  // send post request with specified parameters, don't forget to include requestHeaders

  // example jquery implementation
  $.ajax(
    requestUrl,
    {
      method: requestMethod,
      headers: requestHeaders,
      data: requestData,
    }
  );
};
```



