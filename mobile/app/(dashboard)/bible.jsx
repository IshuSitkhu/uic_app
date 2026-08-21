import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ScrollView, ScrollViewComponent,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import API_URL from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

const translations = [
  { code: 'kjv', name: 'King James Version', shortName: 'KJV' },
  { code: 'asv', name: 'American Standard Version', shortName: 'ASV' },
  { code: 'esv', name: 'English Standard Version', shortName: 'ESV' },
  { code: 'nasb', name: 'New American Standard Bible', shortName: 'NASB' },
  { code: 'niv', name: 'New International Version', shortName: 'NIV' },
  { code: 'nkjv', name: 'New King James Version', shortName: 'NKJV' },
  { code: 'nlt', name: 'New Living Translation', shortName: 'NLT' },
  { code: 'np', name: 'Nepali Version', shortName: 'NP' },
];

const bookMap = {
    // English → Nepali (matching your given list)
    "Genesis": "उत्पत्ति",
    "Exodus": "प्रस्थान",
    "Leviticus": "लेवीहरू",
    "Numbers": "गन्ती",
    "Deuteronomy": "व्यवस्था",
    "Joshua": "यहोशू",
    "Judges": "न्यायकर्ताहरू",
    "Ruth": "रूथ",
    "1 Samuel": "१ शमूएल",
    "2 Samuel": "२ शमूएल",
    "1 Kings": "१ राजाहरू",
    "2 Kings": "२ राजाहरू",
    "1 Chronicles": "१ इतिहास",
    "2 Chronicles": "२ इतिहास",
    "Ezra": "एज्रा",
    "Nehemiah": "नहेम्याह",
    "Esther": "एस्तर",
    "Job": "अय्यूब",
    "Psalms": "भजनसंग्रह",
    "Proverbs": "हितोपदेश",
    "Ecclesiastes": "उपदेशक",
    "Song of Solomon": "श्रेष्‍ठगीत",
    "Isaiah": "यशैया",
    "Jeremiah": "यर्मिया",
    "Lamentations": "विलाप",
    "Ezekiel": "इजकिएल",
    "Daniel": "दानिएल",
    "Hosea": "होशे",
    "Joel": "योएल",
    "Amos": "आमोस",
    "Obadiah": "ओबदिया",
    "Jonah": "योना",
    "Micah": "मिका",
    "Nahum": "नहूम",
    "Habakkuk": "हबकूक",
    "Zephaniah": "सपन्याह",
    "Haggai": "हाग्‍गै",
    "Zechariah": "जकरिया",
    "Malachi": "मलाकी",
    "Matthew": "मत्ती",
    "Mark": "मर्कूस",
    "Luke": "लुका",
    "John": "यूहन्‍ना",
    "Acts": "प्रेरित",
    "Romans": "रोमी",
    "1 Corinthians": "१ कोरिन्थी",
    "2 Corinthians": "२ कोरिन्थी",
    "Galatians": "गलाती",
    "Ephesians": "एफिसि",
    "Philippians": "फिलिप्पी",
    "Colossians": "कलस्सी",
    "1 Thessalonians": "१ थेसलोनिकी",
    "2 Thessalonians": "२ थेसलोनिकी",
    "1 Timothy": "१ तिमोथी",
    "2 Timothy": "२ तिमोथी",
    "Titus": "तीतस",
    "Philemon": "फिलेमोन",
    "Hebrews": "हिब्रू",
    "James": "याकूब",
    "1 Peter": "१ पत्रुस",
    "2 Peter": "२ पत्रुस",
    "1 John": "१ यूहन्‍ना",
    "2 John": "२ यूहन्‍ना",
    "3 John": "३ यूहन्‍ना",
    "Jude": "यहूदा",
    "Revelation": "प्रकाश",
};

const bookMapReverse = Object.fromEntries(
  Object.entries(bookMap).map(([eng, nep]) => [nep, eng])
);

