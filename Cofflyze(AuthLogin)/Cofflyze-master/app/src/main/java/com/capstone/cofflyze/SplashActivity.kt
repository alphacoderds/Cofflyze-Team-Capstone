package com.capstone.cofflyze

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        // Delay for 3 seconds before navigating to the onboarding flow
        Handler(Looper.getMainLooper()).postDelayed({
            goToOnboarding()
        }, 3000L) // Delay 3 seconds
    }

    private fun goToOnboarding() {
        // Start MainActivity which contains the NavHostFragment
        val intent = Intent(this, OnboardingActivity::class.java)
        startActivity(intent)
        finish()
    }
}