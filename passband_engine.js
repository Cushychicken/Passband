var Passband = {

    // Standard E12 resistor values with display labels
    resistors: [
        {value: 100,    label: "100 \u03a9"},
        {value: 120,    label: "120 \u03a9"},
        {value: 150,    label: "150 \u03a9"},
        {value: 180,    label: "180 \u03a9"},
        {value: 220,    label: "220 \u03a9"},
        {value: 270,    label: "270 \u03a9"},
        {value: 330,    label: "330 \u03a9"},
        {value: 390,    label: "390 \u03a9"},
        {value: 470,    label: "470 \u03a9"},
        {value: 560,    label: "560 \u03a9"},
        {value: 680,    label: "680 \u03a9"},
        {value: 820,    label: "820 \u03a9"},
        {value: 1000,   label: "1 k\u03a9"},
        {value: 1200,   label: "1.2 k\u03a9"},
        {value: 1500,   label: "1.5 k\u03a9"},
        {value: 1800,   label: "1.8 k\u03a9"},
        {value: 2200,   label: "2.2 k\u03a9"},
        {value: 2700,   label: "2.7 k\u03a9"},
        {value: 3300,   label: "3.3 k\u03a9"},
        {value: 3900,   label: "3.9 k\u03a9"},
        {value: 4700,   label: "4.7 k\u03a9"},
        {value: 5600,   label: "5.6 k\u03a9"},
        {value: 6800,   label: "6.8 k\u03a9"},
        {value: 8200,   label: "8.2 k\u03a9"},
        {value: 10000,  label: "10 k\u03a9"},
        {value: 12000,  label: "12 k\u03a9"},
        {value: 15000,  label: "15 k\u03a9"},
        {value: 18000,  label: "18 k\u03a9"},
        {value: 22000,  label: "22 k\u03a9"},
        {value: 27000,  label: "27 k\u03a9"},
        {value: 33000,  label: "33 k\u03a9"},
        {value: 39000,  label: "39 k\u03a9"},
        {value: 47000,  label: "47 k\u03a9"},
        {value: 56000,  label: "56 k\u03a9"},
        {value: 68000,  label: "68 k\u03a9"},
        {value: 82000,  label: "82 k\u03a9"},
        {value: 100000, label: "100 k\u03a9"},
        {value: 120000, label: "120 k\u03a9"},
        {value: 150000, label: "150 k\u03a9"},
        {value: 180000, label: "180 k\u03a9"},
        {value: 220000, label: "220 k\u03a9"},
        {value: 270000, label: "270 k\u03a9"},
        {value: 330000, label: "330 k\u03a9"},
        {value: 390000, label: "390 k\u03a9"},
        {value: 470000, label: "470 k\u03a9"},
        {value: 560000, label: "560 k\u03a9"},
        {value: 680000, label: "680 k\u03a9"},
        {value: 820000, label: "820 k\u03a9"},
        {value: 1000000, label: "1 M\u03a9"}
    ],

    // Standard E12 capacitor values with display labels
    capacitors: [
        {value: 10e-12,  label: "10 pF"},
        {value: 22e-12,  label: "22 pF"},
        {value: 47e-12,  label: "47 pF"},
        {value: 100e-12, label: "100 pF"},
        {value: 220e-12, label: "220 pF"},
        {value: 470e-12, label: "470 pF"},
        {value: 1e-9,    label: "1 nF"},
        {value: 2.2e-9,  label: "2.2 nF"},
        {value: 4.7e-9,  label: "4.7 nF"},
        {value: 10e-9,   label: "10 nF"},
        {value: 22e-9,   label: "22 nF"},
        {value: 47e-9,   label: "47 nF"},
        {value: 100e-9,  label: "100 nF"},
        {value: 220e-9,  label: "220 nF"},
        {value: 470e-9,  label: "470 nF"},
        {value: 1e-6,    label: "1 \u00b5F"},
        {value: 2.2e-6,  label: "2.2 \u00b5F"},
        {value: 4.7e-6,  label: "4.7 \u00b5F"},
        {value: 10e-6,   label: "10 \u00b5F"},
        {value: 22e-6,   label: "22 \u00b5F"},
        {value: 47e-6,   label: "47 \u00b5F"},
        {value: 100e-6,  label: "100 \u00b5F"}
    ],

    // Tolerance: answers within ±20% are accepted
    TOLERANCE: 0.20,

    // Frequency bounds (Hz) for generated challenges
    FREQ_MIN_HZ: 1,
    FREQ_MAX_HZ: 100e6,

    // Game state
    current_r:        null,
    current_c:        null,
    current_freq_hz:  null,
    answer_unit:      'Hz',
    answer_unit_mult: 1,
    memory_value:     '',
    score:            0,
    streak:           0,
    awaiting_next:    false,

    // DOM IDs
    challenge_id: 'challenge-screen',
    screen_id:    'calculator-screen',
    score_id:     'score-display',

    // Choose display unit so mantissa is between 1 and 999
    freqUnit: function(hz) {
        if (hz >= 1e6) return {mult: 1e6, unit: 'MHz'};
        if (hz >= 1e3) return {mult: 1e3, unit: 'kHz'};
        return {mult: 1, unit: 'Hz'};
    },

    // Format a frequency in Hz to a readable string
    formatFreq: function(hz) {
        var u = this.freqUnit(hz);
        var val = hz / u.mult;
        // Show up to 3 significant figures
        var str = parseFloat(val.toPrecision(3)).toString();
        return str + ' ' + u.unit;
    },

    challenge: function() {
        if (this.awaiting_next) return;

        var r, c, freq;
        var attempts = 0;
        do {
            r = this.resistors[Math.floor(Math.random() * this.resistors.length)];
            c = this.capacitors[Math.floor(Math.random() * this.capacitors.length)];
            freq = 1 / (2 * Math.PI * r.value * c.value);
            attempts++;
        } while ((freq < this.FREQ_MIN_HZ || freq > this.FREQ_MAX_HZ) && attempts < 200);

        this.current_r = r;
        this.current_c = c;
        this.current_freq_hz = freq;

        var u = this.freqUnit(freq);
        this.answer_unit = u.unit;
        this.answer_unit_mult = u.mult;

        this.memory_value = '';
        this.update_memory();
        this.update_challenge();
        this.update_score();
    },

    update_challenge: function() {
        var html =
            '<p class="formula-hint">f<sub>\u22123dB</sub> = 1 / (2\u03c0RC)</p>' +
            '<table class="component-table">' +
              '<tr><td class="comp-label">R</td><td class="comp-value">' + this.current_r.label + '</td></tr>' +
              '<tr><td class="comp-label">C</td><td class="comp-value">' + this.current_c.label + '</td></tr>' +
            '</table>' +
            '<p class="unit-hint">Enter your answer in <strong>' + this.answer_unit + '</strong></p>';
        document.getElementById(this.challenge_id).innerHTML = html;
    },

    update_memory: function() {
        var display = this.memory_value !== '' ? this.memory_value : '\u2014';
        document.getElementById(this.screen_id).innerHTML = display;
    },

    update_score: function() {
        var el = document.getElementById(this.score_id);
        if (el) {
            el.innerHTML =
                '<span class="score-item">Score: <strong>' + this.score + '</strong></span>' +
                '<span class="score-item">Streak: <strong>' + this.streak + '</strong></span>';
        }
    },

    put: function(value) {
        if (this.awaiting_next) return;
        // Prevent multiple decimals
        if (value === '.' && this.memory_value.indexOf('.') !== -1) return;
        this.memory_value += value;
        this.update_memory();
    },

    backspace: function() {
        if (this.awaiting_next) return;
        this.memory_value = this.memory_value.slice(0, -1);
        this.update_memory();
    },

    reset: function() {
        if (this.awaiting_next) return;
        this.memory_value = '';
        this.update_memory();
    },

    check: function() {
        if (this.awaiting_next) return;

        var userVal = parseFloat(this.memory_value);
        if (isNaN(userVal) || userVal <= 0) {
            document.getElementById(this.challenge_id).innerHTML =
                '<div class="alert alert-warning"><strong>Please enter a positive number.</strong></div>';
            return false;
        }

        var userHz = userVal * this.answer_unit_mult;
        var ratio  = userHz / this.current_freq_hz;
        var correct = ratio >= (1 - this.TOLERANCE) && ratio <= (1 + this.TOLERANCE);

        var exactStr  = this.formatFreq(this.current_freq_hz);
        var enteredStr = this.memory_value + ' ' + this.answer_unit;

        if (correct) {
            this.score++;
            this.streak++;
            document.getElementById(this.challenge_id).innerHTML =
                '<div class="alert alert-success">' +
                  '<strong>Correct!</strong> The \u22123dB frequency is ' + exactStr + '.' +
                  '<br><small>Your answer: ' + enteredStr + '</small>' +
                '</div>';
        } else {
            this.streak = 0;
            document.getElementById(this.challenge_id).innerHTML =
                '<div class="alert alert-danger">' +
                  '<strong>Not quite.</strong> The \u22123dB frequency is ' + exactStr + '.' +
                  '<br><small>Your answer: ' + enteredStr + ' &mdash; Hint: f \u2248 0.159 / (R \u00d7 C)</small>' +
                '</div>';
        }

        this.update_score();
        this.awaiting_next = true;
        var self = this;
        setTimeout(function() {
            self.awaiting_next = false;
            self.challenge();
        }, correct ? 1800 : 3000);

        return correct;
    }
};

// ---- keyboard and button wiring ----

$(document).keydown(function(e) {
    // Backspace key
    if (e.which === 8) {
        Passband.backspace();
        return false;
    }
});

$(document).keypress(function(e) {
    var key = String.fromCharCode(e.which);

    // Enter or = to check
    if (e.which === 13 || e.which === 61) {
        Passband.check();
        return false;
    }

    // Digits and decimal point
    if (/^[0-9.]$/.test(key)) {
        Passband.put(key);
        return false;
    }

    // c or C to clear
    if (key === 'c' || key === 'C') {
        Passband.reset();
        return false;
    }
});

$(document).ready(function() {
    Passband.challenge();

    $(document).on('click', '.btn[data-digit]', function(e) {
        e.preventDefault();
        Passband.put($(this).data('digit'));
    });

    $(document).on('click', '.btn[data-method]', function(e) {
        e.preventDefault();
        var method = $(this).data('method');
        if (typeof Passband[method] === 'function') {
            Passband[method]();
        }
    });
});
