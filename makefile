.PHONY: run

# certs and output
OUTPUT_FILE=rsa.apk
ALIAS=sobral
KEYPASS=090thEEnd
# KEYSTORE=../ubbusao/univasf-buddy-key.keystore
KEYSTORE=sobral.keystore

UNSIGNED=platforms/android/build/outputs/apk/android-release-unsigned.apk

PACKAGE='apps.pedrosobral.rsa'

# create a signed apk
sign:
	rm -f ${OUTPUT_FILE}
	# ionic cordova build android --prod
	ionic cordova build android --release --prod
	jarsigner -tsa http://timestamp.digicert.com -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${KEYSTORE} -storepass ${KEYPASS} ${UNSIGNED} ${ALIAS}
	zipalign -v 4 ${UNSIGNED} ${OUTPUT_FILE}

execute:
	adb shell am start -n ${PACKAGE}/${PACKAGE}.MainActivity

# install a signed apk on a device
install:
	adb install -r ${OUTPUT_FILE}

# monitor logs and filter by package name
log:
	adb logcat | grep `adb shell ps | grep ${PACKAGE} | cut -c10-15`

run: sign install execute log


	# ionic build android --release --prod && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../ubbusao/univasf-buddy-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk ub-keystore && ~/Library/Android/sdk/build-tools/25.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk SuecaDrunk.apk
