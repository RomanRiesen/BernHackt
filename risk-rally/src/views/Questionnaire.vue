<!-- src/views/Questionnaire.vue -->
<template>
  <div class="typeform-container">
    <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
    <div class="question-card">
      <transition name="fade" mode="out-in">
        <div v-if="!completed" class="question-section" :key="currentIndex">
          <p class="question-text">{{ currentQuestion.text }}</p>
          <form @submit.prevent="nextQuestion" class="answer-form">
            <!-- Render the input based on question type -->
            <template v-if="currentQuestion.type === 'text'">
              <input
                type="text"
                v-model="answer"
                class="answer-input"
                placeholder="Your answer..."
                required
              />
            </template>

            <template v-else-if="currentQuestion.type === 'select'">
              <select v-model="answer" class="answer-select" required>
                <option disabled value="">Bitte auswählen</option>
                <option
                  v-for="(value, key) in currentQuestion.options"
                  :key="key"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </template>

            <!-- Template for number input -->
            <template v-if="currentQuestion.type === 'number'">
              <input
                type="number"
                v-model="answer"
                @input="validateNumber"
                placeholder="Eine Zahl grösser als 0"
                required
              />
              <p v-if="numberError" style="color: red">{{ numberError }}</p>
            </template>

            <template v-else-if="currentQuestion.type === 'yesno'">
              <div class="yesno-container">
                <button
                  type="button"
                  class="yesno-button"
                  @click="(answer = 'Yes'), nextQuestion()"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="yesno-button"
                  @click="(answer = 'No'), nextQuestion()"
                >
                  No
                </button>
              </div>
            </template>

            <!-- Next button only for text or select inputs -->
            <template v-if="currentQuestion.type !== 'yesno'">
              <button type="submit" class="next-button">Weiter</button>
            </template>
          </form>
        </div>
      </transition>
      <div v-if="completed" class="results-section">
        <h2>Danke für das Ausfüllen des Fragebogens!</h2>
        <p>Ihre Antworten sind:</p>
        <ul>
          <li v-for="(answer, index) in answers" :key="index">
            <strong>{{ questions[index].text }}:</strong> {{ answer }}
          </li>
        </ul>
        <button @click="restart" class="restart-button">Von Vorne</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          text: "Was für ein Gebäudetyp haben Sie?",
          type: "select",
          options: {
            House: "Eigenheim",
            Apartment: "Apartment / Stockwerkeigentum",
            Renting: "Zur Miete",
          },
        },
        { text: "Sind Sie jemand der gerne Risiken eingeht?", type: "yesno" },
        { text: "Investieren Sie in Aktien?", type: "yesno" },
        { text: "Gehen Sie auch mal bei Rot über die Strasse?", type: "yesno" },
        { text: "Besitzen Sie ein altes Gebäude (Baujahr vor 1970)?", type: "yesno" },
        {
          text: "Ist Ihr Haus in einem Erdbebengebiet?",
          type: "yesno",
          insurance: "earthquake",
        },
        {
          text: "Ist ihr Grundstück an einem Ort, welches Felssturz gefährdet ist?",
          type: "yesno",
          insurance: "earthquake",
        },
        {
          text: "Wert des Gebäudes",
          type: "select",
          options: {
            250000: "Bis 250'000 CHF",
            500000: "Bis 500'000 CHF",
            1000000: "Bis 1'000'000 CHF",
            10000000: "Bis 10'000'000 CHF",
          },
        },
        {
          text: "Möchten Sie gegen Vandalismus versichert sein?",
          type: "yesno",
          insurance: "top",
          avoidRisk: true,
        },
        {
          text: "Möchten Sie gegen Marder- und Hornissenschäden versichert sein?",
          type: "yesno",
          insurance: "top",
          avoidRisk: true,
        },
        {
          text: "Könnten Sie eine grössere Schadenssumme selber bezahlen?",
          type: "yesno",
        },
        { text: "Schneit es bei Ihrem Gebäude viel?", type: "yesno", insurance: "water" },
        {
          text:
            "Hat Ihr Gebäude eine Solaranlage und wollen Sie auch bei Folgekosten für ihren entgangenen Strom und Opportunitätskosten versichert sein? (Z.B. wegen Hagel)",
          type: "yesno",
          avoidRisk: true,
          insurance: "solar",
        },
        { text: "Haben Sie teure Bodenbeläge?", type: "yesno", insurance: "water" },
        {
          text:
            "Hat Ihr Gebäude viel neuartige Technik? (Z.B. Klimaanlage, Bodenheizung, IoT-Steuerung)",
          type: "yesno",
          insurance: "technic",
        },
        {
          text: "Verfügen Sie über frei verfügbares Vermögen von über 20'000 CHF?",
          type: "yesno",
        }, //Prämienschätzung
        {
          text:
            "Möchten Sie bei Rechtsstreitigkeiten auf der sicheren Seite sein? Haben Sie Nachbaren, mit welchen Sie häufig aneinander geraten?",
          type: "yesno",
          insurance: "legal",
        },
        {
          text: "Möchten Sie einen plötzlichen Rohrbruch selber bezahlen?",
          type: "yesno",
          insurance: "water",
        },
        {
          text:
            "Möchten Sie gegen Einbrecher geschützt sein? Haben Sie viele Verglasungen (Fenster) in ihrem Gebäude?",
          type: "yesno",
          insurance: "bruch",
        },
        {
          text:
            "Nur das Gebäude selbst ist obligatorisch versichert, hätten Sie die weiteren Objekte (Garten, Terrasse) auch gern versichert?",
          type: "yesno",
          insurance: "surroundings",
          avoidRisk: true,
        },
        {
          text: "Wie risikofreudig sind Sie auf einer Skala von 1 bis 5?",
          type: "select",
          options: {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
          },
        }, // Allgemeine Frage, Überprüfung der Selbsteinschätzung
        {
          text:
            "Haben Sie ein Nebengebäude, welches nicht direkt Ihr Gebäude ist, welches Sie auch versichert haben möchten?",
          type: "yesno",
          insurance: "top",
          avoidRisk: true,
        },
      ],
      currentIndex: 0,
      answer: "",
      answers: [],
      completed: false,
      numberError: "",
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },
    progressBarWidth() {
      return (this.currentIndex / this.questions.length) * 100;
    },
  },
  methods: {
    nextQuestion() {
      if (this.answer !== "") {
        this.answers.push(this.answer);
        this.answer = ""; // Clear input field
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
        } else {
          this.completed = true; // Mark as completed
          this.$router.push({
            path: "/RiskGame",
            query: { answers: JSON.stringify(this.answers) },
          });
        }
      }
    },
    restart() {
      this.currentIndex = 0;
      this.answers = [];
      this.answer = "";
      this.completed = false;
    },
  },
};
</script>

