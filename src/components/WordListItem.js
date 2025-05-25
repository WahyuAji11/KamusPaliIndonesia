import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { theme } from "../styles/AppStyles"

const WordListItem = ({ item, onPress, isFavorite, onToggleFavorite }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(item)} activeOpacity={0.7}>
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.paliWord}>{item.pali}</Text>
          <Text style={styles.translation}>{item.indonesia}</Text>
        </View>
        {onToggleFavorite && (
          <TouchableOpacity
            onPress={() => onToggleFavorite(item)}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon name={isFavorite ? "star" : "star-o"} size={20} color={isFavorite ? "#FFD700" : theme.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {(item.paliVerse || item.detailedIndonesia) && <View style={styles.divider} />}

      {item.paliVerse && (
        <Text style={styles.paliVerse} numberOfLines={2}>
          {item.paliVerse}
        </Text>
      )}

      {item.detailedIndonesia && (
        <Text style={styles.detailedTranslation} numberOfLines={2}>
          {item.detailedIndonesia}
        </Text>
      )}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  paliWord: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3D5A80", // A calming blue color
    marginBottom: 4,
  },
  translation: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
  },
  paliVerse: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 6,
    lineHeight: 20,
  },
  detailedTranslation: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  favoriteButton: {
    padding: 4,
  },
})

export default WordListItem
