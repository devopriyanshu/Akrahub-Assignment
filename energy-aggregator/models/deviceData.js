export default class DeviceData {
  constructor(sn, power, status, lastUpdated) {
    this.sn = sn;
    this.power = power;
    this.status = status;
    this.last_updated = lastUpdated;
  }
}