<style scoped>
.typeform-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  background-color: #f0f4f8;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
}

.question-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.question-text {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
}

.answer-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.answer-input,
.answer-select {
  width: 100%;
  padding: 15px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s;
}

.answer-input:focus,
.answer-select:focus {
  border-color: #007bff;
  outline: none;
}

.next-button {
  background-color: #007bff;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button:hover {
  background-color: #0056b3;
}

.yesno-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.yesno-button {
  background-color: #007bff;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.yesno-button:hover {
  background-color: #0056b3;
}

.results-section {
  text-align: center;
}

.results-section h2 {
  margin-bottom: 20px;
}

.results-section ul {
  list-style: none;
  padding: 0;
}

.results-section li {
  margin-bottom: 10px;
}

.restart-button {
  background-color: #28a745;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.restart-button:hover {
  background-color: #218838;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<!--
export default {
  data() {
    return {
      questions: [
        'Besitzen sie ein altes Gebäude (Baujahr vor 1970)?',
        'Ist Ihr Haus in einem Erdbebengebiet?', //earthquake
        'Ist ihr Grundstück an einem Ort welcher Felssturz gefährdet ist? ', //earthquake
        'Wert der Immobilie',
        'Wollen Sie gegen Marder- und Hornissenschäden versichert sein?', //Ergänzungsversucherung
        'Möchten Sie gegebn Vandalismus versichert sein?', //Ergänzungsversucherung
        'What is your risk tolerance on a scale from 1 to 10?', //allg
        'Vermögen?', //allg

        'Schneit es viel?', //Wasserversicherung
        'Undichte Leitung sind oft schleichende Kosten, finden sie diese für nötig?', //Wasserversicherung
        'Haben sie teure Bodenbeläge?', //Wasserversicherung
        'Besitzt ihr Gebäude Solaranlagen und wollen sie 100% versichert auch bei Folgekosten für ihren entgangenen Strom und Opportunitätskosten ?', // solar
        'verfügbare Vermögen', //Prämienschätzung
        'Besitzen Sie ein Gebäude mit viel neuartiger Technik? (Z.B. Klimaanlage, Bodenheizung, IoT-Steuerung)', //Gebäudetechnik

        'Wollen sie bei Rechtsstreitigkeiten auf der sicheren Seite sein?, Haben sie Nachbaren mit welchen sie Häufig aneinander geraten?', //Immobilien-Rechtsschutzversicherung
        'Wollen Sie gegen einbrecher geschützt sein? Haben sie viele Verglasungen in ihrem Gebäude?',
        'nur das Haus selbst obligatorisch versichert, hätten sie diese weiteren Elemente(garten, terrasse) auch gern versichert?', //Umgebungsversicherung
        'Haben Sie ein Nebengebäude, welches nicht direkt ihr Gebäude ist, welches Sie auch versichert haben möchten?',
        'Möchten Sie einen plätzlichen Rohrbruch selber bezahlen?' //Wasserversicherung
      ],
      currentIndex: 0,
      answer: '',
      answers: [],
      completed: false
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null
    }
  },
  methods: {
    nextQuestion() {
      this.answers.push(this.answer)
      this.answer = '' // Clear input field
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
      } else {
        this.completed = true // Mark as completed
      }
    },
    restart() {
      this.currentIndex = 0
      this.answers = []
      this.answer = ''
      this.completed = false
    }
  }
}
</script>-->

<style scoped>
.question-container,
.results-container {
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  width: 60%;
  transition: opacity 0.5s ease-in-out;
}
input[type="text"] {
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  font-size: 1em;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 1em;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
