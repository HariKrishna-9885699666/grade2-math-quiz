// Dynamic generator for Measurement questions
function generateMeasurementQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 2);
    if (type === 0) {
      // Length comparison
      const a = Math.floor(Math.random() * 50) + 10;
      const b = Math.floor(Math.random() * 50) + 10;
      const unit = Math.random() > 0.5 ? "cm" : "m";
      questions.push({
        question: `Which is longer: ${a} ${unit} or ${b} ${unit}?`,
        options: shuffleArray([
          a > b ? `${a} ${unit}` : `${b} ${unit}`,
          a < b ? `${a} ${unit}` : `${b} ${unit}`,
          `${a + b} ${unit}`,
          `${Math.abs(a - b)} ${unit}`
        ]),
        correctAnswer: a > b ? `${a} ${unit}` : `${b} ${unit}`
      });
    } else {
      // Time reading
      const hour = Math.floor(Math.random() * 12) + 1;
      const minute = Math.floor(Math.random() * 4) * 15;
      const correct = `${hour}:${minute.toString().padStart(2, "0")}`;
      questions.push({
        question: `What time is shown: ${hour} hours and ${minute} minutes?`,
        options: shuffleArray([
          correct,
          `${hour+1}:${minute.toString().padStart(2, "0")}`,
          `${hour}:${((minute+15)%60).toString().padStart(2, "0")}`,
          `${hour-1}:${minute.toString().padStart(2, "0")}`
        ]),
        correctAnswer: correct
      });
    }
  }
  return questions;
}
// Dynamic generator for Multiplication questions
function generateMultiplicationQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 10) + 2;
    const correct = a * b;
    const options = [
      correct,
      correct + Math.floor(Math.random() * 5 + 1),
      correct - Math.floor(Math.random() * 5 + 1),
      a * (b + 1)
    ].map(String);
    questions.push({
      question: `${a} × ${b} = ?`,
      options: shuffleArray(options),
      correctAnswer: String(correct)
    });
  }
  return questions;
}
// Dynamic generator for Shapes questions
function generateShapesQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  const shapes = ["triangle", "square", "rectangle", "circle"];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 2);
    if (type === 0) {
      // Identify shape by sides
      const idx = Math.floor(Math.random() * shapes.length);
      let sides = 0;
      if (shapes[idx] === "triangle") sides = 3;
      else if (shapes[idx] === "square" || shapes[idx] === "rectangle") sides = 4;
      else if (shapes[idx] === "circle") sides = 0;
      questions.push({
        question: `Which shape has ${sides} sides?`,
        options: shuffleArray([
          shapes[idx],
          ...shapes.filter((s, i) => i !== idx).slice(0, 3)
        ]),
        correctAnswer: shapes[idx]
      });
    } else {
      // Count sides
      const idx = Math.floor(Math.random() * (shapes.length - 1));
      let sides = 0;
      if (shapes[idx] === "triangle") sides = 3;
      else if (shapes[idx] === "square" || shapes[idx] === "rectangle") sides = 4;
      questions.push({
        question: `How many sides does a ${shapes[idx]} have?`,
        options: shuffleArray([
          `${sides}`,
          `${sides + 1}`,
          `${sides + 2}`,
          `${sides - 1}`
        ]),
        correctAnswer: `${sides}`
      });
    }
  }
  return questions;
}
// Dynamic generator for Data Handling questions
function generateDataHandlingQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  const patterns = [
    // Favorite color survey
    () => {
      const colors = ["red", "blue", "green", "yellow"];
      const votes = colors.map(() => Math.floor(Math.random() * 10) + 1);
      const max = Math.max(...votes);
      const min = Math.min(...votes);
      const maxIndex = votes.indexOf(max);
      const minIndex = votes.indexOf(min);
      return [
        {
          question: `In a class survey, ${votes[0]} students like red, ${votes[1]} like blue, ${votes[2]} like green, and ${votes[3]} like yellow. Which color is the most popular?`,
          options: shuffleArray([colors[maxIndex], ...colors.filter((c, i) => i !== maxIndex)]),
          correctAnswer: colors[maxIndex],
        },
        {
          question: `In a class survey, ${votes[0]} students like red, ${votes[1]} like blue, ${votes[2]} like green, and ${votes[3]} like yellow. Which color is the least popular?`,
          options: shuffleArray([colors[minIndex], ...colors.filter((c, i) => i !== minIndex)]),
          correctAnswer: colors[minIndex],
        },
      ];
    },
    // Pets tally
    () => {
      const pets = ["dogs", "cats", "rabbits", "birds"];
      const tallies = pets.map(() => Math.floor(Math.random() * 6) + 2);
      const total = tallies.reduce((a, b) => a + b, 0);
      return [
        {
          question: `A tally chart shows ${tallies[0]} dogs, ${tallies[1]} cats, ${tallies[2]} rabbits, and ${tallies[3]} birds. How many pets are there in total?`,
          options: shuffleArray([
            `${total}`,
            `${total + 2}`,
            `${total - 2}`,
            `${total + 4}`
          ]),
          correctAnswer: `${total}`,
        },
        {
          question: `A tally chart shows ${tallies[0]} dogs, ${tallies[1]} cats, ${tallies[2]} rabbits, and ${tallies[3]} birds. Which pet is the most?`,
          options: shuffleArray([
            pets[tallies.indexOf(Math.max(...tallies))],
            ...pets.filter((p, i) => i !== tallies.indexOf(Math.max(...tallies)))
          ]),
          correctAnswer: pets[tallies.indexOf(Math.max(...tallies))],
        },
      ];
    },
    // Vehicles bar graph
    () => {
      const vehicles = ["cars", "bikes", "buses", "trucks"];
      const counts = vehicles.map(() => Math.floor(Math.random() * 10) + 5);
      const diff = Math.abs(counts[0] - counts[1]);
      return [
        {
          question: `A bar graph shows ${counts[0]} cars, ${counts[1]} bikes, ${counts[2]} buses, and ${counts[3]} trucks. How many more cars than bikes are there?`,
          options: shuffleArray([
            `${diff}`,
            `${diff + 1}`,
            `${diff - 1}`,
            `${diff + 2}`
          ]),
          correctAnswer: `${diff}`,
        },
        {
          question: `A bar graph shows ${counts[0]} cars, ${counts[1]} bikes, ${counts[2]} buses, and ${counts[3]} trucks. Which vehicle is the least?`,
          options: shuffleArray([
            vehicles[counts.indexOf(Math.min(...counts))],
            ...vehicles.filter((v, i) => i !== counts.indexOf(Math.min(...counts)))
          ]),
          correctAnswer: vehicles[counts.indexOf(Math.min(...counts))],
        },
      ];
    },
    // Favorite sport
    () => {
      const sports = ["cricket", "football", "basketball", "tennis"];
      const votes = sports.map(() => Math.floor(Math.random() * 10) + 1);
      const max = Math.max(...votes);
      return [
        {
          question: `A survey shows ${votes[0]} like cricket, ${votes[1]} like football, ${votes[2]} like basketball, and ${votes[3]} like tennis. How many students were surveyed?`,
          options: shuffleArray([
            `${votes.reduce((a, b) => a + b, 0)}`,
            `${votes.reduce((a, b) => a + b, 0) + 2}`,
            `${votes.reduce((a, b) => a + b, 0) - 2}`,
            `${votes.reduce((a, b) => a + b, 0) + 4}`
          ]),
          correctAnswer: `${votes.reduce((a, b) => a + b, 0)}`,
        },
        {
          question: `A survey shows ${votes[0]} like cricket, ${votes[1]} like football, ${votes[2]} like basketball, and ${votes[3]} like tennis. Which sport is the most popular?`,
          options: shuffleArray([
            sports[votes.indexOf(max)],
            ...sports.filter((s, i) => i !== votes.indexOf(max))
          ]),
          correctAnswer: sports[votes.indexOf(max)],
        },
      ];
    },
    // Simple pictogram
    () => {
      const animals = ["lions", "tigers", "bears", "zebras"];
      const counts = animals.map(() => Math.floor(Math.random() * 5) + 1);
      const total = counts.reduce((a, b) => a + b, 0);
      return [
        {
          question: `A pictogram shows ${counts[0]} lions, ${counts[1]} tigers, ${counts[2]} bears, and ${counts[3]} zebras. How many animals are there in total?`,
          options: shuffleArray([
            `${total}`,
            `${total + 1}`,
            `${total - 1}`,
            `${total + 2}`
          ]),
          correctAnswer: `${total}`,
        },
        {
          question: `A pictogram shows ${counts[0]} lions, ${counts[1]} tigers, ${counts[2]} bears, and ${counts[3]} zebras. Which animal is the least?`,
          options: shuffleArray([
            animals[counts.indexOf(Math.min(...counts))],
            ...animals.filter((a, i) => i !== counts.indexOf(Math.min(...counts)))
          ]),
          correctAnswer: animals[counts.indexOf(Math.min(...counts))],
        },
      ];
    },
  ];

  for (let i = 0; i < count; i++) {
    // Pick a random pattern and a random question from that pattern
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    const qs = pattern();
    const q = qs[Math.floor(Math.random() * qs.length)];
    questions.push(q);
  }
  return questions;
}
// Dynamic generator for Subtraction questions
function generateSubtractionQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 2);
    if (type === 0) {
      // Simple subtraction
      const a = Math.floor(Math.random() * 500) + 200;
      const b = Math.floor(Math.random() * (a - 100)) + 100;
      const correct = a - b;
      const options = [
        correct,
        correct + Math.floor(Math.random() * 10 + 1),
        correct - Math.floor(Math.random() * 10 + 1),
        a - b + Math.floor(Math.random() * 20 + 2)
      ].map(String);
      questions.push({
        question: `${a} - ${b} = ?`,
        options: shuffleArray(options),
        correctAnswer: String(correct)
      });
    } else {
      // Missing subtrahend
      const minuend = Math.floor(Math.random() * 900) + 200;
      const diff = Math.floor(Math.random() * (minuend - 100)) + 50;
      const subtrahend = minuend - diff;
      const options = [
        subtrahend,
        subtrahend + Math.floor(Math.random() * 10 + 1),
        subtrahend - Math.floor(Math.random() * 10 + 1),
        subtrahend + Math.floor(Math.random() * 20 + 2)
      ].map(String);
      questions.push({
        question: `Find the missing number: ___ + ${diff} = ${minuend}`,
        options: shuffleArray(options),
        correctAnswer: String(subtrahend)
      });
    }
  }
  return questions;
}
// Dynamic generator for Addition questions
function generateAdditionQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 2);
    if (type === 0) {
      // Simple addition
      const a = Math.floor(Math.random() * 500) + 100;
      const b = Math.floor(Math.random() * 500) + 100;
      const correct = a + b;
      const options = [
        correct,
        correct + Math.floor(Math.random() * 10 + 1),
        correct - Math.floor(Math.random() * 10 + 1),
        a + b + Math.floor(Math.random() * 100 + 10)
      ].map(String);
      questions.push({
        question: `${a} + ${b} = ?`,
        options: shuffleArray(options),
        correctAnswer: String(correct)
      });
    } else {
      // Missing addend
      const sum = Math.floor(Math.random() * 900) + 200;
      const known = Math.floor(Math.random() * (sum - 100)) + 100;
      const missing = sum - known;
      const options = [
        missing,
        missing + Math.floor(Math.random() * 10 + 1),
        missing - Math.floor(Math.random() * 10 + 1),
        missing + Math.floor(Math.random() * 20 + 2)
      ].map(String);
      questions.push({
        question: `Find the missing number: ${known} + ___ = ${sum}`,
        options: shuffleArray(options),
        correctAnswer: String(missing)
      });
    }
  }
  return questions;
}
// Dynamic generator for Numbers questions
function generateNumbersQuestions(count: number): QuestionTemplate[] {
  const questions: QuestionTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 4);
    if (type === 0) {
      // Place value
      const num = Math.floor(Math.random() * 900) + 100; // 100-999
      const digits = num.toString().split("").map(Number);
      const idx = Math.floor(Math.random() * 3);
      const places = ["hundreds", "tens", "ones"];
      const place = places[idx];
      const value = digits[idx];
      questions.push({
        question: `What is the place value of ${value} in the number ${num}?`,
        options: [
          `${value} ${place}`,
          `${value} ${places[(idx+1)%3]}`,
          `${value} ${places[(idx+2)%3]}`,
          `${value*10} ones`
        ],
        correctAnswer: `${value} ${place}`
      });
    } else if (type === 1) {
      // Ascending order
      const arr = Array.from({length: 4}, () => Math.floor(Math.random()*900)+100);
      const sorted = [...arr].sort((a,b)=>a-b);
      questions.push({
        question: `Arrange in ascending order: ${arr.join(", ")}`,
        options: [
          sorted.join(", "),
          arr.reverse().join(", "),
          arr.sort((a,b)=>b-a).join(", "),
          arr.slice().sort((a,b)=>a-b).reverse().join(", ")
        ],
        correctAnswer: sorted.join(", ")
      });
    } else if (type === 2) {
      // Standard form
      const h = Math.floor(Math.random()*9+1)*100;
      const t = Math.floor(Math.random()*9+1)*10;
      const o = Math.floor(Math.random()*9+1);
      const sum = h+t+o;
      questions.push({
        question: `What is ${h} + ${t} + ${o} written in standard form?`,
        options: [
          `${sum}`,
          `${h+t+o+1}`,
          `${h+t+o-1}`,
          `${h}${t}${o}`
        ],
        correctAnswer: `${sum}`
      });
    } else {
      // Between numbers
      const base = Math.floor(Math.random()*900)+100;
      questions.push({
        question: `Which number comes between ${base} and ${base+2}?`,
        options: [
          `${base+1}`,
          `${base}`,
          `${base+2}`,
          `${base+3}`
        ],
        correctAnswer: `${base+1}`
      });
    }
  }
  return questions;
}
// Types
export type Topic = 
  | 'numbers' 
  | 'addition' 
  | 'subtraction' 
  | 'dataHandling' 
  | 'shapes' 
  | 'multiplication' 
  | 'measurement';

