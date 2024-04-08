package com.projectq

import com.facebook.react.PackageList
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.soloader.SoLoader
import com.reactnativenavigation.NavigationApplication
import com.reactnativenavigation.react.NavigationReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper

class MainApplication : NavigationApplication() {
    private val mReactNativeHost: NavigationReactNativeHost =
        object : NavigationReactNativeHost(this) {
            override fun getUseDeveloperSupport(): Boolean {
                return BuildConfig.DEBUG
            }

            override fun getPackages(): List<ReactPackage> {
                val packages: MutableList<ReactPackage> = PackageList(this).packages
                // Packages that cannot be autolinked yet can be added manually here, for example:
                return packages
            }

            override fun getJSMainModuleName(): String {
                return "index"
            }
        }
    override val reactNativeHost: ReactNativeHost
        get() = mReactNativeHost

    override fun onCreate() {
        super.onCreate()      
        ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }
}