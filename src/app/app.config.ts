import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection // 👈 Cambiado al nombre oficial y estable
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBT6EGfH4zqkD-y8HoFP3t0FEt8hzUsT64",
  authDomain: "ppw-practica-113a7.firebaseapp.com",
  projectId: "ppw-practica-113a7",
  storageBucket: "ppw-practica-113a7.firebasestorage.app",
  messagingSenderId: "940097730008",
  appId: "1:940097730008:web:7f7ccbff3444d8c1cd2ead",
  measurementId: "G-4JJE1WSL30"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    
    // 🛠️ Nombre correcto y moderno para el motor de Signals
    provideZonelessChangeDetection(), 
    
    provideRouter(routes),
    provideHttpClient(withFetch()),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};