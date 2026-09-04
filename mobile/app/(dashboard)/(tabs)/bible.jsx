import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import Toast from "react-native-toast-message";
import { COLORS } from "../../../constants/colors";
import API_URL from "../../../services/api";

const translations = [
  { code: "kjv", name: "King James Version", shortName: "KJV" },
  { code: "asv", name: "American Standard Version", shortName: "ASV" },
  { code: "esv", name: "English Standard Version", shortName: "ESV" },
  { code: "nasb", name: "New American Standard Bible", shortName: "NASB" },
  { code: "niv", name: "New International Version", shortName: "NIV" },
  { code: "nkjv", name: "New King James Version", shortName: "NKJV" },
  { code: "nlt", name: "New Living Translation", shortName: "NLT" },
  { code: "np", name: "Nepali Version", shortName: "NP" },
];

const bookMap = {
  // English → Nepali (matching your given list)
  Genesis: "उत्पत्ति",
  Exodus: "प्रस्थान",
  Leviticus: "लेवीहरू",
  Numbers: "गन्ती",
  Deuteronomy: "व्यवस्था",
  Joshua: "यहोशू",
  Judges: "न्यायकर्ताहरू",
  Ruth: "रूथ",
  "1 Samuel": "१ शमूएल",
  "2 Samuel": "२ शमूएल",
  "1 Kings": "१ राजाहरू",
  "2 Kings": "२ राजाहरू",
  "1 Chronicles": "१ इतिहास",
  "2 Chronicles": "२ इतिहास",
  Ezra: "एज्रा",
  Nehemiah: "नहेम्याह",
  Esther: "एस्तर",
  Job: "अय्यूब",
  Psalms: "भजनसंग्रह",
  Proverbs: "हितोपदेश",
  Ecclesiastes: "उपदेशक",
  "Song of Solomon": "श्रेष्‍ठगीत",
  Isaiah: "यशैया",
  Jeremiah: "यर्मिया",
  Lamentations: "विलाप",
  Ezekiel: "इजकिएल",
  Daniel: "दानिएल",
  Hosea: "होशे",
  Joel: "योएल",
  Amos: "आमोस",
  Obadiah: "ओबदिया",
  Jonah: "योना",
  Micah: "मिका",
  Nahum: "नहूम",
  Habakkuk: "हबकूक",
  Zephaniah: "सपन्याह",
  Haggai: "हाग्‍गै",
  Zechariah: "जकरिया",
  Malachi: "मलाकी",
  Matthew: "मत्ती",
  Mark: "मर्कूस",
  Luke: "लुका",
  John: "यूहन्‍ना",
  Acts: "प्रेरित",
  Romans: "रोमी",
  "1 Corinthians": "१ कोरिन्थी",
  "2 Corinthians": "२ कोरिन्थी",
  Galatians: "गलाती",
  Ephesians: "एफिसि",
  Philippians: "फिलिप्पी",
  Colossians: "कलस्सी",
  "1 Thessalonians": "१ थेसलोनिकी",
  "2 Thessalonians": "२ थेसलोनिकी",
  "1 Timothy": "१ तिमोथी",
  "2 Timothy": "२ तिमोथी",
  Titus: "तीतस",
  Philemon: "फिलेमोन",
  Hebrews: "हिब्रू",
  James: "याकूब",
  "1 Peter": "१ पत्रुस",
  "2 Peter": "२ पत्रुस",
  "1 John": "१ यूहन्‍ना",
  "2 John": "२ यूहन्‍ना",
  "3 John": "३ यूहन्‍ना",
  Jude: "यहूदा",
  Revelation: "प्रकाश",
};

const bookMapReverse = Object.fromEntries(
  Object.entries(bookMap).map(([eng, nep]) => [nep, eng]),
);

