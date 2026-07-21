# AGENT KILAVUZU — furkanyonat

Bu klasör Furkan Yonat'ın ÖNORM uyumlu CV sayfasını barındırır. Buradaki tüm dosyalar için aşağıdaki kurallara uy.

## Tasarım ve Yerleşim
- Hero bölümü menü altında kalmamalı; `Hero` bileşeninde üstte pozitif padding kullan ve negatif margin ekleme.
- İsim + telefon + e-posta + adres satırı her dilde `contactInfo` alanlarından beslenen yuvarlak kartlarla hero'da öne çıkmalı.
- Ton tekil ve "bireysel yetkinlik" odaklıdır; ajans dili veya çoğul ifadeler ekleme.
- Profil fotoğrafı `fotofurkan.jpeg` dosyasından import edilir ve menü avatarında da kullanılır; yeni fotoğrafa geçerken aynı dosya adını koru ki build çıktısındaki referanslar kırılmasın.
- Hero görseli hero başlığının üstünde, blur auralı yuvarlak bir portre olarak gösterilir; `App.tsx` içindeki `Hero` bileşenindeki görsel sınıflarını (border, shadow, object-cover) koru ki fotoğraf kesilmesin.
- Header içinde PDF indirme/print butonu bulunur; `window.print()` çağrısıyla çalışır ve `t.actions.downloadPdf` çevirisini kullanır. Butonun print çıktısında görünmediğini (header `no-print`) koru.
- Deneyim başlığında çevirilerden gelen “Tüm kartları aç”/“Kartları tek tek görüntüle” toggle’ı vardır. Toggle açıkken tüm kartlar genişlemeli ve kart butonları devre dışı (`aria-disabled`), tekli moda dönünce varsayılan olarak `neu` kartı açık gelmelidir.

## İçerik ve Kronoloji
- Referans/proje listesinde `www.zuzumood.com` bağlantısı yer alır; bu kayıt çok dilli çeviri dosyalarında (TR/EN/DE/ES) eş zamanlı korunmalıdır.
- ZuzuMood referansı yalnızca CV içinde değil, ana sitenin `src/components/Projects.tsx` dosyasındaki proje kartlarında da canlı tutulur; proje mesajları platformlar arasında çelişmemelidir.
- Deneyim sırası `experienceOrder` ile ters kronolojiktir: Dorana → Fures (yan iş) → Mimoza (müdür yrd./resepsiyon) → Concorde → Granada → Almanya bloğu.
- Almanya bloğu tek kartta tutulur; görevler içinde tarih aralıklarını (2015–2016 BMW, 2013–2014 Continental & Infineon, 2014 FedEx) koru ve C1 disiplin vurgusunu sürdür.
- Hero başlıklarında "hiyerarşi" vurgusu kullanılmaz; teslimat ve sahada hazır olma mesajı tekil dille verilir.
- Bio/hero metni dijital pazarlama katkısını net vurgulamalı (Google Ads, SEO, içerik tasarımı ile direkt rezervasyon artışı) ve ajans dili içermemelidir.
- Eğitimde turizm/otelcilik (2025–) ve Web Design & Coding (2023–) önlisansları ile Regensburg teknik eğitimi (tamamlanma belirtmeden) kalmalıdır; Web Design satırındaki RWR uygunluk notunu silme.
- Web Design & Coding önlisansı 2020–2023 aralığında tamamlandı; tarih formatını bu şekilde koru.

## Test ve SEO
- İçerik değişikliklerinden sonra `npm run build` çalıştır.
- Yeni rota eklenirse `public/sitemap.xml` dahil ilgili sitemap dosyalarını güncelle.
- CV sayfasında siteye özgü CTA veya buton metinleri ("Mehr entdecken", "Projenizi Anlatalım" vb.) kullanılmaz; hero butonları kaldırılmıştır.
- "Mehr", "Mehr entdecken", "Erzählen Sie uns von Ihrem Projekt", "Angetrieben von Fures" gibi ifadeler ve abartılı asistan selamlamaları kullanılmaz; metinlerde bu kalıpları görürsen temizle.

Bu kılavuzu her değişiklik sonrası güncel tut ve yeni gereksinimleri buraya ekle.

