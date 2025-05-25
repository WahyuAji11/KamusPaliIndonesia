import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Animated,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Key for storing language preference
const LANGUAGE_STORAGE_KEY = '@app_language';

const Settings = () => {
  const [language, setLanguage] = useState('id');
  const [isClearing, setIsClearing] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '', type: 'success' });
  
  // Animasi untuk notifikasi
  const notificationOpacity = useState(new Animated.Value(0))[0];
  const notificationTranslateY = useState(new Animated.Value(-20))[0];
  
  // Load saved language preference when component mounts
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage !== null) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    
    loadSavedLanguage();
  }, []);
  
  // Bahasa yang lebih simpel - hanya 3 bahasa
  const languages = [
    { code: 'id', name: 'ID', flag: '🇮🇩' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'zh', name: 'CN', flag: '🇨🇳' },
    { code: 'ja', name: 'JP', flag: '🇯🇵' },
    // bahasa baru jangan di kasih kasih alert aja dulu 
    { code: 'ko', name: 'KR', flag: '🇰🇷' },
    { code: 'th', name: 'TH', flag: '🇹🇭' },
    { code: 'vi', name: 'VN', flag: '🇻🇳' },
    // { code: 'ms', name: 'MS', flag: '🇲🇾' },
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
    { code: 'de', name: 'DE', flag: '🇩🇪' },
    { code: 'es', name: 'ES', flag: '🇪🇸' }
  ];

  // Terjemahan
  const translations = {
    id: {
      welcome: "Pusat Dukungan",
      info: "Jika ada pertanyaan, silakan hubungi salah satu pembuat melalui Instagram atau email. Terima kasih atas pengertiannya.",
      clearCache: "Hapus Cache",
      reload: "Muat Ulang",
      clearCacheSuccess: "Cache berhasil dihapus",
      clearCacheError: "Gagal menghapus cache",
      reloading: "Memuat ulang...",
      contactUs: "Hubungi Kami",
      confirmClearCache: "Apakah Anda yakin ingin menghapus cache?"
    },
    en: {
      welcome: "Support Center",
      info: "If you have any questions, feel free to contact one of the creators via Instagram or email. Thank you for your understanding.",
      clearCache: "Clear Cache",
      reload: "Reload App",
      clearCacheSuccess: "Cache cleared successfully",
      clearCacheError: "Failed to clear cache",
      reloading: "Reloading...",
      contactUs: "Contact Us",
      confirmClearCache: "Are you sure you want to clear the cache?"
    },
    zh: {
      welcome: "支持中心",
      info: "如果您有任何问题，请通过Instagram或电子邮件联系创建者。感谢您的理解。",
      clearCache: "清除缓存",
      reload: "重新加载",
      clearCacheSuccess: "缓存清除成功",
      clearCacheError: "清除缓存失败",
      reloading: "正在重新加载...",
      contactUs: "联系我们",
      confirmClearCache: "您确定要清除缓存吗？"
    },
     ja: {
      welcome: "サポートセンターへようこそ",
      info: "ご質問がある場合は、InstagramまたはEメールで作成者にお問い合わせください。ご理解いただきありがとうございます。遅延についてお詫び申し上げます。",
      clearCache: "キャッシュをクリア",
      reload: "アプリを再読み込み",
      clearCacheSuccess: "キャッシュが正常にクリアされました",
      clearCacheError: "キャッシュのクリアに失敗しました",
      reloading: "アプリを再読み込み中...",
      contactUs: "お問い合わせ",
      settings: "設定",
      language: "言語",
      selectLanguage: "言語を選択",
      confirmClearCache: "キャッシュをクリアしてもよろしいですか？"
    },
    ko: {
      welcome: "지원 센터에 오신 것을 환영합니다",
      info: "질문이 있으시면 Instagram이나 이메일을 통해 제작자에게 문의하세요. 이해해 주셔서 감사합니다. 지연에 대해 사과드립니다.",
      clearCache: "캐시 지우기",
      reload: "앱 다시 로드",
      clearCacheSuccess: "캐시가 성공적으로 지워졌습니다",
      clearCacheError: "캐시 지우기 실패",
      reloading: "앱 다시 로드 중...",
      contactUs: "문의하기",
      settings: "설정",
      language: "언어",
      selectLanguage: "언어 선택",
      confirmClearCache: "캐시를 지우시겠습니까?"
    },
    th:{
      welcome: "ยินดีต้อนรับสู่ศูนย์สนับสนุน",
      info: "หากคุณมีคำถามใด ๆ โปรดติดต่อผู้สร้างผ่าน Instagram หรืออีเมล ขอบคุณสำหรับความเข้าใจของคุณ ขออภัยในความล่าช้า",
      clearCache: "ล้างแคช",
      reload: "โหลดแอปใหม่",
      clearCacheSuccess: "ล้างแคชสำเร็จ",
      clearCacheError: "ล้างแคชไม่สำเร็จ",
      reloading: "กำลังโหลดใหม่...",
      contactUs: "ติดต่อเรา",
      settings: "การตั้งค่า",
      confirmClearCache: "คุณแน่ใจหรือไม่ว่าต้องการล้างแคช?"
    },
    vi: {
      welcome: "Chào mừng đến với Trung tâm hỗ trợ",
      info: "Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với một trong những người tạo ra qua Instagram hoặc email. Cảm ơn bạn đã thông cảm.",
      clearCache: "Xóa bộ nhớ cache",
      reload: "Tải lại ứng dụng",
      clearCacheSuccess: "Xóa bộ nhớ cache thành công",
      clearCacheError: "Xóa bộ nhớ cache không thành công",
      reloading: "Đang tải lại...",
      contactUs: "Liên hệ với chúng tôi",
      settings: "Cài đặt",
      confirmClearCache: "Bạn có chắc chắn muốn xóa bộ nhớ cache không?"
    },
    fr: {
      welcome: "Centre de support",
      info: "Si vous avez des questions, n'hésitez pas à contacter l'un des créateurs via Instagram ou par e-mail. Merci de votre compréhension.",
      clearCache: "Vider le cache",
      reload: "Recharger l'application",
      clearCacheSuccess: "Cache vidé avec succès",
      clearCacheError: "Échec de la vidange du cache",
      reloading: "Rechargement...",
      contactUs: "Contactez-nous",
      confirmClearCache: "Êtes-vous sûr de vouloir vider le cache ?"
    },
    de: {
      welcome: "Supportzentrum",
      info: "Wenn Sie Fragen haben, wenden Sie sich bitte über Instagram oder E-Mail an einen der Ersteller. Vielen Dank für Ihr Verständnis.",
      clearCache: "Cache leeren",
      reload: "App neu laden",
      clearCacheSuccess: "Cache erfolgreich geleert",
      clearCacheError: "Cache leeren fehlgeschlagen",
      reloading: "Wird neu geladen...",
      contactUs: "Kontaktiere uns",
      confirmClearCache: "Sind Sie sicher, dass Sie den Cache leeren möchten?"
    },
    es: {
      welcome: "Centro de Soporte",
      info: "Si tienes alguna pregunta, no dudes en contactar a uno de los creadores a través de Instagram o correo electrónico. Gracias por tu comprensión.",
      clearCache: "Limpiar caché",
      reload: "Recargar aplicación",
      clearCacheSuccess: "Caché limpiada con éxito",
      clearCacheError: "Error al limpiar caché",
      reloading: "Recargando...",
      contactUs: "Contáctanos",
      confirmClearCache: "¿Estás seguro de que quieres limpiar la caché?"
    }
  // Tambahkan bahasa baru di sini
  };

  // Define reloadTexts object for reload confirmation dialogs
  const reloadTexts = {
    id: {
      title: "Muat Ulang Aplikasi",
      message: "Apakah Anda yakin ingin memuat ulang aplikasi?",
      cancel: "Batal",
      confirm: "Ya, Muat Ulang"
    },
    en: {
      title: "Reload Application",
      message: "Are you sure you want to reload the application?",
      cancel: "Cancel",
      confirm: "Yes, Reload"
    },
    zh: {
      title: "重新加载应用程序",
      message: "您确定要重新加载应用程序吗？",
      cancel: "取消",
      confirm: "是的，重新加载"
    },
    ja: {
      title: "アプリを再読み込み",
      message: "アプリを再読み込みしてもよろしいですか？",
      cancel: "キャンセル",
      confirm: "はい、再読み込み"
    },
    ko: {
      title: "앱 다시 로드",
      message: "앱을 다시 로드하시겠습니까?",
      cancel: "취소",
      confirm: "예, 다시 로드"
    },
    th: {
      title: "โหลดแอปใหม่",
      message: "คุณแน่ใจหรือไม่ว่าต้องการโหลดแอปใหม่?",
      cancel: "ยกเลิก",
      confirm: "ใช่, โหลดใหม่"
    },
    vi: {
      title: "Tải lại ứng dụng",
      message: "Bạn có chắc chắn muốn tải lại ứng dụng không?",
      cancel: "Hủy",
      confirm: "Có, Tải lại"
    },
    fr: {
      title: "Recharger l'application",
      message: "Êtes-vous sûr de vouloir recharger l'application?",
      cancel: "Annuler",
      confirm: "Oui, Recharger"
    },
    de: {
      title: "App neu laden",
      message: "Sind Sie sicher, dass Sie die App neu laden möchten?",
      cancel: "Abbrechen",
      confirm: "Ja, Neu laden"
    },
    es: {
      title: "Recargar aplicación",
      message: "¿Estás seguro de que quieres recargar la aplicación?",
      cancel: "Cancelar",
      confirm: "Sí, Recargar"
    }
  };

  const t = translations[language] || translations.id;

  // Function to handle language change
  const handleLanguageChange = async (langCode) => {
    try {
      // Save language preference to AsyncStorage
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
      // Update state
      setLanguage(langCode);
    } catch (error) {
      console.error('Error saving language preference:', error);
      showNotification('Failed to save language preference', 'error');
    }
  };

  // Tampilkan notifikasi modern
  const showNotification = (message, type = 'success') => {
    setNotification({ visible: true, message, type });
    
    // Animasi masuk
    notificationOpacity.setValue(0);
    notificationTranslateY.setValue(-20);
    
    Animated.parallel([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(notificationTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
    
    // Otomatis hilang setelah 3 detik
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(notificationOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(notificationTranslateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        setNotification({ ...notification, visible: false });
      });
    }, 3000);
  };

  // Fungsi hapus cache dengan konfirmasi
  const confirmClearCache = () => {
    Alert.alert(
      "Clear Cache",
      t.confirmClearCache,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: clearCache
        }
      ]
    );
  };

  // Fungsi hapus cache
  const clearCache = async () => {
    try {
      setIsClearing(true);
      // Save the current language before clearing
      const currentLang = language;
      await AsyncStorage.clear();
      // Restore the language preference
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
      showNotification(t.clearCacheSuccess, 'success');
    } catch (error) {
      showNotification(t.clearCacheError, 'error');
      console.error('Error clearing cache:', error);
    } finally {
      setTimeout(() => setIsClearing(false), 800);
    }
  };

  // Fungsi muat ulang aplikasi
  const reloadApp = async () => {
    const currentLang = language || ''; // ambil bahasa yang aktif
    const text = reloadTexts[currentLang] || reloadTexts['en'];

    Alert.alert(
      text.title,
      text.message,
      [
        {
          text: text.cancel,
          onPress: () => console.log('Muat ulang dibatalkan'),
          style: 'cancel',
        },
        {
          text: text.confirm,
          onPress: async () => {
            try {
              setIsReloading(true);
              showNotification(t.reloading, 'info');

              setTimeout(async () => {
                try {
                  await Updates.reloadAsync();
                } catch (error) {
                  console.error('Gagal memuat ulang:', error);
                  setIsReloading(false);
                }
              }, 1500);
            } catch (error) {
              console.error('Error di proses reload:', error);
              setIsReloading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const ContactItem = ({ icon, text, url }) => (
    <TouchableOpacity 
      style={styles.contactCard} 
      onPress={() => url && Linking.openURL(url)}
      activeOpacity={0.7}
    >
      <View style={styles.contactItem}>
        <View style={styles.contactIcon}>
          <FontAwesome5 name={icon} size={20} color="#4361ee" solid />
        </View>
        <Text style={styles.contactText}>{text}</Text>
        <FontAwesome5 name="arrow-right" size={16} color="#4361ee" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header tanpa tulisan "Pengaturan" */}
      <View style={styles.header}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.languageSelector}
        >
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                language === lang.code && styles.activeLanguageButton
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={styles.languageButtonText}>
                {lang.flag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Notifikasi Modern */}
      {notification.visible && (
        <Animated.View 
          style={[
            styles.notification,
            styles[`notification${notification.type}`],
            {
              opacity: notificationOpacity,
              transform: [{ translateY: notificationTranslateY }]
            }
          ]}
        >
          <Text style={styles.notificationText}>{notification.message}</Text>
        </Animated.View>
      )}

      {isReloading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4361ee" />
          <Text style={styles.loadingText}>{t.reloading}</Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            {t.welcome}
          </Text>
          <Text style={styles.infoText}>
            {t.info}
          </Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={confirmClearCache}
            disabled={isClearing}
          >
            {isClearing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <FontAwesome5 name="trash-alt" size={16} color="#fff" solid style={styles.buttonIcon} />
            )}
            <Text style={styles.buttonText}>{t.clearCache}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={reloadApp}
            disabled={isReloading}
          >
            <FontAwesome5 name="sync-alt" size={16} color="#fff" solid style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{t.reload}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {t.contactUs}
        </Text>
        
        <View style={styles.contactsContainer}>
          <ContactItem
            icon="dharmachakra"
            text="Sangha Agung Indonesia"
            url="mailto:rtxalham@gmail.com"
          />
          <ContactItem
            icon="phone"
            text="928349282"
            url="tel:928349282"
          />
          <ContactItem
            icon="instagram"
            text="Instagram(@sanghaagungindonesia)"
            url="https://www.instagram.com/sanghaagungindonesia/"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  languageSelector: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
    alignItems: 'center'
  },
  languageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
  },
  activeLanguageButton: {
    backgroundColor: '#e7efff',
    borderWidth: 2,
    borderColor: '#4361ee',
  },
  languageButtonText: {
    fontSize: 18,
  },
  notification: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationsuccess: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  notificationerror: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  notificationinfo: {
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    borderWidth: 1,
  },
  notificationText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4361ee',
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  primaryButton: {
    backgroundColor: '#4361ee',
  },
  secondaryButton: {
    backgroundColor: '#3f37c9',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4361ee',
  },
  contactsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7efff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#4361ee',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: 'white',
    marginTop: 12,
    fontSize: 16,
  }
});

export default Settings;