export interface Question {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  correctAnswer: string;
  emoji: string;
  section: string;
}

// Utility functions
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const topicEmojis: Record<Topic, string> = {
  numbers: '🔢',
  addition: '➕',
  subtraction: '➖',
  dataHandling: '📊',
  shapes: '🔷',
  multiplication: '✖️',
  measurement: '📏',
};

const sectionNames: Record<Topic, string> = {
  numbers: 'Section A: Numbers',
  addition: 'Section B: Addition',
  subtraction: 'Section C: Subtraction',
  multiplication: 'Section D: Multiplication',
  measurement: 'Section E: Measurement',
  shapes: 'Section F: Shapes',
  dataHandling: 'Section G: Data Handling',
};

export const topicNames: Record<Topic, string> = {
  numbers: 'Numbers',
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  measurement: 'Measurement',
  shapes: 'Shapes',
  dataHandling: 'Data Handling',
};

export const calculateTopicScores = (
  questions: Question[],
  answers: Record<string, string>
): Record<Topic, { correct: number; total: number }> => {
  const scores: Record<Topic, { correct: number; total: number }> = {
    numbers: { correct: 0, total: 0 },
    addition: { correct: 0, total: 0 },
    subtraction: { correct: 0, total: 0 },
    multiplication: { correct: 0, total: 0 },
    measurement: { correct: 0, total: 0 },
    shapes: { correct: 0, total: 0 },
    dataHandling: { correct: 0, total: 0 },
  };

  questions.forEach((q) => {
    scores[q.topic].total += 1;
    if (answers[q.id] === q.correctAnswer) {
      scores[q.topic].correct += 1;
    }
  });

  return scores;
};

