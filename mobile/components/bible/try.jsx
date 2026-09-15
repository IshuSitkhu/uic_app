{recentSongs.map((song) => (
  <Pressable
    key={song.id}
    style={styles.prayerCard}
    onPress={() =>
      router.push({
        pathname: "/full-song",
        params: {
          id: String(song.id),
        },
      })
    }
  >
    <View style={styles.prayerContent}>
      <View style={styles.prayerImageContainer}>
        <Image
          source={
            song.song_cover
              ? { uri: song.song_cover }
              : require("../../assets/images/popularSongs2.jpg")
          }
          style={styles.prayerImage}
        />
      </View>

      <View style={styles.prayerDetails}>
        <View style={styles.prayerTopRow}>
          <Text
            style={styles.prayerTitle}
            numberOfLines={2}
          >
            {song.song_title}
          </Text>
        </View>

        <View style={styles.prayerAuthorRow}>
          <Ionicons
            name="person-circle-outline"
            size={19}
            color={COLORS.primary}
          />

          <Text style={styles.prayerAuthor}>
            By {song.song_author}
          </Text>
        </View>
      </View>
    </View>
  </Pressable>
))}