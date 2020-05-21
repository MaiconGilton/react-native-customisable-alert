/**
 * Non-public global class to handle the "default" Alert instance to global use
 */
class CustomisableAlertManager {
  _defaultAlert = null;
  register(_ref) {
    this._defaultAlert = _ref;
  }
  unregister(_ref) {
    this._defaultAlert = null;
  }
  getDefault() {
    return this._defaultAlert;
  }
}

export default new CustomisableAlertManager();