// Question bank with all questions from the exam
interface QuestionTemplate {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questionBank: Record<Topic, QuestionTemplate[]> = {
  numbers: [
    {
      question: "What is the place value of 7 in the number 572?",
      options: ["7 ones", "7 tens", "7 hundreds", "70 ones"],
      correctAnswer: "7 tens",
    },
    {
      question: "Which number comes between 847 and 849?",
      options: ["846", "848", "850", "845"],
      correctAnswer: "848",
    },
    {
      question: "Arrange in ascending order: 615, 561, 651, 516",
      options: ["516, 561, 615, 651", "651, 615, 561, 516", "561, 516, 615, 651", "615, 561, 651, 516"],
      correctAnswer: "516, 561, 615, 651",
    },
    {
      question: "What is 300 + 90 + 4 written in standard form?",
      options: ["3904", "394", "349", "934"],
      correctAnswer: "394",
    },
    {
      question: "Which number is 100 more than 728?",
      options: ["738", "828", "729", "628"],
      correctAnswer: "828",
    },
    {
      question: "What is the place value of 5 in the number 359?",
      options: ["5 ones", "5 tens", "5 hundreds", "50 ones"],
      correctAnswer: "5 tens",
    },
    {
      question: "Which number comes between 492 and 494?",
      options: ["491", "493", "495", "490"],
      correctAnswer: "493",
    },
    {
      question: "Arrange in descending order: 423, 432, 342, 324",
      options: ["432, 423, 342, 324", "324, 342, 423, 432", "423, 432, 324, 342", "342, 324, 432, 423"],
      correctAnswer: "432, 423, 342, 324",
    },
    {
      question: "What is 500 + 60 + 7 written in standard form?",
      options: ["5607", "567", "576", "756"],
      correctAnswer: "567",
    },
    {
      question: "Which number is 100 less than 845?",
      options: ["855", "745", "844", "945"],
      correctAnswer: "745",
    },
  ],
  addition: [
    {
      question: "345 + 287 = ?",
      options: ["532", "622", "632", "542"],
      correctAnswer: "632",
    },
    {
      question: "Ravi has 456 marbles. His friend gives him 378 more marbles. How many marbles does Ravi have now?",
      options: ["834", "824", "734", "744"],
      correctAnswer: "834",
    },
    {
      question: "528 + 195 + 127 = ?",
      options: ["840", "850", "750", "860"],
      correctAnswer: "850",
    },
    {
      question: "Find the missing number: 673 + ___ = 921",
      options: ["248", "258", "348", "238"],
      correctAnswer: "248",
    },
    {
      question: "A school library has 364 books in Hindi and 479 books in English. How many books are there in total?",
      options: ["843", "833", "743", "853"],
      correctAnswer: "843",
    },
    {
      question: "256 + 389 = ?",
      options: ["545", "645", "635", "655"],
      correctAnswer: "645",
    },
    {
      question: "Priya collected 234 stamps. Her brother gave her 189 more stamps. How many stamps does she have now?",
      options: ["423", "413", "433", "323"],
      correctAnswer: "423",
    },
    {
      question: "347 + 268 + 185 = ?",
      options: ["700", "800", "790", "810"],
      correctAnswer: "800",
    },
    {
      question: "Find the missing number: 425 + ___ = 712",
      options: ["287", "297", "277", "387"],
      correctAnswer: "287",
    },
    {
      question: "A farmer has 278 mangoes and 356 oranges. How many fruits does he have in total?",
      options: ["634", "624", "534", "644"],
      correctAnswer: "634",
    },
  ],
  subtraction: [
    {
      question: "765 - 389 = ?",
      options: ["376", "476", "386", "276"],
      correctAnswer: "376",
    },
    {
      question: "A fruit seller had 842 apples. He sold 567 apples. How many apples are left?",
      options: ["285", "275", "375", "265"],
      correctAnswer: "275",
    },
    {
      question: "600 - 347 = ?",
      options: ["253", "263", "353", "243"],
      correctAnswer: "253",
    },
    {
      question: "Find the missing number: 915 - ___ = 648",
      options: ["267", "367", "257", "277"],
      correctAnswer: "267",
    },
    {
      question: "Priya has ₹734. She spends ₹486 on books. How much money does she have left?",
      options: ["248", "258", "348", "238"],
      correctAnswer: "248",
    },
    {
      question: "823 - 456 = ?",
      options: ["367", "377", "357", "467"],
      correctAnswer: "367",
    },
    {
      question: "A shop had 725 toys. It sold 389 toys. How many toys are left?",
      options: ["336", "346", "326", "436"],
      correctAnswer: "336",
    },
    {
      question: "500 - 278 = ?",
      options: ["222", "232", "212", "322"],
      correctAnswer: "222",
    },
    {
      question: "Find the missing number: 846 - ___ = 579",
      options: ["267", "277", "257", "367"],
      correctAnswer: "267",
    },
    {
      question: "Amit had ₹850. He spent ₹375 on a book. How much money is left?",
      options: ["475", "485", "465", "575"],
      correctAnswer: "475",
    },
  ],
  multiplication: [
    {
      question: "7 × 8 = ?",
      options: ["54", "56", "64", "48"],
      correctAnswer: "56",
    },
    {
      question: "If one box contains 9 chocolates, how many chocolates are there in 6 boxes?",
      options: ["45", "54", "63", "48"],
      correctAnswer: "54",
    },
    {
      question: "12 × 5 = ?",
      options: ["50", "55", "60", "65"],
      correctAnswer: "60",
    },
    {
      question: "There are 8 rows of chairs. Each row has 7 chairs. How many chairs are there in total?",
      options: ["54", "56", "64", "48"],
      correctAnswer: "56",
    },
    {
      question: "Find the product: 11 × 4 = ?",
      options: ["40", "44", "48", "42"],
      correctAnswer: "44",
    },
    {
      question: "6 × 9 = ?",
      options: ["45", "54", "63", "56"],
      correctAnswer: "54",
    },
    {
      question: "A packet has 8 biscuits. How many biscuits are there in 7 packets?",
      options: ["48", "56", "54", "64"],
      correctAnswer: "56",
    },
    {
      question: "9 × 7 = ?",
      options: ["56", "63", "72", "54"],
      correctAnswer: "63",
    },
    {
      question: "There are 5 baskets. Each basket has 12 apples. How many apples in total?",
      options: ["50", "60", "55", "65"],
      correctAnswer: "60",
    },
    {
      question: "Find the product: 8 × 8 = ?",
      options: ["56", "64", "72", "48"],
      correctAnswer: "64",
    },
  ],
  measurement: [
    {
      question: "A rope is 385 cm long. Another rope is 219 cm long. What is the total length of both ropes?",
      options: ["604 cm", "594 cm", "504 cm", "614 cm"],
      correctAnswer: "604 cm",
    },
    {
      question: "A water tank can hold 750 litres of water. If 468 litres of water is already in the tank, how much more water can be added?",
      options: ["282 litres", "292 litres", "382 litres", "272 litres"],
      correctAnswer: "282 litres",
    },
    {
      question: "Aman's height is 128 cm and his sister's height is 115 cm. How much taller is Aman than his sister?",
      options: ["13 cm", "23 cm", "15 cm", "12 cm"],
      correctAnswer: "13 cm",
    },
    {
      question: "A bag of rice weighs 5 kg. What is the weight of 8 such bags?",
      options: ["35 kg", "40 kg", "45 kg", "50 kg"],
      correctAnswer: "40 kg",
    },
    {
      question: "A ribbon is 456 cm long. Another ribbon is 287 cm long. What is the total length?",
      options: ["743 cm", "733 cm", "753 cm", "643 cm"],
      correctAnswer: "743 cm",
    },
    {
      question: "A bucket can hold 25 litres of water. How many litres can 4 such buckets hold?",
      options: ["90 litres", "100 litres", "80 litres", "110 litres"],
      correctAnswer: "100 litres",
    },
    {
      question: "Raj walked 275 meters. His friend walked 189 meters. How much more did Raj walk?",
      options: ["86 meters", "96 meters", "76 meters", "106 meters"],
      correctAnswer: "86 meters",
    },
    {
      question: "A pencil box weighs 250 grams. What is the weight of 4 such pencil boxes?",
      options: ["900 grams", "1000 grams", "1100 grams", "800 grams"],
      correctAnswer: "1000 grams",
    },
  ],
  shapes: [
    {
      question: "How many sides does a hexagon have?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6",
    },
    {
      question: "Which shape has all sides equal and 4 right angles?",
      options: ["Rectangle", "Square", "Triangle", "Circle"],
      correctAnswer: "Square",
    },
    {
      question: "A rectangular field has a length of 125 meters and width of 75 meters. What is the perimeter of the field?",
      options: ["200 meters", "300 meters", "400 meters", "500 meters"],
      correctAnswer: "400 meters",
    },
    {
      question: "How many corners does a triangle have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3",
    },
    {
      question: "Which shape has no corners?",
      options: ["Square", "Triangle", "Circle", "Rectangle"],
      correctAnswer: "Circle",
    },
    {
      question: "How many faces does a cube have?",
      options: ["4", "6", "8", "12"],
      correctAnswer: "6",
    },
    {
      question: "A square has a side of 9 cm. What is its perimeter?",
      options: ["27 cm", "36 cm", "45 cm", "18 cm"],
      correctAnswer: "36 cm",
    },
    {
      question: "How many sides does a pentagon have?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "5",
    },
  ],
  dataHandling: [
    {
      question: "A class has 456 students in total. If 238 are boys, how many are girls?",
      options: ["218", "228", "318", "208"],
      correctAnswer: "218",
    },
    {
      question: "In a survey, 345 people like mangoes, 287 people like apples, and 156 people like both. How many people like only mangoes?",
      options: ["189", "199", "289", "179"],
      correctAnswer: "189",
    },
    {
      question: "A shop sold 128 toys on Monday, 156 toys on Tuesday, and 184 toys on Wednesday. How many toys were sold in these three days?",
      options: ["458", "468", "478", "568"],
      correctAnswer: "468",
    },
    {
      question: "In a class, 15 students like cricket, 12 like football, and 8 like both. How many students like only cricket?",
      options: ["5", "7", "8", "10"],
      correctAnswer: "7",
    },
    {
      question: "A bakery sold 234 cakes in the morning and 189 cakes in the evening. How many cakes were sold in total?",
      options: ["423", "413", "433", "323"],
      correctAnswer: "423",
    },
    {
      question: "There are 325 red balls and 287 blue balls in a box. How many balls are there in total?",
      options: ["612", "602", "622", "512"],
      correctAnswer: "612",
    },
    {
      question: "In a pictograph, one symbol represents 5 books. If there are 8 symbols, how many books are there?",
      options: ["35", "40", "45", "50"],
      correctAnswer: "40",
    },
    {
      question: "A bus carried 145 passengers in the morning and 178 passengers in the evening. How many passengers were carried in total?",
      options: ["323", "313", "333", "223"],
      correctAnswer: "323",
    },
  ],
};

// Generate a set of questions with no repetition
export const generateQuestionSet = (): Question[] => {
  const topicDistribution: { topic: Topic; count: number }[] = [
    { topic: 'numbers', count: 5 },
    { topic: 'addition', count: 5 },
    { topic: 'subtraction', count: 5 },
    { topic: 'multiplication', count: 5 },
    { topic: 'measurement', count: 4 },
    { topic: 'shapes', count: 3 },
    { topic: 'dataHandling', count: 3 },
  ];

  const questions: Question[] = [];
  let questionNumber = 1;

  topicDistribution.forEach(({ topic, count }) => {
    let generated: QuestionTemplate[] = [];
    if (topic === 'numbers') generated = generateNumbersQuestions(count);
    else if (topic === 'addition') generated = generateAdditionQuestions(count);
    else if (topic === 'subtraction') generated = generateSubtractionQuestions(count);
    else if (topic === 'multiplication') generated = generateMultiplicationQuestions(count);
    else if (topic === 'measurement') generated = generateMeasurementQuestions(count);
    else if (topic === 'shapes') generated = generateShapesQuestions(count);
    else if (topic === 'dataHandling') generated = generateDataHandlingQuestions(count);

    generated.forEach((template) => {
      questions.push({
        id: `q-${questionNumber}`,
        topic,
        question: template.question,
        options: shuffleArray([...template.options]),
        correctAnswer: template.correctAnswer,
        emoji: topicEmojis[topic],
        section: sectionNames[topic],
      });
      questionNumber++;
    });
  });

  return questions;
};
