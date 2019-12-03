## Initial Installation

```
npm install -g ionic cordova@8
npm install
```

## Run local Ionic Server
```
ionic serve
```

## Run on iOS Device

Xcode 10 added a new build system that is currently 
incompatible with Cordova.

```
npm install -g ios-deploy
ionic cordova run ios -- --buildFlag="-UseModernBuildSystem=0" --device
```

### xcode-select Fix

Fix for error `xcode-select: error: tool 'xcodebuild' requires Xcode`

```
sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer
```

## Build Resources for Android/iOS (Splash and Icon)
```$xslt
ionic cordova resources ios
```

## Update iOS Deploy
```
sudo npm install -g ios-deploy --unsafe-perm=true
```

## Theme Documentation
```
http://csform.com/documentation-for-ionic-3-ui-template-app-blue-light/#!
```

## Final Production Build
```
ionic cordova build android --prod --release
ionic cordova build ios --prod --release
```

## Sign the APK
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk autopilot-studios
```
#### Optimize the Package
```
~/Library/Android/sdk/build-tools/VERSION/zipalign -v 4 app-release-unsigned.apk AviationWeather.apk
~/Library/Android/sdk/build-tools/VERSION/apksigner verify AviationWeather.apk
```

### Troubleshooting

## Java Location Mac OSX
```
/usr/libexec/java_home -v 1.8
```

## Set JAVA_HOME OSX
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
```
