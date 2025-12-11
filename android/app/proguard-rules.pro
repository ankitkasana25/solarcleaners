# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep RN classes & annotations commonly needed
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep React Native bridge classes used by reflection
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# Add rules for other native libs you use (Firebase, Flipper, etc.)
# Example for Retrofit/Gson, etc., add library-specific rules
