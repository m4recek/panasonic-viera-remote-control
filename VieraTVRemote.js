var VieraTVRemote = function() {
	this._options = {};
	this._options.ip = null;
	this._options.port = '55000';
	this._options.path = 'nrc/control_0';
};

VieraTVRemote.prototype.getOptions = function() {
	return this._options;
};

VieraTVRemote.prototype.setIp = function(ip) {
	if (ip) {
		this._options.ip = ip;
		return true;
	} else {
		console.error('VieraTVRemote->setIp()', 'Invalid ip parameter', ip);
		return false;
	}
};

VieraTVRemote.prototype.sendCommand = function(command) {
	if (VieraTVRemote.COMMANDS.indexOf(command) === -1) {
		console.error('VieraTVRemote->sendCommand()', 'Invalid command', command);
		return false;
	} else if (!this._options.ip) {
		console.error('VieraTVRemote->sendCommand()', 'Invalid ip', this._options.ip);
		return false;
	}

	var url = 'http://' + this._options.ip + ':' + this._options.port + '/' + this._options.path;
	var headers = {
		'Content-Type' : 'text/xml; charset="utf-8"',
		'SOAPACTION' : '"urn:panasonic-com:service:p00NetworkControl:1#X_SendKey"'
	};
	var data = `<?xml version="1.0" encoding="utf-8"?>
		<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
			<s:Body>
				<u:X_SendKey xmlns:u="urn:panasonic-com:service:p00NetworkControl:1">
					<X_KeyEvent>[command]</X_KeyEvent>
				</u:X_SendKey>
			</s:Body>
		</s:Envelope>
	`;
	data = data.replace('[command]', command);

	return this.execute(url, 'POST', headers, data);
};

VieraTVRemote.prototype.execute = function(url, method, headers, data) {
	console.error('VieraTVRemote->execute()', 'Unimplemented method, please provide implementation');
};

VieraTVRemote.COMMANDS = [
	'NRC_POWER-ONOFF',		// power off only (on tested TV)

	'NRC_MUTE-ONOFF',
	'NRC_AD_CHANGE-ONOFF',	// dvbt input change
	'NRC_CHG_INPUT-ONOFF',	// hdmi input change

	'NRC_VOLDOWN-ONOFF',	// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_VOLDOWN-ON',
	'NRC_VOLDOWN-OFF',
	'NRC_VOLUP-ONOFF',		// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_VOLUP-ON',
	'NRC_VOLUP-OFF',

	'NRC_CH_DOWN-ONOFF',
	'NRC_CH_UP-ONOFF',

	'NRC_APPS-ONOFF',
	'NRC_HOME-ONOFF',
	'NRC_CANCEL-ONOFF',		// exit button

	'NRC_RIGHT-ONOFF',		// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_RIGHT-ON',
	'NRC_RIGHT-OFF',

	'NRC_LEFT-ONOFF',		// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_LEFT-ON',
	'NRC_LEFT-OFF',

	'NRC_DOWN-ONOFF',		// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_DOWN-ON',
	'NRC_DOWN-OFF',

	'NRC_UP-ONOFF',			// separate ON and OFF commands exists, can be used instead repeating ONOFF
	'NRC_UP-ON',
	'NRC_UP-OFF',

	'NRC_ENTER-ONOFF',		// ok button
	'NRC_RETURN-ONOFF',
	'NRC_SUBMENU-ONOFF',	// options button

	'NRC_3D-ONOFF',
	'NRC_DISP_MODE-ONOFF',	// aspect button
	'NRC_MENU-ONOFF',
	'NRC_EPG-ONOFF',		// guide button
	'NRC_TEXT-ONOFF',
	'NRC_STTL-ONOFF',
	'NRC_INFO-ONOFF',
	'NRC_GUIDE-ONOFF',		// e-help button

	'NRC_D1-ONOFF',
	'NRC_D2-ONOFF',
	'NRC_D3-ONOFF',
	'NRC_D4-ONOFF',
	'NRC_D5-ONOFF',
	'NRC_D6-ONOFF',
	'NRC_D7-ONOFF',
	'NRC_D8-ONOFF',
	'NRC_D9-ONOFF',
	'NRC_D0-ONOFF',
	'NRC_R_TUNE-ONOFF',		// last view button

	'NRC_BLUE-ONOFF',		// quick commands and teletext controls (based on context)
	'NRC_YELLOW-ONOFF',
	'NRC_GREEN-ONOFF',
	'NRC_RED-ONOFF',

	'NRC_REW-ONOFF',
	'NRC_PLAY-ONOFF',
	'NRC_FF-ONOFF',
	'NRC_SKIP_PREV-ONOFF',
	'NRC_PAUSE-ONOFF',
	'NRC_SKIP_NEXT-ONOFF',
	'NRC_STOP-ONOFF',
	'NRC_REC-ONOFF'
];