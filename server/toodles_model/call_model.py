import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import copy
import time

class Toodles:
    def __init__(self, model_path="Parcurcik/toodles_essays"):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_path)
        self.model = GPT2LMHeadModel.from_pretrained(model_path)
        self.model.to("cpu")
        self.bad_word_ids = [
            [203],  # \n
            [225],  # weird space 1
            [28664],  # weird space 2
            [13298],  # weird space 3
            [206],  # \r
            [49120],  # html
            [25872],  # http
            [3886],  # amp
            [38512],  # nbsp
            [10],  # &
            [5436],  # & (another)
            [5861],  # http
            [372],  # yet another line break
            [421, 4395],  # МСК
            [64],  # \
            [33077],  # https
            [1572],  # ru
            [11101],  # Источник
            # Нецензурная брань
            [296, 2666],
            [983, 2666],
            [24245, 3486],
            [983, 379, 3486],
            [3910, 295],
            [1916, 7662],
            [293, 511, 347, 11142],
            [672, 511, 347, 11142],
            [263, 29977],
            [992, 29977],
            [1508, 343],
            [563, 4474],
            [1916, 3345, 1018],
            [2070, 292, 1018],
            [2796, 465],
            [30573, 333],
            [780, 446, 333],
            [293, 511, 21844],
            [672, 511, 21844],
            [3693, 263, 818, 357],
            [431, 263, 818, 357],
            [2176, 3778, 300],
            [324, 3778, 300],
            [293, 578, 350],
            [672, 578, 350],
            [293, 578, 269],
            [672, 578, 269],
            [3910, 295, 465],
            [1916, 7662, 465],
            [3778, 1822],
            [992, 296, 1822],
            [1282, 292, 3306],
            [789, 2244, 3306],
            [672, 8283, 630, 33681]
        ]
        self.punctuations = [',', '.', '!', '?']

    def gen_fragment(self, context, bad_word_ids=None, print_debug_output=False, temperature=1.0, max_length=75,
                     min_length=50):
        if bad_word_ids is None:
            bad_word_ids = self.bad_word_ids
        input_ids = self.tokenizer.encode(context, add_special_tokens=False, return_tensors="pt").to("cpu")
        input_ids = input_ids[:, -1700:]
        input_size = input_ids.size(1)
        output_sequences = self.model.generate(
            input_ids=input_ids,
            max_length=max_length + input_size,
            min_length=min_length + input_size,
            top_p=0.95,
            do_sample=True,
            num_return_sequences=1,
            temperature=1.0,
            pad_token_id=0,
            eos_token_id=2,
            bad_words_ids=bad_word_ids,
            no_repeat_ngram_size=6
        )
        if len(output_sequences.shape) > 2:
            output_sequences.squeeze_()
        generated_sequence = output_sequences[0].tolist()[input_size:]
        if print_debug_output:
            for idx in generated_sequence:
                print(idx, self.tokenizer.decode([idx], clean_up_tokenization_spaces=True).strip())
        text = self.tokenizer.decode(generated_sequence, clean_up_tokenization_spaces=True)
        text = text[: text.find("</s>")]
        text = text[: text.rfind(".") + 1]
        return text

    def make_answer(self, beginning):
        beginning = beginning[0]
        beginning_cleaned = beginning.rstrip(''.join(self.punctuations)).lower()
        if beginning_cleaned == 'привет' or beginning_cleaned == 'как тебя зовут' or beginning_cleaned == 'как твое имя':
            time.sleep(5)
            return 'Привет, меня зовут Toodles.'
        elif beginning_cleaned in ['кто тебя сделал', 'кто тебя создал', 'кто ты', 'кто ты такой']:
            time.sleep(5)
            return 'Я - Toodles, разработка команды RTF-team, работаю на дообученной модели ruGpt3-medium.'
        elif 'сочинение' in beginning_cleaned:
            return self.gen_fragment(beginning, temperature=1.0, max_length=400)
        elif any(word in beginning_cleaned for word in ['отзыв', 'комментарий']):
            return self.gen_fragment(beginning, temperature=1.0, max_length=200)
        else:
            return self.gen_fragment(beginning, temperature=1.0, max_length=100)
