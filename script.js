document.addEventListener("DOMContentLoaded", function () {
    function initSlideshow(containerSelector, buttonPrevSelector, buttonNextSelector, imgSelector) {
        let images = document.querySelectorAll(containerSelector + ' ' + imgSelector);
        let currentIndex = 0;
        let intervalTime = 5000; // 5 seconds
        let interval;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        function startAutoSlide() {
            interval = setInterval(nextImage, intervalTime);
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        document.querySelector(buttonNextSelector).addEventListener('click', () => {
            stopAutoSlide();
            nextImage();
            startAutoSlide();
        });

        document.querySelector(buttonPrevSelector).addEventListener('click', () => {
            stopAutoSlide();
            prevImage();
            startAutoSlide();
        });

        // Show the first image initially
        showImage(currentIndex);

        // Start the automatic slideshow
        startAutoSlide();
    }

    // Initialize slideshows for both desktop and mobile
    initSlideshow('.imagensHeader', '.prev.desktop', '.next.desktop', 'img');
    initSlideshow('.imagensHeaderMobile', '.prev.mobile', '.next.mobile', 'img');
});



function setupCarousel(sectionClass) {
    const section = document.querySelector(sectionClass);
    const prevButton = section.querySelector('#prev');
    const nextButton = section.querySelector('#next');
    const container = section.querySelector('.comentariosContainer');
    const totalSets = section.querySelectorAll('.conjComentarios').length;
    let currentSet = 0;

    nextButton.addEventListener('click', () => {
        currentSet = (currentSet + 1) % totalSets;
        container.style.transform = `translateX(-${100 * currentSet}%)`;
    });

    prevButton.addEventListener('click', () => {
        currentSet = (currentSet - 1 + totalSets) % totalSets;
        container.style.transform = `translateX(-${100 * currentSet}%)`;
    });
}

let currentQuestion = 0;
let finalizar = 0;
let totalScore = 0;
let formAtual = 0;

function showQuestion(index, formId) {
    const questions = document.querySelectorAll(`#${formId} .question-container`);
    const nextBtn = document.getElementById(`nextBtn${formId.slice(-1)}`);
    const prevBtn = document.getElementById(`prevBtn${formId.slice(-1)}`);
    const progress = document.getElementById(`progress${formId.slice(-1)}`);

    if (finalizar === 1) {
        submitForm(document.getElementById(formId));
        return;
    }

    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });
    nextBtn.disabled = true;
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    if (index === questions.length - 1) {
        nextBtn.innerText = 'Finalizar';
        finalizar = 1;
        nextBtn.type = 'submit';
    } else {
        nextBtn.innerText = 'Próximo';
        nextBtn.type = 'button';
    }
    updateProgress(index, questions.length, progress);
}

function updateProgress(currentQuestion, totalQuestions, progressElement) {
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    progressElement.style.width = progressPercentage + '%';
}

function changeQuestion(n, formId) {
    const questions = document.querySelectorAll(`#${formId} .question-container`);
    if (n === 1 && !document.querySelector(`#${formId} input[name="${formId}-q${currentQuestion + 1}"]:checked`)) {
        return;
    }
    
    // Atualizar totalScore com o valor da questão atual
    if (n === 1) {
        const selectedValue = parseInt(document.querySelector(`#${formId} input[name="${formId}-q${currentQuestion + 1}"]:checked`).value);
        totalScore += selectedValue;
    }

    currentQuestion += n;
    if (currentQuestion >= questions.length) {
        currentQuestion = questions.length - 1;
    }
    showQuestion(currentQuestion, formId);
}

document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
        const formId = input.name.split('-')[0];
        document.getElementById(`nextBtn${formId.slice(-1)}`).disabled = false;
    });
});

function mostrarFormulario(formularioId) {
    const formularios = document.querySelectorAll('.container');
    formularios.forEach(form => {
        form.style.display = 'none';
    });

    const formularioSelecionado = document.getElementById(formularioId);
    if (formularioSelecionado) {
        formularioSelecionado.style.display = 'block';
        currentQuestion = 0;
        totalScore = 0;  // Reiniciar totalScore ao iniciar um novo formulário
        finalizar = 0;  // Resetar o flag finalizar
        formAtual = 
        showQuestion(currentQuestion, formularioId);
    }

    // Ocultar todas as divs de conclusão de teste
    const conclusaoDivs = document.querySelectorAll('.testConclusion');
    conclusaoDivs.forEach(div => {
        div.style.display = 'none';
    });
}

function submitForm(event) {
    event.preventDefault();
    const formId = event.target.id;
    const formContainer = document.getElementById(formId).parentElement;
    const conclusionDiv = formContainer.querySelector('.testConclusion');

    if (conclusionDiv) {
        let resultadoTexto = '';
        
        switch(formId){
            case 'formularioTeste1':
                if (totalScore === 5) {
                    resultadoTexto = 'Resultou em 5';
                } else if (totalScore === 6) {
                    resultadoTexto = 'Resultou em 6';
                } else if (totalScore === 7) {
                    resultadoTexto = 'Resultou em 7';
                } else if (totalScore >= 8) {
                    resultadoTexto = 'Resultou em 8 ou mais';
                }
            break;
            case 'formulario2':
                if (totalScore === 5) {
                    resultadoTexto = 'Resultou em 5';
                } else if (totalScore === 6) {
                    resultadoTexto = 'Resultou em 6';
                } else if (totalScore === 7) {
                    resultadoTexto = 'Resultou em 7';
                } else if (totalScore >= 8) {
                    resultadoTexto = 'Resultou em 8 ou mais';
                }
            break;
            default:
                 resultadoTexto = 'Resultou em nada'
            break;
        }

        conclusionDiv.querySelector('.result p').innerHTML = `<span>resultado é:</span> ${resultadoTexto}`;
        conclusionDiv.style.display = 'block';
    }
}

setupCarousel('.divComentariosDesktop');
setupCarousel('.divComentariosMobile');