const Bible = () => {
  const scrollViewRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("nasb");
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState(1);

  const [tempLanguage, setTempLanguage] = useState(null);
  const [tempBook, setTempBook] = useState(null);

  const [selectedVerse, setSelectedVerse] = useState(null);
  const [verseText, setVerseText] = useState("");

  const [highlights, setHighlights] = useState({});
  // highlights = already saved in the database

  const [selectedHighlightVerses, setSelectedHighlightVerses] = useState([]);
  // selectedHighlightVerses = currently being selected by the user [1,2]

  const [books, setBooks] = useState({
    oldTestament: [],
    newTestament: [],
  });
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState({});

  const [modalStep, setModalStep] = useState(null);

  const [index, setIndex] = useState(0);

  const [readAllVerses, setReadAllVerses] = useState(true);

  //font
  const [fontSize, setFontSize] = useState("large");
  const [lineSpacing, setLineSpacing] = useState("relaxed");
  const lineHeights = {
    compact: 26,
    normal: 30,
    relaxed: 36,
    wide: 42,
  };
  const fontSizes = {
    small: 16,
    medium: 18,
    large: 21,
    extraLarge: 24,
  };

  const [routes] = useState([
    { key: "old", title: "Old Testament" },
    { key: "new", title: "New Testament" },
  ]);

  const highlightColors = {
    yellow: "#FFF59D",
    blue: "#BBDEFB",
    purple: "#D1C4E9",
    green: "#C8E6C9",
    red: "#FFCDD2",
  };

  //   const highlightColors = {
  //     yellow: '#e1d031',
  //     blue: '#8dc7f6',
  //     purple: '#ac8fe1',
  //     green: '#6fe679',
  //     red: '#f65353',
  // };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "old":
        console.log("OLD BOOKS:", books.oldTestament);

        return (
          <ScrollView style={{ flex: 1 }}>
            {books.oldTestament.map((book) => (
              <TouchableOpacity
                key={book}
                style={[
                  styles.bookItem,
                  selectedBook === book && styles.selectedBookItem,
                ]}
                onPress={() => fetchChapters(book)}
              >
                <Text
                  style={[
                    styles.bookText,
                    selectedBook === book && styles.selectedBookText,
                  ]}
                >
                  {book}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      case "new":
        console.log("NEW BOOKS:", books.newTestament);

        return (
          <ScrollView style={{ flex: 1 }}>
            {books.newTestament.map((book) => (
              <TouchableOpacity
                key={book}
                style={[
                  styles.bookItem,
                  selectedBook === book && styles.selectedBookItem,
                ]}
                onPress={() => fetchChapters(book)}
              >
                <Text
                  style={[
                    styles.bookText,
                    selectedBook === book && styles.selectedBookText,
                  ]}
                >
                  {book}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      default:
        return null;
    }
  };

  const fetchBooks = async (language) => {
    try {
      const url = `${API_URL}/bible/books/${language}`;

      console.log("FETCHING BOOKS URL:", url);

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("BOOKS RESPONSE STATUS:", response.status);

      const data = await response.json();

      console.log("FETCHED BOOK DATA:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch books");
      }

      setBooks({
        oldTestament: data.oldTestament || [],
        newTestament: data.newTestament || [],
      });

      console.log("SETTING BOOKS:", {
        oldTestament: data.oldTestament || [],
        newTestament: data.newTestament || [],
      });

      setModalStep("books");
    } catch (error) {
      console.error("ERROR FETCHING BOOKS:", error.message);
    }
  };
  const fetchChapters = async (book) => {
    try {
      const languageToUse = tempLanguage || selectedLanguage;

      const url = `${API_URL}/bible/${languageToUse}/${encodeURIComponent(book)}`;

      console.log("Fetching chapters:", url);

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      console.log("Chapter response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch chapters");
      }

      // TEMPORARY only
      setTempBook(data.book);
      setChapters(data.chapters);

      // Same modal changes from Books → Chapters
      setModalStep("chapters");
    } catch (error) {
      console.error("Error fetching chapters:", error.message);
    }
  };

  const fetchChaptersForNavigation = async (book, language) => {
    try {
      const url = `${API_URL}/bible/${language}/${encodeURIComponent(book)}`;

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch chapters");
      }

      // ONLY save chapters for Previous / Next navigation
      setChapters(data.chapters);
    } catch (error) {
      console.error("Error fetching chapters for navigation:", error.message);
    }
  };

  const selectVerse = (verseNumber) => {
    setSelectedVerse(verseNumber);
    setVerseText(verses[verseNumber]);
    setReadAllVerses(false);

    // Close the modal
    setModalStep(null);
  };

  const readAllChapter = () => {
    setReadAllVerses(true);
    setSelectedVerse(null);
    setVerseText("");
  };

  const fetchVerses = async (chapter) => {
    try {
      const languageToUse = tempLanguage || selectedLanguage;
      const bookToUse = tempBook || selectedBook;

      const url =
        `${API_URL}/bible/${languageToUse}/` +
        `${encodeURIComponent(bookToUse)}/${chapter}`;

      console.log("Fetching verses:", url);

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      console.log("Verse response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch verses");
      }

      // NOW officially apply everything
      setSelectedLanguage(languageToUse);
      setSelectedBook(bookToUse);
      setSelectedChapter(chapter);

      setVerses(data.verses);
      await fetchHighlights(languageToUse, bookToUse, chapter);

      await fetchChaptersForNavigation(bookToUse, languageToUse);

      const currentVerse = String(selectedVerse);

      if (selectedVerse && data.verses[currentVerse]) {
        // Same verse number exists in the new chapter
        setSelectedVerse(currentVerse);
        setVerseText(data.verses[currentVerse]);
        setReadAllVerses(false);
      } else {
        // No selected verse, or that verse doesn't exist
        setSelectedVerse(null);
        setVerseText("");
        setReadAllVerses(true);
      }

      // Clear temporary selections
      setTempLanguage(null);
      setTempBook(null);

      // Close modal
      setModalStep(null);

      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } catch (error) {
      console.error("Error fetching verses:", error.message);
    }
  };

  // const fetchDefaultVerse = async () => {
  //   try {
  //     const url = `${API_URL}/bible/nasb/Genesis/1`;

  //     console.log("Fetching default verse:", url);

  //     const response = await fetch(url, {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     console.log("Default verse:", data);

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to fetch default verse");
  //     }

  //     setSelectedLanguage("nasb");
  //     setSelectedBook(data.book);
  //     setSelectedChapter(data.chapter);
  //     setVerses(data.verses);
  //     await fetchHighlights("nasb", data.book, data.chapter);

  //     // No individual verse selected initially
  //     setSelectedVerse(null);
  //     setVerseText("");
  //     setReadAllVerses(true);

  //     await fetchChaptersForNavigation(data.book, "nasb");
  //   } catch (error) {
  //     console.error("Error fetching default verse:", error.message);
  //   }
  // };

  const fetchDefaultVerse = async () => {
    try {
      const url = `${API_URL}/bible/nasb/Genesis/1`;

      console.log("Fetching default verse:", url);

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Response received:", response.status);

      const data = await response.json();

      console.log("Default verse:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch default verse");
      }

      setSelectedLanguage("nasb");
      setSelectedBook(data.book);
      setSelectedChapter(data.chapter);
      setVerses(data.verses);

      await fetchHighlights("nasb", data.book, data.chapter);

      setSelectedVerse(null);
      setVerseText("");
      setReadAllVerses(true);

      await fetchChaptersForNavigation(data.book, "nasb");
    } catch (error) {
      console.error("Error fetching default verse:", error.message);
    }
  };
  useEffect(() => {
    fetchDefaultVerse();
    // fetchBooks('nasb');
  }, []);

  const closeModal = () => {
    // Discard temporary changes
    setTempLanguage(null);
    setTempBook(null);

    setModalStep(null);
  };

  const handleLanguagePress = async (language) => {
    setTempLanguage(language);

    // If a book and chapter are already selected,
    // keep them and try to load the same place
    if (selectedBook && selectedChapter) {
      try {
        let newSelectedBook = selectedBook;

        if (language === "np" && bookMap[selectedBook]) {
          newSelectedBook = bookMap[selectedBook];
        } else if (language !== "np" && bookMapReverse[selectedBook]) {
          newSelectedBook = bookMapReverse[selectedBook];
        }
        console.log("After:", newSelectedBook);

        setSelectedBook(newSelectedBook);

        const url = `${API_URL}/bible/${language}/${encodeURIComponent(
          newSelectedBook,
        )}/${selectedChapter}`;

        console.log("Changing language, fetching:", url);

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch verses");
        }

        // Only apply the new language after successful fetch

        // Apply new language and book
        setSelectedLanguage(language);
        setSelectedBook(newSelectedBook);
        setVerses(data.verses);
        await fetchHighlights(language, newSelectedBook, selectedChapter);

        // Keep the same verse if it exists
        const currentVerse = String(selectedVerse);

        if (selectedVerse && data.verses[currentVerse]) {
          setSelectedVerse(currentVerse);
          setVerseText(data.verses[currentVerse]);
          setReadAllVerses(false);
        } else {
          // If there was no selected verse,
          // or the verse doesn't exist
          setSelectedVerse(null);
          setVerseText("");
          setReadAllVerses(true);
        }

        setModalStep(null);
      } catch (error) {
        console.error("Error changing language:", error.message);
      }

      return;
    }

    // No complete book/chapter selection yet
    fetchBooks(language);
  };

  const goToPreviousVerse = () => {
    const verseNumbers = Object.keys(verses);
    const currentIndex = verseNumbers.indexOf(String(selectedVerse));

    if (currentIndex > 0) {
      const previousVerse = verseNumbers[currentIndex - 1];

      setSelectedVerse(previousVerse);
      setVerseText(verses[previousVerse]);
    }
  };

  const goToNextVerse = () => {
    const verseNumbers = Object.keys(verses);
    const currentIndex = verseNumbers.indexOf(String(selectedVerse));

    if (currentIndex < verseNumbers.length - 1) {
      const nextVerse = verseNumbers[currentIndex + 1];

      setSelectedVerse(nextVerse);
      setVerseText(verses[nextVerse]);
    }
  };

  const goToPreviousChapter = async () => {
    const currentIndex = chapters.findIndex(
      (item) => String(item.chapter) === String(selectedChapter),
    );

    if (currentIndex > 0) {
      const previousChapter = chapters[currentIndex - 1].chapter;

      await fetchVerses(previousChapter);
    }
  };

  const goToNextChapter = async () => {
    const currentIndex = chapters.findIndex(
      (item) => String(item.chapter) === String(selectedChapter),
    );

    if (currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1].chapter;

      await fetchVerses(nextChapter);
    }
  };

  //highlights

  const fetchHighlights = async (translation, book, chapter) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/bible/highlights/${translation}/${encodeURIComponent(book)}/${chapter}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch highlights:", data);
        return;
      }

      const highlightMap = {};

      data.highlights.forEach((item) => {
        highlightMap[item.verse] = {
          id: item.id,
          color: item.color,
          save: item.save,
        };
      });

      // highlights[16]=yellow

      setHighlights(highlightMap);
    } catch (error) {
      console.log("Fetch highlights error:", error);
    }
  };

  //selects and deselects verses.
  const toggleHighlightVerse = (verseNumber) => {
    setSelectedHighlightVerses((prev) => {
      if (prev.includes(Number(verseNumber))) {
        return prev.filter((verse) => verse !== Number(verseNumber));
      }

      return [...prev, Number(verseNumber)];
    });
  };

  const saveHighlights = async (color) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No authentication token found.");
        router.push("/(auth)/login");
        return;
      }

      const results = await Promise.all(
        selectedHighlightVerses.map(async (verseNumber) => {
          const response = await fetch(`${API_URL}/bible/highlights`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              translation: selectedLanguage,
              book: selectedBook,
              chapter: selectedChapter,
              verse: verseNumber,
              color: color,
            }),
          });

          const data = await response.json();

          console.log(`Save verse ${verseNumber}:`, response.status, data);

          return response.ok;
        }),
      );

      if (results.every(Boolean)) {
        await fetchHighlights(selectedLanguage, selectedBook, selectedChapter);

        setSelectedHighlightVerses([]);
      }
    } catch (error) {
      console.log("Save highlights error:", error);
    }
  };

  const removeSelectedHighlights = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No authentication token found.");
        router.push("/(auth)/login");
        return;
      }

      const versesToRemove = selectedHighlightVerses.filter(
        (verseNumber) => highlights[verseNumber],
      );

      await Promise.all(
        versesToRemove.map(async (verseNumber) => {
          const highlightId = highlights[verseNumber].id;

          const response = await fetch(
            `${API_URL}/bible/highlights/${highlightId}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const data = await response.json();

          console.log(`Remove verse ${verseNumber}:`, response.status, data);

          if (!response.ok) {
            throw new Error(`Failed to remove verse ${verseNumber}`);
          }
        }),
      );

      await fetchHighlights(selectedLanguage, selectedBook, selectedChapter);

      setSelectedHighlightVerses([]);
    } catch (error) {
      console.log("Remove highlights error:", error);
    }
  };

  //save
  const saveSelectedVerses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No authentication token found.");
        router.push("/(auth)/login");
        return;
      }

      await Promise.all(
        selectedHighlightVerses.map(async (verseNumber) => {
          const response = await fetch(`${API_URL}/bible/highlights/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              translation: selectedLanguage,
              book: selectedBook,
              chapter: selectedChapter,
              verse: verseNumber,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            Toast.show({
              type: "success",
              text1: data.highlight.save ? "Verse Saved" : "Verse Unsaved",
              position: "top",
            });
          }

          console.log(`Save verse ${verseNumber}:`, response.status, data);

          if (!response.ok) {
            throw new Error(`Failed to save verse ${verseNumber}`);
          }
        }),
      );

      await fetchHighlights(selectedLanguage, selectedBook, selectedChapter);

      setSelectedHighlightVerses([]);
    } catch (error) {
      console.log("Save verses error:", error);
    }
  };

  // const isAnySelectedVerseSaved = selectedHighlightVerses.some(
  //     (verseNumber) => highlights[verseNumber]?.save
  //   );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bibleHeader}>
        {/* LEFT SIDE: BOOK + CHAPTER + VERSE */}
        <View style={styles.referenceContainer}>
          <View style={styles.bookChapterBox}>
            <TouchableOpacity
              style={styles.bookSelector}
              onPress={() => fetchBooks(selectedLanguage)}
            >
              <Text style={styles.bookSelectorText} numberOfLines={1}>
                {selectedChapter ? selectedBook : "Select Book"}
              </Text>
            </TouchableOpacity>
            {/* <View style={styles.referenceDivider} /> */}
            {selectedBook && (
              <>
                <View style={styles.referenceDivider} />
                <TouchableOpacity
                  style={styles.chapterSelector}
                  onPress={() => {
                    if (selectedBook) {
                      fetchChapters(selectedBook);
                    }
                  }}
                >
                  <Text style={styles.referenceText}>
                    {/* {selectedChapter ? `Chapter: ${selectedChapter}` : 'Select Chapter'} */}
                    {selectedChapter ? ` ${selectedChapter}` : "Select Chapter"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {/* <Ionicons name="chevron-down" size={14} color={COLORS.primary} /> */}

          {/* DIVIDER */}
          {/* <View style={styles.referenceDivider} /> */}

          {selectedChapter && (
            <TouchableOpacity
              style={styles.verseSelector}
              onPress={() => setModalStep("verseId")}
            >
              <Text style={styles.referenceVerseText}>
                {selectedVerse
                  ? `: ${selectedChapter}.${selectedVerse}`
                  : "Select Verse"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* RIGHT SIDE: TRANSLATION + SETTINGS */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.translationSelector}
            onPress={() => setModalStep("translation")}
          >
            <Text style={styles.translationSelectorText}>
              {selectedLanguage
                ? translations.find((item) => item.code === selectedLanguage)
                    ?.shortName
                : "Select"}
            </Text>

            <Ionicons name="chevron-down" size={8} color="#fff" />
          </TouchableOpacity>

          {/* SETTINGS */}
          <TouchableOpacity
            style={styles.settingsSelector}
            onPress={() => setModalStep("settings")}
          >
            {/* <Ionicons name="settings-outline" size={22} color={COLORS.primary} /> */}
            <Ionicons name="options-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.versesContainer}>
        {selectedVerse && !readAllVerses ? (
          <>
            {/* Selected verse */}
            <View style={styles.selectedVerseBox}>
              <Text style={styles.verseReference}>
                {selectedBook} {selectedChapter}:{selectedVerse}
              </Text>

              <Text
                style={[
                  styles.selectedVerseText,
                  {
                    backgroundColor: highlights[selectedVerse]
                      ? highlightColors[highlights[selectedVerse].color]
                      : "transparent",

                    textDecorationLine: selectedHighlightVerses.includes(
                      Number(selectedVerse),
                    )
                      ? "underline"
                      : "none",
                  },
                ]}
                onPress={() => toggleHighlightVerse(selectedVerse)}
              >
                {verseText}
              </Text>

              <TouchableOpacity
                style={styles.readAllButton}
                onPress={readAllChapter}
              >
                <Text style={styles.readAllButtonText}>
                  Read All Chapter...
                </Text>
              </TouchableOpacity>

              {/* Previous / Next Verse */}
              <View style={styles.navigationVerseButtons}>
                <TouchableOpacity
                  style={[
                    styles.navigationButton,
                    selectedVerse === "1" && styles.disabledNavigationButton,
                  ]}
                  onPress={goToPreviousVerse}
                  disabled={selectedVerse === "1"}
                >
                  <MaterialIcons
                    name="navigate-before"
                    size={32}
                    color="#fff"
                    style={styles.previousIcon}
                  />
                  {/* <Text> Previous</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navigationButton,
                    selectedVerse === String(Object.keys(verses).length) &&
                      styles.disabledNavigationButton,
                  ]}
                  onPress={goToNextVerse}
                  disabled={
                    selectedVerse === String(Object.keys(verses).length)
                  }
                >
                  <MaterialIcons
                    name="navigate-next"
                    size={32}
                    color="#fff"
                    style={styles.nextIcon}
                  />
                  {/* <Text>Next </Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                paddingBottom: Platform.OS === "ios" ? 50 : 5,
              }}
            >
              {readAllVerses ? (
                <Text
                  style={[
                    styles.verseText,
                    {
                      fontSize: fontSizes[fontSize],
                      lineHeight: lineHeights[lineSpacing],
                    },
                  ]}
                >
                  {Object.entries(verses).map(([verseNumber, text]) => (
                    <Text
                      key={verseNumber}
                      onPress={() => toggleHighlightVerse(verseNumber)}
                      style={{
                        backgroundColor: highlights[verseNumber]
                          ? highlightColors[highlights[verseNumber].color]
                          : "transparent",

                        textDecorationLine: selectedHighlightVerses.includes(
                          Number(verseNumber),
                        )
                          ? "underline"
                          : "none",
                      }}
                    >
                      <Text
                        style={[
                          styles.verseNumber,
                          {
                            fontSize: fontSizes[fontSize],
                            lineHeight: lineHeights[lineSpacing],
                          },
                        ]}
                      >
                        {verseNumber}{" "}
                      </Text>

                      <Text
                        style={[
                          styles.textt,
                          {
                            fontSize: fontSizes[fontSize],
                            lineHeight: lineHeights[lineSpacing],
                          },
                        ]}
                      >
                        {text}{" "}
                      </Text>
                    </Text>
                  ))}
                </Text>
              ) : (
                // VERSE MODE
                <View style={styles.verseText}>
                  {Object.entries(verses).map(([verseNumber, text]) => (
                    <Pressable
                      key={verseNumber}
                      onPress={() => toggleHighlightVerse(verseNumber)}
                      // onLongPress={() => toggleHighlightVerse(verseNumber)}
                      android_ripple={null}
                      style={{ marginBottom: 15 }}
                    >
                      <Text
                        style={[
                          styles.textt,
                          {
                            fontSize: fontSizes[fontSize],
                            lineHeight: lineHeights[lineSpacing],

                            backgroundColor: highlights[verseNumber]
                              ? highlightColors[highlights[verseNumber].color]
                              : "transparent",

                            textDecorationLine:
                              selectedHighlightVerses.includes(
                                Number(verseNumber),
                              )
                                ? "underline"
                                : "none",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.verseNumber,
                            {
                              fontSize: fontSizes[fontSize],
                              lineHeight: lineHeights[lineSpacing],
                            },
                          ]}
                        >
                          {verseNumber}{" "}
                        </Text>

                        {text}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </ScrollView>
            {Object.keys(verses).length > 0 && (
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={goToPreviousChapter}
                  disabled={
                    chapters.length === 0 ||
                    String(selectedChapter) === String(chapters[0]?.chapter)
                  }
                >
                  <MaterialIcons
                    name="navigate-before"
                    size={32}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={goToNextChapter}
                  disabled={
                    chapters.length === 0 ||
                    String(selectedChapter) ===
                      String(chapters[chapters.length - 1]?.chapter)
                  }
                >
                  <MaterialIcons name="navigate-next" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <Modal
        visible={modalStep !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setModalStep(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            {modalStep === "translation" && (
              <>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Select Translation</Text>

                  <TouchableOpacity
                    style={styles.closeArea}
                    onPress={closeModal}
                    hitSlop={10}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={translations}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.translationItem,
                        (tempLanguage || selectedLanguage) === item.code &&
                          styles.selectedItem,
                      ]}
                      onPress={() => handleLanguagePress(item.code)}
                    >
                      <Text
                        style={[
                          styles.translationName,
                          (tempLanguage || selectedLanguage) === item.code &&
                            styles.selectedTranslationText,
                        ]}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={[
                          styles.shortName,
                          (tempLanguage || selectedLanguage) === item.code &&
                            styles.selectedTranslationText,
                        ]}
                      >
                        {item.shortName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
            {modalStep === "books" && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity onPress={() => setModalStep("translation")}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>

                  <Text style={styles.sheetTitle}>
                    {
                      translations.find(
                        (item) =>
                          item.code === (tempLanguage || selectedLanguage),
                      )?.shortName
                    }{" "}
                    Bible Books
                  </Text>

                  <TouchableOpacity
                    style={styles.closeArea}
                    onPress={() => setModalStep(null)}
                    hitSlop={10}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={{
                    width: Dimensions.get("window").width,
                  }}
                  renderTabBar={(props) => (
                    <TabBar
                      {...props}
                      style={styles.tabBar}
                      indicatorStyle={styles.indicator}
                      activeColor={COLORS.primary}
                      inactiveColor="#999"
                    />
                  )}
                />
              </>
            )}
            {modalStep === "chapters" && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity
                    onPress={() => fetchBooks(selectedLanguage)}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>

                  <Text style={styles.sheetTitle}>
                    {tempBook || selectedBook}
                  </Text>

                  <TouchableOpacity
                    style={styles.closeArea}
                    onPress={() => setModalStep(null)}
                    hitSlop={10}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.chapterHeading}>
                  {
                    translations.find(
                      (item) =>
                        item.code === (tempLanguage || selectedLanguage),
                    )?.shortName
                  }{" "}
                  • Select Chapter
                </Text>

                <FlatList
                  data={chapters}
                  keyExtractor={(item) => item.chapter.toString()}
                  numColumns={5}
                  renderItem={({ item: chapter }) => (
                    <TouchableOpacity
                      style={[
                        styles.chapterItem,
                        selectedChapter === chapter.chapter &&
                          styles.selectedChapterItem,
                      ]}
                      onPress={() => fetchVerses(chapter.chapter)}
                    >
                      <Text
                        style={[
                          styles.chapterText,
                          selectedChapter === chapter.chapter &&
                            styles.selectedChapterText,
                        ]}
                      >
                        {chapter.chapter}
                      </Text>

                      <Text
                        style={[
                          styles.verseCountText,
                          selectedChapter === chapter.chapter &&
                            styles.selectedVerseCountText,
                        ]}
                      >
                        {chapter.verseCount} verses
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {modalStep === "verseId" && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity onPress={() => setModalStep(null)}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>

                  <Text style={styles.sheetTitle}>
                    {selectedBook} {selectedChapter}
                  </Text>

                  <TouchableOpacity
                    style={styles.closeArea}
                    onPress={closeModal}
                    hitSlop={10}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.chapterHeading}>Select Verse</Text>

                <FlatList
                  data={Object.keys(verses)}
                  keyExtractor={(item) => item}
                  numColumns={5}
                  renderItem={({ item: verseNumber }) => (
                    <TouchableOpacity
                      style={[
                        styles.verseItem,
                        selectedVerse === verseNumber &&
                          styles.selectedVerseItem,
                      ]}
                      onPress={() => selectVerse(verseNumber)}
                    >
                      <Text
                        style={[
                          styles.verseItemText,
                          selectedVerse === verseNumber &&
                            styles.selectedVerseItemText,
                        ]}
                      >
                        {selectedChapter}.{verseNumber}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {modalStep === "settings" && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity onPress={() => setModalStep(null)}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>

                  <Text style={styles.sheetTitle}>Setting</Text>

                  <TouchableOpacity
                    style={styles.closeArea}
                    onPress={closeModal}
                    hitSlop={10}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.settingTitle}>Font Size</Text>

                  <View style={styles.arrange}>
                    <TouchableOpacity onPress={() => setFontSize("small")}>
                      <Text
                        style={[
                          styles.settingSmallFont,
                          fontSize === "small" && styles.selectedSettingFont,
                        ]}
                      >
                        Small
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFontSize("medium")}>
                      <Text
                        style={[
                          styles.settingMediumFont,
                          fontSize === "medium" && styles.selectedSettingFont,
                        ]}
                      >
                        Medium
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFontSize("large")}>
                      <Text
                        style={[
                          styles.settingLargeFont,
                          fontSize === "large" && styles.selectedSettingFont,
                        ]}
                      >
                        Large
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFontSize("extraLarge")}>
                      <Text
                        style={[
                          styles.settingExtraLargeFont,
                          fontSize === "extraLarge" &&
                            styles.selectedSettingFont,
                        ]}
                      >
                        Extra Large
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View>
                      <Text style={styles.settingTitle}>Line Spacing</Text>

                      <View style={styles.arrange}>
                        <TouchableOpacity
                          onPress={() => setLineSpacing("compact")}
                        >
                          <Text
                            style={[
                              styles.settingFont,
                              lineSpacing === "compact" &&
                                styles.selectedSettingFont,
                            ]}
                          >
                            Compact
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setLineSpacing("normal")}
                        >
                          <Text
                            style={[
                              styles.settingFont,
                              lineSpacing === "normal" &&
                                styles.selectedSettingFont,
                            ]}
                          >
                            Normal
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setLineSpacing("relaxed")}
                        >
                          <Text
                            style={[
                              styles.settingFont,
                              lineSpacing === "relaxed" &&
                                styles.selectedSettingFont,
                            ]}
                          >
                            Relaxed
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setLineSpacing("wide")}
                        >
                          <Text
                            style={[
                              styles.settingFont,
                              lineSpacing === "wide" &&
                                styles.selectedSettingFont,
                            ]}
                          >
                            Wide
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.settingTitle}>Reading Mode</Text>

                    <View style={styles.arrange}>
                      <TouchableOpacity onPress={() => setReadAllVerses(true)}>
                        <Text
                          style={[
                            styles.settingFont,
                            readAllVerses && styles.selectedSettingFont,
                          ]}
                        >
                          Paragraph
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setReadAllVerses(false)}>
                        <Text
                          style={[
                            styles.settingFont,
                            !readAllVerses && styles.selectedSettingFont,
                          ]}
                        >
                          Verse
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {selectedHighlightVerses.length > 0 && (
        <View style={styles.highlightToolbar}>
          {/* Remove Highlight */}
          <TouchableOpacity
            style={styles.removeHighlightButton}
            onPress={removeSelectedHighlights}
          >
            <Ionicons name="close" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          {Object.entries(highlightColors).map(([name, color]) => (
            <TouchableOpacity
              key={name}
              style={[styles.highlightColorButton, { backgroundColor: color }]}
              onPress={() => saveHighlights(name)}
            />
          ))}

          <Pressable style={styles.saveButton} onPress={saveSelectedVerses}>
            <Ionicons
              // name={
              //   isAnySelectedVerseSaved
              //     ? "bookmark"
              //     : "bookmark-outline"
              // }
              name="bookmark"
              size={27}
              color={COLORS.primary}
            />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bible;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //bible
  bibleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 65,
    backgroundColor: "#f9f7fb",
    borderTopWidth: 0,
  },

  //left side
  referenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  bookChapterBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f7fb",
    overflow: "hidden",
  },

  bookSelector: {
    justifyContent: "center",
    paddingHorizontal: 10,
    minWidth: 80,
    maxWidth: 130,
  },

  bookSelectorText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  chapterSelector: {
    height: "100%",
    minWidth: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  referenceDivider: {
    width: 1,
    height: 22,
    backgroundColor: "#ddd",
  },

  referenceText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },

  verseSelector: {
    alignItems: "center",
    // gap: 2,
    // backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    marginHorizontal: 5,
  },

  referenceVerseText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },

  colon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#777",
  },

  //rightside
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 10,
    // height: 40,
  },

  translationSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  translationSelectorText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  settingsSelector: {
    padding: 2,
  },

  // Translation list
  translationItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },

  selectedItem: {
    borderWidth: 2,
  },

  translationName: {
    fontSize: 16,
    fontWeight: "600",
  },

  shortName: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },

  selectedTranslationText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  // Dark transparent area behind bottom sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    marginBottom: 6,
  },

  // Bottom sheet
  bottomSheet: {
    backgroundColor: "#f9f7fb",
    height: "85%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  // Sheet header
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  closeArea: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  testament: {
    flexDirection: "row",
  },
  testamentButton: {
    width: "50%",
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: "#121212",
    borderRadius: 25,
    marginTop: 20,
  },

  // OLD / NEW TESTAMENT title
  testamentTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ddd",
    paddingVertical: 6,
    alignItems: "center",
  },

  // Individual book

  tabBar: {
    backgroundColor: "#f9f7fb",
    elevation: 0,
  },

  indicator: {
    backgroundColor: COLORS.secondary,
    height: 3,
  },

  bookItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  selectedBookItem: {
    color: COLORS.secondary,
  },

  selectedBookText: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },

  bookText: {
    fontSize: 16,
  },

  chapterHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  chapterItem: {
    width: "18%",
    aspectRatio: 1,
    margin: "1%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  chapterText: {
    fontSize: 16,
    fontWeight: "600",
  },

  selectedChapterItem: {
    backgroundColor: COLORS.secondary,
  },

  selectedChapterText: {
    fontWeight: "bold",
    color: "#fff",
  },

  verseCountText: {
    fontSize: 8,
  },

  selectedVerseCountText: {
    color: "#fff",
  },

  openTranslationButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },

  openTranslationText: {
    fontSize: 12,
    fontWeight: "600",
  },

  versesContainer: {
    marginTop: 10,
  },

  chapterReference: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  verseNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    marginTop: 4,
    color: COLORS.secondary,
  },

  textt: {
    color: "#332A4C",
    // fontWeight: "500",
  },

  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 50,
    paddingHorizontal: 30,
    // fontWeight: "500",
  },

  verseItem: {
    // flex: 1,
    margin: "1%",
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    alignItems: "center",
    borderWidth: 1,
    width: "18%",
    justifyContent: "center",
    aspectRatio: 1,
  },

  selectedVerseItem: {
    backgroundColor: COLORS.secondary,
  },

  verseItemText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  selectedVerseItemText: {
    color: "#FFF",
  },

  //vERSE
  selectedVerseBox: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  verseReference: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 12,
  },

  selectedVerseText: {
    fontSize: 17,
    lineHeight: 28,
    color: "#222",
    marginBottom: 20,
  },

  readAllButton: {
    height: 48,
    borderRadius: 14,
  },

  readAllButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.secondary,
    textAlign: "left",
    marginBottom: 12,
  },

  navigationButtons: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 120 : 20,
    left: 10,
    right: 10,

    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 15,
  },

  disabledNavigationButton: {
    opacity: 0.3,
  },

  navigationButton: {
    width: 45,
    height: 55,
    borderRadius: 25,

    alignItems: "center",
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: COLORS.primary,

    // elevation: 3,

    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
  },

  //verse
  navigationVerseButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    gap: 80,
    marginHorizontal: 10,
  },

  previousIcon: {
    marginRight: 7,
    alignItems: "center",
  },

  nextIcon: {
    marginLeft: 7,
    alignItems: "center",
  },

  settingFont: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 14,
    // margin:10,
  },

  settingSmallFont: {
    fontSize: 16,
  },

  settingMediumFont: {
    fontSize: 18,
  },

  settingLargeFont: {
    fontSize: 21,
  },

  settingExtraLargeFont: {
    fontSize: 24,
  },

  arrange: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    // paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  settingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },

  selectedSettingFont: {
    fontWeight: "bold",
    color: COLORS.primary,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },

  highlightToolbar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 90 : 4,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  highlightColorButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  saveButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  removeHighlightButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
