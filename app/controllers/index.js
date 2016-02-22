function doClick(e) {
	alert($.label.text);
}

var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);

TiBeacons.enableAutoRanging();

function enterRegion(e) {
	alert(e);
}

function exitRegion(e) {
	alert(e);
}

function updateRanges(e) {
	Ti.API.info(e);
}

function handleProximity(e) {
	Ti.API.info(e);

	console.log("proximity: " + e.proximity);
}

function regionStateUpdated(e) {
	var stateStr;

	switch(e.state) {
	case Beacons.REGION_STATE_UNKNOWN:
		stateStr = 'unknown';
		break;
	case Beacons.REGION_STATE_INSIDE:
		stateStr = 'inside.';
		break;
	case Beacons.REGION_STATE_OUTSIDE:
		stateStr = 'outside.';
		break;
	}
	alert(stateStr);
}

function addListeners() {

	TiBeacons.addEventListener("enteredRegion", enterRegion);
	TiBeacons.addEventListener("exitedRegion", exitRegion);

	TiBeacons.addEventListener("beaconRanges", updateRanges);
	TiBeacons.addEventListener("beaconProximity", handleProximity);
	
	TiBeacons.addEventListener("regionStateUpdated", regionStateUpdated);

}

function removeListeners() {

	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);

	TiBeacons.removeEventListener("beaconRanges", updateRanges);
	TiBeacons.removeEventListener("beaconProximity", handleProximity);
}

function pauseApp() {
	TiBeacons.stopMonitoringAllRegions();
	TiBeacons.stopRangingForAllBeacons();

	removeListeners();
}

function appResumed(e) {
	addListeners();
}

Ti.App.addEventListener("pause", pauseApp);
Ti.App.addEventListener("resumed", appResumed);

addListeners();

function toggleMonitoring(monitor) {

	if (monitor) {
		TiBeacons.startMonitoringForRegion({
			uuid : "00000000-0000-0000-0000-000000000000",
			identifier : "Test Region 1"
		});
		TiBeacons.startMonitoringForRegion({
			uuid : "00000000-0000-0000-0000-000000000001",
			major : 1,
			identifier : "Test Region 2"
		});
		TiBeacons.startMonitoringForRegion({
			uuid : "E3EFA72E-B6EC-4B0D-B3F9-9A2ABCEAC57F",
			major : 12134,
			minor : 45467,
			identifier : "blueberry"
		});

		TiBeacons.startMonitoringForRegion({
			uuid : "D15EA1FF-9096-4D90-BFE5-0C5FD4ACD23A",
			major : 7784,
			minor : 50141,
			identifier : "Test Beacon 3"
		});

	} else {
		TiBeacons.stopMonitoringAllRegions();
	}
}

toggleMonitoring(true);
$.index.open();
