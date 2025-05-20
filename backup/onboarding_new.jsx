"use client"

// src/components/Onboarding/onboarding.js
import { useRef, useState, useEffect } from "react"
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Dapatkan dimensi layar dan tentukan faktor skala berdasarkan ukuran layar
const { width, height } = Dimensions.get("window")
const isSmallDevice = width < 375 // iPhone SE atau perangkat kecil lainnya

// Faktor skala untuk menyesuaikan ukuran elemen berdasarkan ukuran layar
const scale = isSmallDevice ? 0.8 : 1

// Pindahkan data syarat dan ketentuan langsung ke dalam komponen onboarding
const syaratPrivacyData = {
  title: "Syarat dan Ketentuan Privasi",
  content: `
1. Penerimaan Syarat dan Ketentuan
Dengan menggunakan aplikasi Kamus Pali-Indonesia ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan penggunaan yang tercantum di bawah ini. Jika Anda tidak menyetujui salah satu dari syarat ini, Anda tidak diperkenankan menggunakan aplikasi ini.

2. Penggunaan Aplikasi
Aplikasi Kamus Pali-Indonesia ini disediakan untuk membantu pengguna dalam mempelajari dan menerjemahkan kata-kata dari bahasa Pali ke bahasa Indonesia. Penggunaan aplikasi ini hanya untuk tujuan pendidikan dan referensi pribadi.

3. Hak Kekayaan Intelektual
Seluruh konten yang tersedia di aplikasi ini, termasuk teks, grafik, logo, ikon, gambar, klip audio, dan perangkat lunak, adalah milik pengembang aplikasi dan dilindungi oleh hukum hak cipta Indonesia dan internasional.

4. Kebijakan Privasi
Kami menghargai privasi Anda. Aplikasi ini mungkin mengumpulkan data penggunaan anonim untuk meningkatkan layanan. Kami tidak akan menjual atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.

5. Batasan Tanggung Jawab
Aplikasi ini disediakan 'sebagaimana adanya' tanpa jaminan apapun. Pengembang tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan aplikasi ini.

6. Perubahan Syarat dan Ketentuan
Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di aplikasi. Penggunaan berkelanjutan dari aplikasi setelah perubahan tersebut merupakan penerimaan Anda terhadap syarat dan ketentuan yang diubah.
  `,
}

// Import logo image directly here
const logoImage = require("../../../assets/Logo-SAGIN-JPG-scaled.jpg")

const slides = [
  {
    id: "0",
    isLanding: true,
    title: "Kamus Pali - Indonesia",
    description: "Selamat datang di aplikasi kamus Pali-Indonesia",
    image: logoImage,
  },
  {
    id: "1",
    title: "Selamat Datang",
    description: "Aplikasi Kamus Pali - Indonesia dengan fitur pencarian yang lengkap",
    image: require("../../../assets_boarding/image1.png"),
  },
  {
    id: "2",
    title: "Cepat dan Mudah",
    description: "Cari kata dengan mudah dan cepat. Simpan kata favorit Anda untuk akses yang lebih cepat",
    image: require("../../../assets_boarding/image.png"),
  },
  {
    id: "3",
    title: "Syarat dan Ketentuan",
    description: "Harap baca dan setujui syarat dan ketentuan penggunaan aplikasi ini",
    isTerms: true,
  },
]

