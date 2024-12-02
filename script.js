const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        correctAnswer: "Brasília"
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Juscelino Kubitschek", "Deodoro da Fonseca", "Luiz Inácio Lula da Silva"],
        correctAnswer: "Deodoro da Fonseca"
    },
    {
        question: "Qual é a fórmula da água?",
        options: ["CO2", "O2", "H2O", "N2O"],
        correctAnswer: "H2O"
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Monteiro Lobato", "Clarice Lispector"],
        correctAnswer: "Machado de Assis"
    },
    {
        question: "Qual é a maior montanha do mundo?",
        options: ["Monte Everest", "Monte Kilimanjaro", "K2", "Aconcágua"],
        correctAnswer: "Monte Everest"
    },
    {
        question: "Qual é o maior país do mundo em área?",
        options: ["Estados Unidos", "Canadá", "Rússia", "China"],
        correctAnswer: "Rússia"
    },
    {
        question: "Em que ano o Brasil se tornou independente?",
        options: ["1822", "1889", "1500", "1600"],
        correctAnswer: "1822"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "Qual é o principal gás do efeito estufa?",
        options: ["Oxigênio", "Dióxido de carbono", "Nitrogênio", "Metano"],
        correctAnswer: "Dióxido de carbono"
    },
    {
        question: "Qual é a moeda oficial dos Estados Unidos?",
        options: ["Euro", "Dólar", "Iene", "Libra Esterlina"],
        correctAnswer: "Dólar"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

function loadQuestion() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const feedbackContainer = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    
    // Clear feedback
    feedbackContainer.textContent = '';

    // Embaralha as opções de resposta
    const question = questions[currentQuestionIndex];
    const options = [...question.options];
    shuffleArray(options);

    // Load current question
    questionContainer.textContent = question.question;

    // Clear previous answers
    answersContainer.innerHTML = '';

    // Display shuffled options
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-btn');
        button.onclick = () => checkAnswer(option);
        answersContainer.appendChild(button);
    });

    nextBtn.style.display = 'none';  // Hide next button until answer is chosen
}

function checkAnswer(selectedAnswer) {
    const feedbackContainer = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        feedbackContainer.textContent = "Resposta correta!";
        score++;
    } else {
        feedbackContainer.textContent = `Resposta incorreta. A resposta correta era: ${question.correctAnswer}`;
    }

    nextBtn.style.display = 'inline-block';  // Show next question button
    updateScore();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        const questionContainer = document.getElementById('question');
        const feedbackContainer = document.getElementById('feedback');
        const nextBtn = document.getElementById('next-btn');
        questionContainer.textContent = `Fim do jogo! Você acertou ${score} de ${questions.length} perguntas.`;
        feedbackContainer.textContent = '';
        nextBtn.style.display = 'none';
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Pontuação: ${score}`;
}

function resetGame() {
    // Embaralha as perguntas
    shuffleArray(questions);

    // Reset index e pontuação
    currentQuestionIndex = 0;
    score = 0;

    // Atualiza a pontuação e carrega a primeira pergunta
    updateScore();
    loadQuestion();

    // Exibe o botão de próxima pergunta
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'inline-block';
}

// Inicia o jogo
loadQuestion();