## Güncelleme Notu (2026-05-02)
- Bu klasör özelinde değişiklik yapılmadı; ana repo light mode revizyonlarında dark mode davranışını koruma ilkesi teyit edildi.
- Yeni rota eklenmediği için sitemap güncellemesi gerekmedi.

- Ek not: Ana repo light-mode okunabilirlik iyileştirmeleri (başlık kontrastı ve nav glass) dark mode kapsamına dahil edilmeden güncellendi.

- Ek not: Header light-mode aero glass ve ana sayfa section kontrast uyumu güncellendi; dark mode etkilenmedi.

- Ek not: WhyUs componenti light/dark temaya göre ayrı sınıflar kullanacak şekilde güncellendi.

- Ek not: WhyUs light branch koyu overlay sınıflarını render etmez şekilde güncellendi.

- Ek not: Non-homepage hero tipografi ve üst etiketleri light modda Referenzen stiline hizalandı.

- Ek not: WhyUs/Blog/Campaign için semantik sınıf bazlı light-mode override yapısına geçildi.

- Konsolidasyon notu: Bu turda kod değişiklikleri ana repo light-mode iyileştirmelerinin tek PR özetinde toplandı; yeni rota yok.

## Güncelleme Notu (2026-05-11)
- Ana sitenin referans koleksiyonuna Maria Alm Dijital Keşif Atlası dış bağlantı kartı eklendi; furkanyonat CV sayfası içeriğine dokunulmadı.
- Bu klasörde yeni rota veya SEO sayfası oluşturulmadığı için `public/sitemap.xml` tarafında furkanyonat kapsamlı ek kayıt gerekmedi.

## Güncelleme Notu (2026-05-11 / Ana Hero Perde Efekti)
- Bu görevde yalnızca ana site hero perde/canvas görseli aşağı doğru uzatıldı; `furkanyonat/` CV sayfası bileşenlerine dokunulmadı.
- Yeni rota veya CV kapsamlı SEO sayfası eklenmedi; depoda sitemap dosyası bulunmadığı için bu klasör özelinde sitemap güncellemesi gerekmedi.

## Güncelleme Notu (2026-06-12 / Ana Site Netlify Forms)
- Bu görevde `furkanyonat/` CV uygulamasına kod değişikliği yapılmadı; ana sitenin iletişim formları Netlify Forms üzerinden `furkanyonat@gmail.com` alıcısını hedefleyecek şekilde güncellendi.
- CV sayfasında yeni form eklenirse Netlify form adı çakışmayacak şekilde ayrı tutulmalı ve ÖNORM odaklı sade profil tonu korunmalıdır.
- Yeni CV rotası eklenmediği için furkanyonat kapsamlı sitemap kaydı gerekmedi; ana build sırasında `public/sitemap.xml` üretimi kontrol edildi.

## Güncelleme Notu (2026-07-21 / Maria Alm CV Proje Kartı)
- Furkan Yonat CV proje listesine `https://inmariaalm.at` bağlantılı Maria Alm Dijital Keşif Atlası kaydı TR/EN/DE/ES çevirilerinde eş zamanlı eklendi.
- Bu değişiklik mevcut `/furkanyonat` rotasındaki içerik kartını günceller; yeni fures.at iç rotası oluşturulmadığı için sitemap şablonuna yeni kayıt gerekmedi.
- Ana site `src/components/Projects.tsx` içindeki `maria-alm-route-atlas` kartının yapım aşamasında mesajı korunmalıdır; proje sahibi canlı olduğunu net onaylamadan bu durum kaldırılmamalıdır.

## Güncelleme Notu (2026-07-21 / Furkan CV Tasarım, Dil ve SEO Bakımı)
- `/furkanyonat` CV microsite kaynağında hero, proje kartları, klavye odak stilleri ve dinamik meta/title davranışı iyileştirildi.
- TR/EN/DE/ES metinlerinde tespit edilen karma dil, zincir-komuta/hiyerarşi çağrışımı ve Türkçe üçüncü şahıs anlatımı gibi dil pürüzleri temizlendi; profil tonu bireysel yetkinlik odaklı tutuldu.
- Yeni rota eklenmedi; mevcut `/furkanyonat/` sitemap kaydı korundu. Kök `robots.txt` hâlâ yok ve ayrı teknik borç olarak duruyor.
