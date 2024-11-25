package com.capstone.cofflyze.ui.login

import android.content.Intent
import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.capstone.cofflyze.MainActivity
import com.capstone.cofflyze.R
import com.capstone.cofflyze.OnboardingActivity
import com.google.firebase.auth.FirebaseAuth

class LoginActivity : AppCompatActivity() {

    private lateinit var editTextEmail: EditText
    private lateinit var editTextPassword: EditText
    private lateinit var eyeIcon: ImageView
    private lateinit var buttonLogin: Button
    private lateinit var buttonSignUp: Button
    private lateinit var buttonBack: Button
    private var isPasswordVisible = false
    private lateinit var firebaseAuth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportActionBar?.hide()
        setContentView(R.layout.activity_login)

        // Inisialisasi FirebaseAuth
        firebaseAuth = FirebaseAuth.getInstance()

        // Inisialisasi View
        editTextEmail = findViewById(R.id.editTextUsername)
        editTextPassword = findViewById(R.id.editTextPassword)
        eyeIcon = findViewById(R.id.eyeIcon)
        buttonLogin = findViewById(R.id.buttonLogin)
        buttonSignUp = findViewById(R.id.buttonSignUp)
        buttonBack = findViewById(R.id.buttonBack)

        // Listener untuk ikon mata (eyeIcon)
        eyeIcon.setOnClickListener {
            togglePasswordVisibility()
        }

        // Listener tombol Login
        buttonLogin.setOnClickListener {
            performLogin()
        }

        // Listener tombol Sign Up
        buttonSignUp.setOnClickListener {
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        // Listener tombol Back
        buttonBack.setOnClickListener {
            val intent = Intent(this, OnboardingActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    // Fungsi untuk toggle visibility password
    private fun togglePasswordVisibility() {
        if (isPasswordVisible) {
            // Sembunyikan password
            editTextPassword.transformationMethod = PasswordTransformationMethod.getInstance()
            eyeIcon.setImageResource(R.drawable.eye) // Ikon mata tertutup
        } else {
            // Tampilkan password
            editTextPassword.transformationMethod = HideReturnsTransformationMethod.getInstance()
            eyeIcon.setImageResource(R.drawable.black_eye) // Ikon mata terbuka
        }
        isPasswordVisible = !isPasswordVisible

        // Pindahkan kursor ke akhir teks
        editTextPassword.setSelection(editTextPassword.text.length)
    }

    // Fungsi untuk login menggunakan Firebase Authentication
    private fun performLogin() {
        val email = editTextEmail.text.toString().trim()
        val password = editTextPassword.text.toString().trim()

        if (email.isEmpty()) {
            editTextEmail.error = "Email tidak boleh kosong"
            return
        }

        if (password.isEmpty()) {
            editTextPassword.error = "Password tidak boleh kosong"
            return
        }

        // Menggunakan Firebase Authentication untuk login
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Jika login berhasil
                    Toast.makeText(this, "Login berhasil!", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, MainActivity::class.java) // Arahkan ke menu utama
                    startActivity(intent)
                    finish()
                } else {
                    // Jika login gagal
                    Toast.makeText(this, "Email atau password salah!", Toast.LENGTH_SHORT).show()
                }
            }
    }
}
