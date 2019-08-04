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

## Theme Documenation
```
http://csform.com/documentation-for-ionic-3-ui-template-app-blue-light/#!
```

## Final Production Build
```
ionic cordova build android --prod --release
ionic cordova build ios --prod --release
```
