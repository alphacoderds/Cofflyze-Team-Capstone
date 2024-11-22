package com.capstone.cofflyze

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.capstone.cofflyze.databinding.ActivityMainBinding
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inflate the layout using Data Binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Get references to BottomNavigationView
        val navView: BottomNavigationView = binding.navView

        // Find NavHostFragment and NavController
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as? NavHostFragment
        val navController = navHostFragment?.navController ?: return // Ensure navController is not null

        // Set up AppBar with BottomNavigationView and NavController
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications
            )
        )

        // Set up ActionBar with Navigation Controller
        setupActionBarWithNavController(navController, appBarConfiguration)

        // Set up BottomNavigationView to interact with NavController
        navView.setupWithNavController(navController)

        // Check if onboarding has been completed, if not, show onboarding
        val sharedPreferences = getSharedPreferences("app_preferences", MODE_PRIVATE)
        val isOnboardingShown = sharedPreferences.getBoolean("isOnboardingShown", false)

        if (!isOnboardingShown) {
            // If onboarding hasn't been shown, navigate to ActivityOnboarding
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // Close MainActivity so user cannot return to it without completing onboarding
        }
    }

    // Optional: Override onSupportNavigateUp to handle action bar navigation
    override fun onSupportNavigateUp(): Boolean {
        val navController = (supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as? NavHostFragment)?.navController
        return navController?.navigateUp() ?: super.onSupportNavigateUp()
    }

    // Optional: Clear binding to avoid memory leaks (only necessary if binding is nullable)
    override fun onDestroy() {
        super.onDestroy()
        // No need to clear binding if it's non-nullable in this case
        // binding = null // Uncomment only if using nullable binding
    }
}
