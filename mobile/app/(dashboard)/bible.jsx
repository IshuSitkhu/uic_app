import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ScrollView, ScrollViewComponent,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import API_URL from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { TabView, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
  const [selectedLanguage, setSelectedLanguage] = useState('nasb');
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);

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
  
  const [index, setIndex] = useState(0);

  const [readAllVerses, setReadAllVerses] = useState(true);

  const [routes] = useState([
    { key: "old", title: "Old Testament" },
    { key: "new", title: "New Testament" },
  ]);


  const renderScene = ({ route }) => {
    switch (route.key) {
      case "old":
        return (
          <ScrollView>
            {books.oldTestament.map((book) => (
              <TouchableOpacity
                key={book}
                style={styles.bookItem}
                onPress={() => fetchChapters(book)}
              >
                <Text style={styles.bookText}>
                  {book}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      case "new":
        return (
          <ScrollView>
            {books.newTestament.map((book) => (
              <TouchableOpacity
                key={book}
                style={styles.bookItem}
                onPress={() => fetchChapters(book)}
              >
                <Text style={styles.bookText}>
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
    setVerseText('');
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

      const currentVerse = String(selectedVerse);

      if (selectedVerse && data.verses[currentVerse]) {
        // Same verse number exists in the new chapter
        setSelectedVerse(currentVerse);
        setVerseText(data.verses[currentVerse]);
        setReadAllVerses(false);
      } else {
        // No selected verse, or that verse doesn't exist
        setSelectedVerse(null);
        setVerseText('');
        setReadAllVerses(true);
      }

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
      const url = `${API_URL}/bible/nasb/Genesis/1`;

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
      setVerses(data.verses);

       // No individual verse selected initially
      setSelectedVerse(null);
      setVerseText('');
      setReadAllVerses(true);

    } catch (error) {
      console.error('Error fetching default verse:', error.message);
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
        // Apply new language and book
        setSelectedLanguage(language);
        setSelectedBook(newSelectedBook);
        setVerses(data.verses);

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
          setVerseText('');
          setReadAllVerses(true);
        }

        setModalStep(null);

      } catch (error) {
        console.error('Error changing language:', error.message);
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
    (item) => String(item.chapter) === String(selectedChapter)
  );

  if (currentIndex > 0) {
    const previousChapter = chapters[currentIndex - 1].chapter;

    await fetchVerses(previousChapter);
  }
};

const goToNextChapter = async () => {
  const currentIndex = chapters.findIndex(
    (item) => String(item.chapter) === String(selectedChapter)
  );

  if (currentIndex < chapters.length - 1) {
    const nextChapter = chapters[currentIndex + 1].chapter;

    await fetchVerses(nextChapter);
  }
};

return (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection:"row", gap:10,}}>

      <TouchableOpacity style={styles.openTranslationButton}  onPress={() => setModalStep('translation')} >
        <Text style={styles.openTranslationText}>
          {selectedLanguage
            ? translations.find(
                (item) => item.code === selectedLanguage
              )?.shortName
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

      {selectedChapter && (
        <TouchableOpacity
          style={styles.openTranslationButton}
          onPress={() => setModalStep('verseId')}
        >
          <Text style={styles.openTranslationText}>
            {selectedVerse
              ? `Verse: ${selectedChapter}.${selectedVerse}`
              : 'Select Verse'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
    <View style={styles.versesContainer}>
      {/* {selectedVerse && (
        <View style={styles.selectedVerseBox}>
              <Text style={styles.verseReference}>
                {selectedBook} {selectedChapter}:{selectedVerse}
              </Text>
        
              <Text style={styles.selectedVerseText}>
                {verseText}
              </Text>
        
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={goToPreviousVerse} disabled={selectedVerse === '1'} >
                  <MaterialIcons name="navigate-before" size={24} color="black" />
                
                </TouchableOpacity>
        
                <TouchableOpacity onPress={goToNextVerse} disabled={
                    selectedVerse === String(Object.keys(verses).length)
                  }>
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                 
                </TouchableOpacity>
              </View>
        </View>
      )} */}

      {selectedVerse && !readAllVerses ? (
        <>
          {/* Selected verse */}
          <View style={styles.selectedVerseBox}>
            <Text style={styles.verseReference}>
              {selectedBook} {selectedChapter}:{selectedVerse}
            </Text>

            <Text style={styles.selectedVerseText}>
              {verseText}
            </Text>

            <TouchableOpacity style={styles.readAllButton} onPress={readAllChapter}>
              <Text style={styles.readAllButtonText}>
                Read All Chapter...
              </Text>
          </TouchableOpacity>
          

            {/* Previous / Next Verse */}
            <View style={styles.navigationButtons}>
                  <TouchableOpacity 
                    style={[
                      styles.navigationButton,
                      selectedVerse === '1' && styles.disabledNavigationButton,
                    ]}  
                    onPress={goToPreviousVerse} disabled={selectedVerse === '1'} >
                  <MaterialIcons name="navigate-before" size={18} color="black" style={styles.previousIcon} />
                  {/* <Text> Previous</Text> */}
                  </TouchableOpacity>
          
                  <TouchableOpacity 
                    style={[
                      styles.navigationButton,
                      selectedVerse === String(Object.keys(verses).length) &&
                        styles.disabledNavigationButton,
                    ]}  
                    onPress={goToNextVerse} disabled={
                      selectedVerse === String(Object.keys(verses).length)
                  }>
                  <MaterialIcons name="navigate-next" size={18} color="black"  style={styles.nextIcon} />
                  {/* <Text>Next </Text> */}
                  </TouchableOpacity>
              </View>
          </View>
          
        </>
      ) : (
        <>
          <ScrollView>

            <Text style={styles.verseText}>

              {Object.entries(verses).map(
                ([verseNumber, text]) => (

                  <React.Fragment key={verseNumber}>

                    <Text style={styles.verseNumber}>
                      {verseNumber}{' '}
                    </Text>

                    {text}{' '}

                  </React.Fragment>

                )
              )}

            </Text>

            {Object.keys(verses).length > 0 && (
            <View style={styles.navigationButtons}>

              
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={goToPreviousChapter}
                disabled={
                  chapters.length === 0 ||
                  String(selectedChapter) ===
                    String(chapters[0]?.chapter)
                }
              >
                <MaterialIcons
                  name="navigate-before"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>


              
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={goToNextChapter}
                disabled={
                  chapters.length === 0 ||
                  String(selectedChapter) ===
                    String(
                      chapters[chapters.length - 1]?.chapter
                    )
                }
              >
                <MaterialIcons
                  name="navigate-next"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

            </View>
             )}

             

          </ScrollView>
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

              {/* <ScrollView>
                <View style={styles.testament}>
                  <View style={styles.testamentButton}>
                    <Text style={styles.testamentTitle}>
                      <Ionicons  name="add-outline" size={24} color="#AC0A0A" />
                      {' '}OLD TESTAMENT
                    </Text>
                  </View>
                  <View style={styles.testamentButton}>
                    <Text style={styles.testamentTitle}>
                      <Ionicons name="add-outline" size={24} color="#AC0A0A" />
                      {' '}NEW TESTAMENT
                    </Text>
                  </View>
                  
                </View>
                

                {books.oldTestament.map((book) => (
                  <TouchableOpacity key={book} style={styles.bookItem} onPress={() => fetchChapters(book)} >
                    <Text style={styles.bookText}>
                      {book}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.testamentTitle}>
                  <Ionicons name="add-outline" size={24} color="#ddd" />
                  {' '}NEW TESTAMENT
                </Text>

                {books.newTestament.map((book) => (
                  <TouchableOpacity key={book} style={styles.bookItem} onPress={() => fetchChapters(book)} >
                    <Text style={styles.bookText}>
                      {book}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView> */}

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
                    activeColor="#AC0A0A"
                    inactiveColor="#999"
                  />
                )}
              />
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

          {modalStep === 'verseId'  && (
              <>
                <View style={styles.sheetHeader}>
                  <TouchableOpacity onPress={() => setModalStep(null)} >
                    <Ionicons name="arrow-back-outline" size={24} color="#000" />
                  </TouchableOpacity>
            
                  <Text style={styles.sheetTitle}>
                    {selectedBook} {selectedChapter}
                  </Text>
            
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>
            
                <Text style={styles.chapterHeading}>
                  Select Verse
                </Text>
            
                <FlatList
                  data={Object.keys(verses)}
                  keyExtractor={(item) => item}
                  numColumns={4}
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
    marginBottom:6,
  },

  // Bottom sheet
  bottomSheet: {
    backgroundColor: '#fff',
    height: '80%',
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

  testament:{
    flexDirection:"row",
    
    
  },
  testamentButton:{
    width:'50%',
    backgroundColor:"#AC0A0A",
    borderWidth: 1,
    borderColor: '#121212',
     borderRadius:25,
     marginTop:20,
  },

  // OLD / NEW TESTAMENT title
  testamentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color:"#ddd",
    paddingVertical:6,
    alignItems: 'center',
    
  },

  // Individual book


    tabBar: {
      backgroundColor: "#fff",
      elevation: 0,
    },

    indicator: {
      backgroundColor: "#AC0A0A",
      height: 3,
    },

    bookItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
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

  verseCountText:{
      fontSize: 12,
  },

  openTranslationButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  openTranslationText: {
    fontSize: 12,
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

  verseItem: {
    flex: 1,
    margin: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#e1dfdf',
    alignItems: 'center',
  },

  selectedVerseItem: {
    backgroundColor: '#AC0A0A',
  },

  verseItemText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
  },

  selectedVerseItemText: {
    color: '#FFF',
  },

  //vERSE
  selectedVerseBox:{
    marginHorizontal:16,
    marginTop:12,
    padding:18,
    backgroundColor: '#FFFFFF',
    borderRadius:18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    

  },

  verseReference:{
    fontSize:18,
    fontWeight:'700',
    color: '#AC0A0A',
    textAlign: 'center',
    marginBottom: 12,
  },

  selectedVerseText:{
    fontSize: 17,
    lineHeight: 28,
    color: '#222',
    marginBottom: 20,
  },

  readAllButton:{
    height: 48,
    borderRadius: 14,

  },

  readAllButtonText:{
    fontSize:18,
    fontWeight:'700',
    color: '#AC0A0A',
    textAlign: 'left',
    marginBottom: 12,
  },

  
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 80,
    marginHorizontal:10,
    
  },

  disabledNavigationButton: {
    opacity: 0.3,
  },

  navigationButton: {

    flex: 1,
    height: 48,
    borderRadius: 14,
    // backgroundColor: '#F7F7F7',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#E8E8E8',
  },


  previousIcon: {
    marginRight: 7,
  },

  nextIcon: {
    marginLeft: 7,
  },



});