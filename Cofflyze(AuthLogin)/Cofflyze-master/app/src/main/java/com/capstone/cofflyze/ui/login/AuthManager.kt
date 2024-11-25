package com.capstone.cofflyze.ui.login

import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser

class AuthManager {
    private val mAuth: FirebaseAuth = FirebaseAuth.getInstance()

    // Fungsi untuk registrasi pengguna baru
    fun signUp(email: String?, password: String?, listener: OnAuthCompleteListener) {
        // Pastikan email dan password tidak null
        if (email.isNullOrEmpty() || password.isNullOrEmpty()) {
            listener.onFailure(IllegalArgumentException("Email dan password harus diisi"))
            return
        }

        mAuth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task: Task<AuthResult?> ->
                if (task.isSuccessful) {
                    // Jika sukses, panggil onSuccess
                    listener.onSuccess(mAuth.currentUser)
                } else {
                    // Jika gagal, panggil onFailure dengan exception
                    listener.onFailure(task.exception)
                }
            }
    }

    // Fungsi untuk login pengguna
    fun login(email: String?, password: String?, listener: OnAuthCompleteListener) {
        // Pastikan email dan password tidak null
        if (email.isNullOrEmpty() || password.isNullOrEmpty()) {
            listener.onFailure(IllegalArgumentException("Email dan password harus diisi"))
            return
        }

        mAuth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task: Task<AuthResult?> ->
                if (task.isSuccessful) {
                    // Jika sukses, panggil onSuccess
                    listener.onSuccess(mAuth.currentUser)
                } else {
                    // Jika gagal, panggil onFailure dengan exception
                    listener.onFailure(task.exception)
                }
            }
    }

    // Interface listener untuk feedback login/registrasi
    interface OnAuthCompleteListener {
        fun onSuccess(user: FirebaseUser?)
        fun onFailure(exception: Exception?)
    }
}
