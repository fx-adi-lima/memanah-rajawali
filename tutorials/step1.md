# Tutorial Step 1

Untuk membangun aplikasi secara manual kita perlu langkah awal berikut.

File berikut kita pakai sebagai `src/net/adi/personal/Main.java`.

```java

package net.adi.personal;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.content.Context;
import android.widget.TextView;

public class Main extends Activity {
	@Override
	public void onCreate(Bundle bundle) {
		super.onCreate(bundle);
		
		/* Di sini kita membuat sebuah TextView sebagai layout
		 * sekedar untuk pemanasan, supaya kita segera mulai tutorial
		 * ini dengan penuh semangat, baik Anda maupun saya.
		 *
		 * Membuat sebuah View di dalam Android selalu membutuhkan minimal satu argumen,
		 * yaitu 'Context', dalam hal ini kita passing diri sendiri sebagai parameter.
		 */
		TextView tv = new TextView(this);
		tv.setText("Hello World...!");
		setContentView(tv);
	}
}

```

Berikutnya:

```xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="net.adi.personal"
      android:versionCode="1"
      android:versionName="1.0">

    <uses-permission android:name="android.permisson.WRITE_INTERNAL_STORAGE"/>
    <uses-permission android:name="android.permisson.READ_INTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET" />
    
    <supports-screens android:resizeable="true"
                      android:xlargeScreens="true"/>

    <application android:icon="@+drawable/ic_launcher"
		 android:label="Personal">
        <activity android:name="net.adi.personal.Main"
                  android:label="Personal Main">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

```

Karena kita mencantumkan `android:icon`, maka kita juga perlu membuat sebuah folder bernama
`res/drawable`, yang hanya berisi sebuah file, yaitu `ic_launcher.png`.
Icon tersebut akan ditampilkan untuk mewakili kehadiran aplikasi kita nantinya.
Tidak penting bagaimana penampilan icon tersebut, tetapi namanya harus `ic_launcher.png`.

Berikutnya, kita menulis sebuah skrip untuk memudahkan _recompile_, kapan saja kita mau,
tanpa harus menulis perintah yang sama lagi.

Dalam hal ini gunakan `build.sh` yang saya sertakan dalam repository ini sebagai contoh.
Sesuaikan seperlunya.

Dari dalam `Terminal`, ketik perintah untuk menjalankan skrip itu:

```bash

sh -e build.sh

```

Kalau tidak ada error, maka hasilnya adalah `Personal.apk` di dalam folder `Download` Anda.
Klik icon tersebut untuk menginstall app (Anda harus menghidupkan `Install apps from unknown sources` dari **Settings** Android).

Untuk tahap ini, hasilnya sungguh tidak banyak, hanya muncul sebuah app yang menampilkan sepotong teks `Hello, World!` yang 
sudah cukup akrab bagi kita. Aplikasi itu punya _background_ hitam, dengan teks putih.