const Bible = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [tempLanguage, setTempLanguage] = useState(null);
  const [tempBook, setTempBook] = useState(null);

  const [selectedVerse, setSelectedVerse] = useState(null);
  const [verseText, setVerseText] = useState('');

  const [books, setBooks] = useState({
    oldTestament: [],
    newTestament: [],
  });
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState({});
  
  const [modalStep, setModalStep] = useState(null);
  const [showTranslationSheet, setShowTranslationSheet ] = useState(false);
  
  const fetchBooks = async (language) => {
    try {
      const url = `${API_URL}/bible/books/${language}`;

      console.log('Fetching:', url);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch books');
      }

      setBooks(data);

      // Move to the books screen inside the same modal
      setModalStep('books');

    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const fetchChapters = async (book) => {
    try {
      const languageToUse = tempLanguage || selectedLanguage;
       

      const url = `${API_URL}/bible/${languageToUse}/${encodeURIComponent(book)}`;

      console.log('Fetching chapters:', url);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      console.log('Chapter response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch chapters');
      }

      // TEMPORARY only
      setTempBook(data.book);
      setChapters(data.chapters);

      // Same modal changes from Books → Chapters
      setModalStep('chapters');

    } catch (error) {
      console.error('Error fetching chapters:', error.message);
    }
  };

  const fetchVerses = async (chapter) => {
    try {
      const languageToUse = tempLanguage || selectedLanguage;
      const bookToUse = tempBook || selectedBook;

      const url =
        `${API_URL}/bible/${languageToUse}/` +
        `${encodeURIComponent(bookToUse)}/${chapter}`;

      console.log('Fetching verses:', url);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      console.log('Verse response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch verses');
      }

      // NOW officially apply everything
      setSelectedLanguage(languageToUse);
      setSelectedBook(bookToUse);
      setSelectedChapter(chapter);

      setVerses(data.verses);

      // Clear temporary selections
      setTempLanguage(null);
      setTempBook(null);

      // Close modal
      setModalStep(null);

    } catch (error) {
      console.error('Error fetching verses:', error.message);
    }
  };

  const fetchDefaultVerse = async () => {
    try {
      const url = `${API_URL}/bible/nasb/Jeremiah/29/11`;

      console.log('Fetching default verse:', url);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      console.log('Default verse:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch default verse');
      }

      setSelectedLanguage('nasb');
      setSelectedBook(data.book);
      setSelectedChapter(data.chapter);
      setSelectedVerse(data.verse);
      setVerseText(data.text);

    } catch (error) {
      console.error('Error fetching default verse:', error.message);
    }
  };

  // useEffect(() => {
  //   fetchDefaultVerse();
  //   // fetchBooks('nasb');
  // }, []);

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

        if (language === 'np' && bookMap[selectedBook]) {
          newSelectedBook = bookMap[selectedBook];
        } else if (language !== 'np' && bookMapReverse[selectedBook]) {
          newSelectedBook = bookMapReverse[selectedBook];
        }
        console.log("After:", newSelectedBook);

        setSelectedBook(newSelectedBook);

        const url = `${API_URL}/bible/${language}/${encodeURIComponent(
          newSelectedBook
        )}/${selectedChapter}`

        console.log('Changing language, fetching:', url);

        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch verses');
        }

        // Only apply the new language after successful fetch
        setSelectedLanguage(language);
        setVerses(data.verses);

        setModalStep(null);

      } catch (error) {
        console.error('Error changing language:', error.message);
      }

      return;
    }

    // No complete book/chapter selection yet
    fetchBooks(language);
  };

