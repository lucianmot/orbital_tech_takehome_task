import re


def calculate_credits(text: str) -> float:
    credits = 1.0
    credits += char_cost(text)
    credits += word_cost(text)
    credits += third_vowel_cost(text)
    credits += length_penalty(text)
    credits = unique_word_bonus(text, credits)
    credits = palindrome_bonus(text, credits)
    return round(credits, 2)


def char_cost(text: str) -> float:
    return 0.05 * len(text)


def word_cost(text: str) -> float:
    words = re.findall(r"[A-Za-z'-]+", text)
    total = 0.0
    for word in words:
        length = len(word)
        if 1 <= length <= 3:
            total += 0.1
        elif 4 <= length <= 7:
            total += 0.2
        elif length >= 8:
            total += 0.3
    return total


def third_vowel_cost(text: str) -> float:
    vowels = set("aeiouAEIOU")
    words = re.findall(r"[A-Za-z'-]+", text)
    count = 0
    for word in words:
        for i in range(2, len(word), 3):
            if word[i] in vowels:
                count += 1
    return 0.3 * count


def length_penalty(text: str) -> float:
    return 5.0 if len(text) > 100 else 0.0


def unique_word_bonus(text: str, credits: float) -> float:
    words = re.findall(r"[A-Za-z'-]+", text)
    if words and len(set(words)) == len(words):
        return max(1.0, credits - 2)
    return credits


def palindrome_bonus(text: str, credits: float) -> float:
    filtered = "".join(ch.lower() for ch in text if ch.isalnum())
    if filtered and filtered == filtered[::-1]:
        return credits * 2
    return credits
