#!/system/bin/sh -e
#
# create R.java

ANDROID_JAR=${HOME}/share/android-23.jar

aapt package -v -f \
             -M ./AndroidManifest.xml \
             -I ${ANDROID_JAR} \
             -J src \
             -S res \
             -m


# compile the java sources
# THIS EXAMPLE USING ecj, and we should find out which version
# If using jack then we must do like this:
#   jack --classpath $ANDROID_HOME/platforms/android-n/android.jar \
#        --import [path/to/import/lib/*.jar \
#        --output-dex bin/ \
#        src/ gen/
# And then, no more using dx to produce classes.dex

#####################################################################
#
#ecj -d ./obj -classpath $HOME/../usr/share/java/android.jar \
#	     -sourcepath ./src $(find src -type f -name "*.java")
#
#dx --dex --verbose --output=./bin/classes.dex ./obj

SOURCES=$(find src -name *.java)

javac -d obj/ \
    -sourcepath src \
    -cp ${ANDROID_JAR} \
    ${SOURCES}

dx --dex --output=classes.dex obj/

aapt package -v -f \
             -M ./AndroidManifest.xml \
             -S ./res \
	     -A ./assets \
	     -I ${ANDROID_JAR} \
             -F Personal.apk


# add the classes.dex to the apk
aapt add -f Personal.apk classes.dex

echo "sign the apk"

if ! [ -f personal.keystore ]; then
    keytool -genkey -v \
	-keystore personal.keystore \
	-alias personal \
	-keyalg RSA \
	-keysize 2048 \
	-validity 10000
fi

jarsigner -sigalg SHA1withRSA \
    -digestalg SHA1 \
    -keystore personal.keystore \
    Personal.apk personal

mv -fv Personal.apk /sdcard/Download/
echo "Our Personal.apk is ready to go"
echo