const Onboarding = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const flatListRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current

  // Animasi untuk fade-in dan slide-up
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  // Animasi untuk zoom
  const zoomAnim = useRef(new Animated.Value(0.8)).current
  // Animasi untuk rotasi
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    StatusBar.setBarStyle("dark-content")
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent")
      StatusBar.setTranslucent(true)
    }

    // Animasi fade-in dan slide-up saat komponen dimuat
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Animasi saat slide berubah
  useEffect(() => {
    // Reset animasi
    fadeAnim.setValue(0)
    slideAnim.setValue(50)
    zoomAnim.setValue(0.8)
    rotateAnim.setValue(0)

    // Mulai animasi baru
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [currentSlide])

  // Fungsi untuk pergi ke slide berikutnya
  const goToNextSlide = () => {
    // Jika ini adalah slide terakhir (syarat dan ketentuan) dan belum disetujui
    if (currentSlide === slides.length - 1 && !termsAccepted) {
      return // Tombol dinonaktifkan
    }

    if (currentSlide < slides.length - 1) {
      // Hitung offset untuk slide berikutnya
      const offset = (currentSlide + 1) * width

      // Scroll ke posisi tersebut
      flatListRef.current?.scrollToOffset({
        offset: offset,
        animated: true,
      })

      // Update state secara manual
      setCurrentSlide(currentSlide + 1)
    } else {
      completeOnboarding()
    }
  }

  // Fungsi untuk kembali ke slide sebelumnya
  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      // Hitung offset untuk slide sebelumnya
      const offset = (currentSlide - 1) * width

      // Scroll ke posisi tersebut
      flatListRef.current?.scrollToOffset({
        offset: offset,
        animated: true,
      })

      // Update state secara manual
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleNext = () => {
    console.log("Next button pressed, current slide:", currentSlide)
    goToNextSlide()
  }

  const handleBack = () => {
    console.log("Back button pressed, current slide:", currentSlide)
    goToPrevSlide()
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  // Fungsi untuk menyelesaikan onboarding dan menyimpan status
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true")
      console.log("Onboarding status saved successfully")
      onFinish()
    } catch (error) {
      console.error("Error saving onboarding status:", error)
      // Tetap panggil onFinish meskipun terjadi error
      onFinish()
    }
  }

  // Komponen Checkbox sederhana
  const Checkbox = ({ checked, onToggle }) => {
    return (
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.checkbox, { backgroundColor: checked ? "#2196F3" : "transparent" }]}
      >
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    )
  }

  // Fungsi yang dipanggil saat slide berubah
  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const newIndex = viewableItems[0].index
      if (newIndex !== undefined && newIndex !== currentSlide) {
        setCurrentSlide(newIndex)
        console.log("Current slide changed to:", newIndex)
      }
    }
  }

  const viewableItemsChanged = useRef(handleViewableItemsChanged).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  // Handler untuk scroll event
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: (event) => {
      // Deteksi slide saat ini berdasarkan posisi scroll
      const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width)
      if (slideIndex !== currentSlide && slideIndex >= 0 && slideIndex < slides.length) {
        setCurrentSlide(slideIndex)
      }
    },
  })

  // Rotasi untuk animasi
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const renderSlide = ({ item, index }) => {
    // Jika ini adalah slide landing
    if (item.isLanding) {
      return (
        <View style={[styles.slide, styles.landingSlide]}>
          <Animated.View
            style={[
              styles.landingImageContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: zoomAnim }, { rotate }],
              },
            ]}
          >
            <Image source={item.image} style={styles.landingImage} resizeMode="contain" />
          </Animated.View>

          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.landingTitle}>{item.title}</Text>
            <Text style={styles.landingDescription}>{item.description}</Text>
          </Animated.View>
        </View>
      )
    }

    // Jika ini adalah slide syarat dan ketentuan
    if (item.isTerms) {
      return (
        <View style={styles.slide}>
          <Animated.View
            style={[
              styles.termsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <ScrollView style={styles.termsScrollView} showsVerticalScrollIndicator={true}>
              <Text style={styles.termsTitle}>{syaratPrivacyData.title}</Text>
              <Text style={styles.termsContent}>{syaratPrivacyData.content}</Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setTermsAccepted(!termsAccepted)}
              activeOpacity={0.7}
            >
              <Checkbox checked={termsAccepted} onToggle={() => setTermsAccepted(!termsAccepted)} />
              <Text style={styles.checkboxLabel}>Saya telah membaca dan menyetujui syarat dan ketentuan</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )
    }

    // Untuk slide lainnya
    return (
      <View style={styles.slide}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    )
  }

  const Dots = () => {
    return (
      <View style={styles.dotContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10 * scale, 20 * scale, 10 * scale],
            extrapolate: "clamp",
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          })

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#BBBBBB", "#2196F3", "#BBBBBB"],
            extrapolate: "clamp",
          })

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor,
                  height: 10 * scale,
                  borderRadius: 5 * scale,
                  marginHorizontal: 5 * scale,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  // Animasi untuk tombol Next
  const buttonScale = scrollX.interpolate({
    inputRange: [(slides.length - 2) * width, (slides.length - 1) * width],
    outputRange: [1, 1.1],
    extrapolate: "clamp",
  })

  // Tentukan apakah tombol Next/Mulai harus dinonaktifkan
  const isNextButtonDisabled = currentSlide === slides.length - 1 && !termsAccepted

  return (
    <SafeAreaView style={styles.container}>
      {/* Tombol Skip - hanya tampilkan jika bukan slide terakhir */}
      {currentSlide < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Lewati</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="center"
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <Dots />

      <View style={styles.navigationContainer}>
        {/* Tombol Kembali - hanya muncul jika tidak di slide pertama */}
        {currentSlide > 0 && (
          <TouchableOpacity style={[styles.backButton]} onPress={handleBack} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        )}

        {/* Tombol Lanjut/Mulai */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isNextButtonDisabled
                  ? "#CCCCCC"
                  : currentSlide === slides.length - 1
                    ? "#4CAF50"
                    : "#2196F3",
              },
            ]}
            onPress={handleNext}
            activeOpacity={isNextButtonDisabled ? 1 : 0.8}
            disabled={isNextButtonDisabled}
          >
            <Text style={styles.buttonText}>{currentSlide === slides.length - 1 ? "Mulai" : "Lanjut"}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Indikator halaman */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageIndicatorText}>
          {currentSlide + 1}/{slides.length}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slide: {
    width,
    height: height * 0.9, // Sedikit lebih pendek untuk memastikan semua konten terlihat
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  landingSlide: {
    backgroundColor: "#f0f8ff", // Warna latar belakang khusus untuk 
    // width: 'auto',
    // height: height * 0.9, // Sedikit lebih pendek untuk memastikan semua konten terlihat
  },
  imageContainer: {
    width: width * 0.8,
    height: height * (isSmallDevice ? 0.35 : 0.4), // Lebih kecil pada perangkat kecil
    justifyContent: "center",
    alignItems: "center",
  },
  landingImageContainer: {
    width: width * 0.6,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  landingImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30 * scale,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28 * scale,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15 * scale,
  },
  landingTitle: {
    fontSize: 32 * scale,
    fontWeight: "bold",
    color: "#1a73e8",
    textAlign: "center",
    marginBottom: 15 * scale,
  },
  description: {
    fontSize: 16 * scale,
    color: "#666",
    textAlign: "center",
    lineHeight: 24 * scale,
  },
  landingDescription: {
    fontSize: 18 * scale,
    color: "#444",
    textAlign: "center",
    lineHeight: 26 * scale,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    // Tidak perlu position absolute lagi karena sudah dalam container
  },
  // buttons styles
  button: {
    paddingVertical: 15 * scale,
    paddingHorizontal: 40 * scale,
    borderRadius: 30 * scale,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18 * scale,
    fontWeight: "600",
  },
  backButton: {
    paddingVertical: 15 * scale,
    paddingHorizontal: 30 * scale,
    borderRadius: 30 * scale,
    backgroundColor: "#F5F5F5",
    marginRight: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButtonText: {
    color: "#666",
    fontSize: 16 * scale,
    fontWeight: "600",
  },
  skipButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16 * scale,
    color: "#666",
    fontWeight: "500",
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
  },
  dot: {
    // Styling untuk dot sekarang diterapkan langsung dalam komponen Dots
  },
  pageIndicator: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  pageIndicatorText: {
    fontSize: 14 * scale,
    color: "#666",
    fontWeight: "500",
  },
  // Styles untuk syarat dan ketentuan
  termsContainer: {
    width: "90%",
    maxHeight: "80%",
    padding: 15 * scale,
    backgroundColor: "#F9F9F9",
    borderRadius: 10 * scale,
  },
  termsScrollView: {
    maxHeight: height * 0.4,
    backgroundColor: "#FFFFFF",
    borderRadius: 8 * scale,
    padding: 10 * scale,
    marginVertical: 15 * scale,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  termsTitle: {
    fontSize: 18 * scale,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10 * scale,
    textAlign: "center",
  },
  termsContent: {
    fontSize: 14 * scale,
    color: "#555",
    lineHeight: 20 * scale,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15 * scale,
    paddingVertical: 5 * scale,
  },
  checkbox: {
    width: 24 * scale,
    height: 24 * scale,
    borderWidth: 2,
    borderColor: "#2196F3",
    borderRadius: 4 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16 * scale,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 10 * scale,
    fontSize: 14 * scale,
    color: "#444",
  },
})

export default Onboarding
