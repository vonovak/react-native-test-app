// @ts-check
/** @type {import("webdriverio").RemoteOptions} */
module.exports = {
  port: 4723,
  capabilities: (() => {
    const args = process.env["TEST_ARGS"]?.toLowerCase() ?? "";
    const [targetPlatform, ...flags] = args.split(" ");

    const features = {
      "react:hermes": flags.includes("hermes"),
      "react:fabric": flags.includes("fabric"),
      "react:concurrent": flags.includes("concurrent"),
    };

    switch (targetPlatform) {
      case "android":
        return {
          platformName: "Android",
          "appium:app": "./android/app/build/outputs/apk/debug/app-debug.apk",
          "appium:deviceName": "Android GoogleAPI Emulator",
          "appium:platformVersion": "13.0",
          "appium:automationName": "UiAutomator2",
          ...features,
        };
      case "ios":
        return {
          platformName: "iOS",
          "appium:app": "com.microsoft.ReactTestApp",
          "appium:deviceName": "iPhone 14",
          "appium:platformVersion": "16.4",
          "appium:automationName": "XCUITest",
          ...features,
        };
      default:
        throw new Error(`Unknown platform: ${targetPlatform}`);
    }
  })(),
  logLevel: "info",
  waitforTimeout: 60000,
};