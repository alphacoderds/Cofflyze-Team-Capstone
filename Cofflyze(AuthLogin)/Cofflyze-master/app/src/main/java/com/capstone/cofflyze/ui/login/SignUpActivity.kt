package com.capstone.cofflyze.ui.login

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.capstone.cofflyze.R
import com.google.firebase.auth.FirebaseAuth

class SignUpActivity : AppCompatActivity() {

    private lateinit var editTextUsername: EditText
    private lateinit var editTextPassword: EditText
    private lateinit var editTextConfirmPassword: EditText
    private lateinit var buttonSignUp: Button
    private lateinit var confirmPasswordToggle: ImageView
    private lateinit var passwordToggle: ImageView
    private lateinit var firebaseAuth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        // Inisialisasi FirebaseAuth
        firebaseAuth = FirebaseAuth.getInstance()

        // Inisialisasi UI components
        editTextUsername = findViewById(R.id.editTextUsername)
        editTextPassword = findViewById(R.id.editTextPassword)
        editTextConfirmPassword = findViewById(R.id.editTextConfirmPassword)
        buttonSignUp = findViewById(R.id.buttonSignUp)
        confirmPasswordToggle = findViewById(R.id.confirmPasswordToggle)
        passwordToggle = findViewById(R.id.passwordToggle)

        // Fungsi untuk sign up
        buttonSignUp.setOnClickListener {
            val username = editTextUsername.text.toString().trim()
            val password = editTextPassword.text.toString().trim()
            val confirmPassword = editTextConfirmPassword.text.toString().trim()

            if (username.isNotEmpty() && password.isNotEmpty() && confirmPassword.isNotEmpty()) {
                if (password == confirmPassword) {
                    // Panggil metode sign up Firebase
                    firebaseSignUp(username, password)
                } else {
                    Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
            }
        }

        // Fungsi untuk toggle password visibility
        passwordToggle.setOnClickListener {
            if (editTextPassword.inputType == android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD) {
                editTextPassword.inputType = android.text.InputType.TYPE_CLASS_TEXT
                passwordToggle.setImageResource(R.drawable.eye) // Ganti dengan drawable mata terbuka
            } else {
                editTextPassword.inputType = android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD
                passwordToggle.setImageResource(R.drawable.black_eye) // Ganti dengan drawable mata tertutup
            }
            editTextPassword.setSelection(editTextPassword.text.length) // Memastikan cursor tetap di posisi terakhir
        }

        confirmPasswordToggle.setOnClickListener {
            if (editTextConfirmPassword.inputType == android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD) {
                editTextConfirmPassword.inputType = android.text.InputType.TYPE_CLASS_TEXT
                confirmPasswordToggle.setImageResource(R.drawable.eye) // Ganti dengan drawable mata terbuka
            } else {
                editTextConfirmPassword.inputType = android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD
                confirmPasswordToggle.setImageResource(R.drawable.black_eye) // Ganti dengan drawable mata tertutup
            }
            editTextConfirmPassword.setSelection(editTextConfirmPassword.text.length) // Memastikan cursor tetap di posisi terakhir
        }
    }

    // Fungsi untuk mendaftar menggunakan Firebase Authentication
    private fun firebaseSignUp(username: String, password: String) {
        firebaseAuth.createUserWithEmailAndPassword(username, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Jika signup berhasil
                    Toast.makeText(this, "Sign Up Successful", Toast.LENGTH_SHORT).show()
                    finish() // Menutup aktivitas dan kembali ke login
                } else {
                    // Jika signup gagal
                    Toast.makeText(this, "Sign Up Failed: ${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }
}
