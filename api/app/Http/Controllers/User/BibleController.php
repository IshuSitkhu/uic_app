<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BibleController extends Controller
{
    public function getAllBooks($language)
    {
        $filepath = match ($language) {
            'np'   => 'ne_ulb.json',
            'kjv'  => 'AKJV_bible.json',
            'asv'  => 'ASV_bible.json',
            'esv'  => 'ESV_bible.json',
            'nasb' => 'NASB_bible.json',
            'niv'  => 'NIV_bible.json',
            'nkjv' => 'NKJV_bible.json',
            'nlt'  => 'NLT_bible.json',
            default => 'AKJV_bible.json',
        };

        $path = public_path('bible/json/' . $filepath);

        if (!file_exists($path)) {
            return response()->json([
                'error' => 'JSON file not found'
            ], 404);
        }

        $bible = Cache::remember('bible_' . $language, 3600, function () use ($path) {

            $data = json_decode(file_get_contents($path), true);

            if (isset($data['verses'])) {
                $nested = [];

                foreach ($data['verses'] as $v) {
                    $book = $v['book_name'];
                    $chapter = (string) $v['chapter'];
                    $verse = (string) $v['verse'];

                    $nested[$book][$chapter][$verse] = $v['text'];
                }

                return $nested;
            }

            return $data;
        });

        /*
        |--------------------------------------------------------------------------
        | Get all books
        |--------------------------------------------------------------------------
        */

        $books = array_keys($bible);


        /*
        |--------------------------------------------------------------------------
        | Old Testament / New Testament
        |--------------------------------------------------------------------------
        |
        | The order of books in your JSON already follows the Bible order.
        | First 39 books = Old Testament
        | Remaining 27 books = New Testament
        |
        */

        $oldTestament = array_slice($books, 0, 39);
        $newTestament = array_slice($books, 39);

        return response()->json([
            'oldTestament' => $oldTestament,
            'newTestament' => $newTestament,
        ]);
    }
    public function getVerse($language, $book, $chapter, $verse)
{
    $filepath = match ($language) {
        'np' => 'ne_ulb.json',
        'kjv' => 'AKJV_bible.json',
        'asv' => 'ASV_bible.json',
        'esv' => 'ESV_bible.json',
        'nasb' => 'NASB_bible.json',
        'niv' => 'NIV_bible.json',
        'nkjv' => 'NKJV_bible.json',
        'nlt' => 'NLT_bible.json',
        default => 'AKJV_bible.json',
    };

    $path = public_path('bible/json/' . $filepath);
    if (!file_exists($path)) {
        return response()->json(['error' => 'JSON file not found']);
    }

    $bible = Cache::remember('bible_' . $language, 3600, function () use ($path) {
        $data = json_decode(file_get_contents($path), true);
        // Convert flat structure if needed
        if (isset($data['verses'])) {
            $nested = [];
            foreach ($data['verses'] as $v) {
                $book = $v['book_name'];
                $chapter = (string)$v['chapter'];
                $verse = (string)$v['verse'];
                $nested[$book][$chapter][$verse] = $v['text'];
            }
            return $nested;
        }
        return $data;
    });

    $book = ucwords(strtolower($book));
    $chapter = (string)(int)$chapter;
    $verse = (string)(int)$verse;

    if (isset($bible[$book][$chapter][$verse])) {
        return response()->json([
            'book' => $book,
            'chapter' => (int)$chapter,
            'verse' => (int)$verse,
            'text' => $bible[$book][$chapter][$verse]
        ]);
    }

    return response()->json(['error' => 'Verse not found'], 404);
}


public function getChapter($language, $book, $chapter)
{
    $filepath = match ($language) {
        'np' => 'ne_ulb.json',
        'kjv' => 'AKJV_bible.json',
        'asv' => 'ASV_bible.json',
        'esv' => 'ESV_bible.json',
        'nasb' => 'NASB_bible.json',
        'niv' => 'NIV_bible.json',
        'nkjv' => 'NKJV_bible.json',
        'nlt' => 'NLT_bible.json',
        default => 'AKJV_bible.json',
    };

    $path = public_path('bible/json/' . $filepath);
    if (!file_exists($path)) {
        return response()->json(['error' => 'JSON file not found']);
    }

    $bible = Cache::remember('bible_' . $language, 3600, function () use ($path) {
        $data = json_decode(file_get_contents($path), true);
        if (isset($data['verses'])) {
            $nested = [];
            foreach ($data['verses'] as $v) {
                $book = $v['book_name'];
                $chapter = (string)$v['chapter'];
                $verse = (string)$v['verse'];
                $nested[$book][$chapter][$verse] = $v['text'];
            }
            return $nested;
        }
        return $data;
    });

    $book = ucwords(strtolower($book));
    $chapter = (string)(int)$chapter;

    if (isset($bible[$book][$chapter])) {
        return response()->json([
            'book' => $book,
            'chapter' => (int)$chapter,
            'verses' => $bible[$book][$chapter]
        ]);
    }

    // Flat format support
    if (isset($bible[0]) && is_array($bible[0]) && isset($bible[0]['book_name'])) {
        $verses = [];
        foreach ($bible as $entry) {
            if (
                strtolower($entry['book_name']) === strtolower($book) &&
                (int)$entry['chapter'] === (int)$chapter
            ) {
                $verses[(int)$entry['verse']] = $entry['text'];
            }
        }
        if (!empty($verses)) {
            ksort($verses);
            return response()->json([
                'book' => $book,
                'chapter' => (int)$chapter,
                'verses' => $verses
            ]);
        }
    }

    return response()->json(['error' => 'Chapter not found'], 404);
}

public function getBook($language, $book)
{
    $filepath = match ($language) {
        'np'   => 'ne_ulb.json',
        'kjv'  => 'AKJV_bible.json',
        'asv'  => 'ASV_bible.json',
        'esv'  => 'ESV_bible.json',
        'nasb' => 'NASB_bible.json',
        'niv'  => 'NIV_bible.json',
        'nkjv' => 'NKJV_bible.json',
        'nlt'  => 'NLT_bible.json',
        default => 'AKJV_bible.json',
    };

    $path = public_path('bible/json/' . $filepath);

    if (!file_exists($path)) {
        return response()->json([
            'error' => 'JSON file not found'
        ], 404);
    }

    $bible = Cache::remember('bible_' . $language, 3600, function () use ($path) {

        $data = json_decode(file_get_contents($path), true);

        if (isset($data['verses'])) {

            $nested = [];

            foreach ($data['verses'] as $v) {

                $book = $v['book_name'];
                $chapter = (string) $v['chapter'];
                $verse = (string) $v['verse'];

                $nested[$book][$chapter][$verse] = $v['text'];
            }

            return $nested;
        }

        return $data;
    });

    $book = ucwords(strtolower($book));

    /*
    |--------------------------------------------------------------------------
    | Nested format
    |--------------------------------------------------------------------------
    */

    if (isset($bible[$book])) {

        $chapters = [];

        foreach ($bible[$book] as $chapter => $verses) {

            $chapters[] = [
                'chapter' => (int) $chapter,
                'verseCount' => count($verses),
            ];
        }

        return response()->json([
            'book' => $book,
            'chapters' => $chapters
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Flat format
    |--------------------------------------------------------------------------
    */

    if (isset($bible[0]) && isset($bible[0]['book_name'])) {

        $chapters = [];

        foreach ($bible as $entry) {

            if (
                strtolower($entry['book_name']) === strtolower($book)
            ) {

                $chapter = (int) $entry['chapter'];

                $chapters[$chapter] = true;
            }
        }

        if (!empty($chapters)) {

            $result = [];

            foreach (array_keys($chapters) as $chapter) {

                $verseCount = 0;

                foreach ($bible as $entry) {

                    if (
                        strtolower($entry['book_name']) === strtolower($book) &&
                        (int) $entry['chapter'] === $chapter
                    ) {
                        $verseCount++;
                    }
                }

                $result[] = [
                    'chapter' => $chapter,
                    'verseCount' => $verseCount,
                ];
            }

            return response()->json([
                'book' => $book,
                'chapters' => $result
            ]);
        }
    }

    return response()->json([
        'error' => 'Book not found'
    ], 404);
}
}
