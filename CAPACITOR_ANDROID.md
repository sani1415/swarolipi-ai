# Build Swarolipi AI as Android APK (Capacitor)

Your web app is wrapped in a native Android shell. **No URL bar** — it runs like a normal app. Your existing code is unchanged; Capacitor only adds config and an `android` folder.

---

## Prerequisites

1. **Node.js** (you already have this)
2. **Android Studio** — [Download](https://developer.android.com/studio) and install. During setup, install:
   - Android SDK
   - Android SDK Platform (e.g. API 34)
   - Android Virtual Device (optional, for emulator)

3. **Java 17** — Android Studio usually installs it. Check: `java -version`

---

## Step 1: Install dependencies

In the project folder (where `package.json` is):

```bash
npm install
```

This installs `@capacitor/core` and `@capacitor/cli` (and the rest of your app).

---

## Step 2: Add the Android platform (once)

```bash
npx cap add android
```

This creates the `android` folder and adds the native Android project. You only run this once per machine.  
*(If the `android` folder already exists, skip this step.)*

---

## Step 3: Build the web app and sync to Android

Every time you change your web code and want to update the APK:

```bash
npm run build:android
```

This runs:

1. `vite build` — builds your app into `dist/`
2. `npx cap sync android` — copies `dist/` into the Android project and updates native config

---

## Step 4: Open in Android Studio

```bash
npm run open:android
```

This opens the `android` project in Android Studio.

---

## Step 5: Build APK in Android Studio

1. Wait for Android Studio to finish indexing/sync.
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. When it finishes, click **Locate** in the notification to open the folder with the `.apk` file.
4. Copy the APK to your phone (or use an emulator) and install.

**To run on a connected phone or emulator:**  
Click the green **Run** button (or **Run → Run 'app'**). Pick your device.

---

## Quick reference

| What you want              | Command                 |
|----------------------------|-------------------------|
| First-time setup           | `npm install` then `npx cap add android` |
| After changing web code    | `npm run build:android` |
| Open Android project       | `npm run open:android`  |
| Build APK                  | In Android Studio: Build → Build APK(s) |

---

## Microphone (recording)

The app needs **microphone permission** to record voice notes. When you **first open the app**, Android should show a permission dialog — tap **Allow**. (The app requests this at startup so the recording feature works reliably in the WebView.)

If you see "Microphone access denied or error occurred":

1. **First time:** Make sure you tapped **Allow** when Android asked for microphone access when you opened the app.
2. **If you previously denied:** Open **Settings → Apps → Swarolipi AI → Permissions** and turn **Microphone** on.
3. **If it still fails after an update:** Uninstall the app completely, then install the new APK again. Open the app, allow microphone when prompted, then try recording.
4. Rebuild and reinstall the APK after any native change (manifest or MainActivity), then try again.

---

## Notes

- **No URL bar** — Capacitor loads your app from local files inside the app; it’s not showing a browser URL.
- **Your code** — Only new files were added: `capacitor.config.ts`, `android/`, and npm scripts. Your app logic is unchanged.
- **Environment variables** — For production (e.g. Gemini, Supabase), use a proper release build and keys (e.g. in Android Studio or env config); the same `.env` approach can be used when building the web bundle that Capacitor packs.

If any step fails, share the exact command and the error message.
