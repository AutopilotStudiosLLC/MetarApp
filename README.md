## Initial Installation

```
npm install -g ionic cordova
npm install
```

## Run local Ionic Server
```$xslt
ionic serve
```

## Run on iOS Device

Xcode 10 added a new build system that is currently 
incompatible with Cordova.

```$xslt
ionic cordova run ios -- --buildFlag="-UseModernBuildSystem=0" --device
```

## Build Resources for Android/iOS (Splash and Icon)
```$xslt
ionic cordova resources ios
```

## Update iOS Deploy
```
sudo npm install -g ios-deploy --unsafe-perm=true
```