return (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection:"row", gap:10,}}>

      <TouchableOpacity style={styles.openTranslationButton}  onPress={() => setModalStep('translation')} >
        <Text style={styles.openTranslationText}>
          {selectedLanguage
            ? translations.find(
                (item) => item.code === selectedLanguage
              )?.name
            : 'Select Translation'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.openTranslationButton}  onPress={() => setModalStep('books')} >
        <Text style={styles.openTranslationText}>
          {selectedChapter ? selectedBook : 'Select Book'}
        </Text>
      </TouchableOpacity>

      {selectedBook && (
        <TouchableOpacity style={styles.openTranslationButton}  
          onPress={() => {
            if (selectedBook) {
              fetchChapters(selectedBook);
            }
          }} 
        >
          <Text style={styles.openTranslationText}>
            {selectedChapter ? `Chapter: ${selectedChapter}` : 'Select Chapter'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
    <View style={styles.versesContainer}>

      <Text style={styles.verseReference}>
        {selectedBook} {selectedChapter}:{selectedVerse}
      </Text>

      <Text style={styles.verseText}>
        {verseText}
      </Text>
      <ScrollView>
        <Text style={styles.verseText}>
          {Object.entries(verses).map(([verseNumber, text]) => (
            <React.Fragment key={verseNumber}>
              <Text style={styles.verseNumber}>
                {verseNumber}{' '}
              </Text>
              {text}{' '}
            </React.Fragment>
          ))}
        </Text>
      </ScrollView>
    </View>

    {/* <Modal
          visible={showTranslationSheet}
          transparent
          animationType="slide"
          onRequestClose={() => setShowTranslationSheet(false)}
        >
          <View style={styles.modalOverlay}>
    
            <View style={styles.bottomSheet}>
    
              <View style={styles.sheetHeader}>
                  <Text style={styles.heading}>
                      Select Translation
                  </Text>

                  <TouchableOpacity onPress={() => setModalStep(null)} >
                  <Text style={styles.closeText}>
                      ✕
                  </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                    data={translations}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[ styles.translationItem, selectedLanguage === item.code && styles.selectedItem,]}
                        onPress={() => handleLanguagePress(item.code)}
                    >
                        <Text style={styles.translationName}>
                        {item.name}
                        </Text>

                        <Text style={styles.shortName}>
                        {item.shortName}
                        </Text>
                    </TouchableOpacity>
                    )}
                />

    
            </View>
    
          </View>
    </Modal> */}

    <Modal
      visible={modalStep !== null}
      transparent
      animationType="slide"
      onRequestClose={() => setModalStep(null)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>

          {modalStep === 'translation' && (
            <>
              <View style={styles.sheetHeader}>
                <Text style={styles.heading}>
                  Select Translation
                </Text>

                <TouchableOpacity onPress={closeModal}>
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
                    <Text style={styles.translationName}>
                      {item.name}
                    </Text>

                    <Text style={styles.shortName}>
                      {item.shortName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
          {modalStep === 'books' && (
            <>
              <View style={styles.sheetHeader}>
                <TouchableOpacity onPress={() => setModalStep('translation')}>
                  <Ionicons name="arrow-back-outline" size={24} color="#000"/>
                </TouchableOpacity>

                <Text style={styles.sheetTitle}>
                   {translations.find(item => item.code === (tempLanguage || selectedLanguage))?.shortName} Bible Books
                </Text>

                <TouchableOpacity onPress={() => setModalStep(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView>
                <Text style={styles.testamentTitle}>
                  <Ionicons  name="add-outline" size={24} color="#AC0A0A" />
                  {' '}OLD TESTAMENT
                </Text>

                {books.oldTestament.map((book) => (
                  <TouchableOpacity key={book} style={styles.bookItem} onPress={() => fetchChapters(book)} >
                    <Text style={styles.bookText}>
                      {book}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.testamentTitle}>
                  <Ionicons name="add-outline" size={24} color="#AC0A0A" />
                  {' '}NEW TESTAMENT
                </Text>

                {books.newTestament.map((book) => (
                  <TouchableOpacity key={book} style={styles.bookItem} onPress={() => fetchChapters(book)} >
                    <Text style={styles.bookText}>
                      {book}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
          {modalStep === 'chapters' && (
            <>
              <View style={styles.sheetHeader}>

                <TouchableOpacity onPress={() => setModalStep('books')} >
                  <Ionicons name="arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.sheetTitle}>
                  {tempBook || selectedBook}
                </Text>

                <TouchableOpacity onPress={() => setModalStep(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

              </View>

              <Text style={styles.chapterHeading}>
                {translations.find(item => item.code === (tempLanguage || selectedLanguage))?.shortName} • Select Chapter
              </Text>

              <FlatList
                data={chapters}
                keyExtractor={(item) => item.chapter.toString()}
                numColumns={5}
                renderItem={({ item: chapter }) => (
                  <TouchableOpacity style={styles.chapterItem} onPress={() => fetchVerses(chapter.chapter)}
                  >
                    <Text style={styles.chapterText}>
                      {chapter.chapter}
                    </Text>

                    <Text style={styles.verseCountText}>
                      {chapter.verseCount} verses
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </View>
      </View>
    </Modal>

  </SafeAreaView>
);
};

export default Bible;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // Translation list
  translationItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    
  },

  selectedItem: {
    borderWidth: 2,
  },

  translationName: {
    fontSize: 16,
    fontWeight: '600',
  },

  shortName: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },

  // Dark transparent area behind bottom sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  // Bottom sheet
  bottomSheet: {
    backgroundColor: '#fff',
    height: '85%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  // Sheet header
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  // OLD / NEW TESTAMENT title
  testamentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color:"#AC0A0A",
  },

  // Individual book
  bookItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  bookText: {
    fontSize: 16,
  },

  chapterHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },

  chapterItem: {
    width: '18%',
    aspectRatio: 1,
    margin: '1%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chapterText: {
    fontSize: 16,
    fontWeight: '600',
  },

  openTranslationButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  openTranslationText: {
    fontSize: 16,
    fontWeight: '600',
  },

  versesContainer: {
    marginTop: 25,
  },

  chapterReference: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  verseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 4,
  },

  verseText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 30,
  },

});