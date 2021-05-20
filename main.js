"use strict";

/*
 * Created with @iobroker/create-adapter v1.34.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
let request = require('request');
const axios = require('axios');
const fetch = require("node-fetch");
let obj = '';
let C ;
let CO ;

// Load your modules here, e.g.:
// const fs = require("fs");

class EmsEspGwV2 extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "ems-esp-gw-v2",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		// Initialize your adapter here

		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:
		this.log.info("config option1: " + this.config.option1);
		this.log.info("config option2: " + this.config.option2);
		this.log.info("config option3: " + this.config.option3);
		this.log.info("config option4: " + this.config.option4);
		this.log.info("config option5: " + this.config.option5);
		this.log.info('config input1: ' + this.config.input1);
		this.log.info('config input2: ' + this.config.input2);
		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/
		
		var configIPAdr = this.config.input1;
		var configIPPort = this.config.input2;
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
 
		var t = h + ":" + m + ":" + s;

		this.log.info(today);
		this.log.info(t);

		this.log.debug(configIPAdr);
		this.log.debug(configIPPort);

		var options = {
			url: "http://" + configIPAdr + "/api?device=dallassensor&cmd=info",
			json: true
		};
		
		this.log.info(options.url);
		this.log.info(options.json);


		await this.setObjectNotExistsAsync("Konfiguration.Option 1", {
			type: "state",
			common: {
				name: "Konfiguration.Option 1",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Option 2", {
			type: "state",
			common: {
				name: "Konfiguration.Option 2",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Option 3", {
			type: "state",
			common: {
				name: "Konfiguration.Option 3",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Option 4", {
			type: "state",
			common: {
				name: "Konfiguration.Option 4",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Option 5", {
			type: "state",
			common: {
				name: "Konfiguration.Option 5",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Input 1", {
			type: "state",
			common: {
				name: "Konfiguration.Input 1",
				type: "value",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.Input 2", {
			type: "state",
			common: {
				name: "Konfiguration.Input 2",
				type: "value",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.TimeStampLong", {
			type: "state",
			common: {
				name: "Konfiguration.TimeStampLong",
				type: "value",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setObjectNotExistsAsync("Konfiguration.TimeStampShort", {
			type: "state",
			common: {
				name: "Konfiguration.TimeStampShort",
				type: "value",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		await this.setStateAsync("Konfiguration.Option 1", this.config.option1);
		await this.setStateAsync("Konfiguration.Option 2", this.config.option2);
		await this.setStateAsync("Konfiguration.Option 3", this.config.option3);
		await this.setStateAsync("Konfiguration.Option 4", this.config.option4);
		await this.setStateAsync("Konfiguration.Option 5", this.config.option5);
		await this.setStateAsync("Konfiguration.Input 1", this.config.input1);
		await this.setStateAsync("Konfiguration.Input 2", this.config.input2);
		await this.setStateAsync("Konfiguration.TimeStampLong", today);
		await this.setStateAsync("Konfiguration.TimeStampShort", t);

		if (this.config.option2 == true)
		{
			this.log.info('get Dallas Sensor');
			const link = 'http://' + configIPAdr + '/api?device=boiler&cmd=info&cmd=info';			
			this.log.info(link);

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=boiler&cmd=info',
				responseType: 'json'
			})
			.then(
				async (response) => {
					const content = response.data;
	
					this.log.info('request done');
					this.log.info(JSON.stringify(content));
					//this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					this.log.info('Typeof : ' + typeof content);

					let A;
					for (A in content)
					{
						this.log.info(A +" : " + content[A]);				

					await this.setObjectNotExistsAsync("Boiler.Info." + A, {
						type: "state",
						common: {
							name: "Boiler.Info." + A,
							type: "value",
							role: "indicator",
							read: true,
							write: true,
						},
						native: {},
					});
				
					await this.setStateAsync("Boiler.Info." + A, content[A]);
					setTimeout(() => {this.log.info("Wait"); }, 200);
				}

					/*
					await this.setObjectNotExistsAsync("DallasSensor.Sensor1.Temp", {
						type: "state",
						common: {
							name: "DallasSensor.Sensor1.Temp",
							type: "value",
							role: "indicator",
							read: true,
							write: true,
						},
						native: {},
					});
					
					this.log.info(content.sensor1.id);
					this.log.info(content.sensor1.temp);
					
					await this.setStateAsync("DallasSensor.Sensor1.ID", content.sensor1.id);
					await this.setStateAsync("DallasSensor.Sensor1.Temp", content.sensor1.temp);
*/
				}			
				)
				.catch(
					(error) => {
						if (error.response) {
							// The request was made and the server responded with a status code
	
							this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js<div></div>
							this.log.error(error.message);
						} else {
							// Something happened in setting up the request that triggered an Error
							this.log.error(error.message);
						}
					}		

				);		
				}

		if (this.config.option5 == true)
		{
			this.log.info('get Dallas Sensor');
			const link = 'http://' + configIPAdr + '/api?device=dallassensor&cmd=info';			
			this.log.info(link);

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=dallassensor&cmd=info',
				responseType: 'json'
			})
			.then(
				async (response) => {
					const content = response.data;
	
					this.log.info('request done');
					this.log.info(JSON.stringify(content));
					//this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					this.log.info('Typeof : ' + typeof content);
										
					this.log.info(content.sensor1.id);
					this.log.info(content.sensor1.temp);

					await this.setObjectNotExistsAsync("DallasSensor.Sensor1.ID", {
						type: "state",
						common: {
							name: "DallasSensor.Sensor1.ID",
							type: "value",
							role: "indicator",
							read: true,
							write: true,
						},
						native: {},
					});

					await this.setObjectNotExistsAsync("DallasSensor.Sensor1.Temp", {
						type: "state",
						common: {
							name: "DallasSensor.Sensor1.Temp",
							type: "value",
							role: "indicator",
							read: true,
							write: true,
						},
						native: {},
					});
					
					this.log.info(content.sensor1.id);
					this.log.info(content.sensor1.temp);
					
					await this.setStateAsync("DallasSensor.Sensor1.ID", content.sensor1.id);
					await this.setStateAsync("DallasSensor.Sensor1.Temp", content.sensor1.temp);

				}			
				)
				.catch(
					(error) => {
						if (error.response) {
							// The request was made and the server responded with a status code
	
							this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js<div></div>
							this.log.error(error.message);
						} else {
							// Something happened in setting up the request that triggered an Error
							this.log.error(error.message);
						}
					}		

				);		
				}

				

				
		//this.log.debug("StatusCode = "+ R.statusCode);
		//this.log.debug(B);

		// In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
		
		//this.subscribeStates(this.config.option1);
		//this.subscribeStates(this.config.option2);

		// You can also add a subscription for multiple states. The following line watches all states starting with "lights."
		// this.subscribeStates("lights.*");
		// Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
		
		this.subscribeStates("*");

		/*
			setState examples
			you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
		// the variable testVariable is set to true as command (ack=false)
		//await this.setStateAsync("testVariable", true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system
		//await this.setStateAsync("testVariable", { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)
		//await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// examples for the checkPassword/checkGroup functions
//		let result = await this.checkPasswordAsync("admin", "iobroker");
//		this.log.info("check user admin pw iobroker: " + result);

//		result = await this.checkGroupAsync("admin", "admin");
//		this.log.info("check group user admin group admin: " + result);

	//set setTimeout(function() {	this.stop();}, 10000)

	this.stop();

	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (e) {
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.messagebox" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }


}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new EmsEspGwV2(options);
} else {
	// otherwise start the instance directly
	new EmsEspGwV2();
}