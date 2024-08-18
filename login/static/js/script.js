function toggleContent(target) {
    const contentDivs = document.querySelectorAll(".second-column > div");
    contentDivs.forEach(div => {
        div.style.display = "none";
    });
    document.querySelector("." + target).style.display = "flex";
    // Se a tela for menor que 1040px, também aplicamos o mesmo estado de exibição ao segundo contêiner
    if (window.innerWidth < 1040) {
        document.querySelector(".container-main-mobile ." + target).style.display = "flex";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Mostrar os dados pessoais logo quando a página for carregada
    document.querySelector(".dados-pessoais").style.display = "flex";

    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            const target = item.getAttribute("data-target");
            toggleContent(target);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Mostrar os dados pessoais logo quando a página for carregada
    document.querySelector(".container-main-mobile .dados-pessoais").style.display = "flex";

    const navItems = document.querySelectorAll(".menu-principal-container-mobile .nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            const target = item.getAttribute("data-target");
            toggleContent(target);
        });
    });
});

// Adicionando manipulador de evento de redimensionamento para sincronizar alterações quando a janela é redimensionada
window.addEventListener("resize", function() {
    const currentDisplay = document.querySelector(".second-column > div[style='display: flex;']");
    if (currentDisplay) {
        const target = currentDisplay.classList[0];
        toggleContent(target);
    }
});

function abrirDialog() {
    document.querySelector('.dialog-container').style.display = 'flex';
}

function fecharDialog() {
    document.querySelector('.dialog-container').style.display = 'none';
}

function fecharDialogCourse() {
    document.getElementById("dialog-container-course").style.display = 'none';
}

var fileUpload = document.getElementById("fileUpload");
var btnEnviar = document.getElementById("submitBtn");
btnEnviar.addEventListener("click", function () {
    document.getElementById("fileUpload").classList.remove("invalid");

    if (fileUpload.files.length === 0){
        fileUpload.classList.add("invalid");
    }

    if (fileUpload.files.length === 0) {
        abrirDialog();
    }
});

var fileUploadMobile = document.getElementById("fileUploadMobile");
var btnEnviarMobile = document.getElementById("submitBtnMobile");
btnEnviarMobile.addEventListener("click", function () {
    document.getElementById("fileUploadMobile").classList.remove("invalid");

    if (fileUploadMobile.files.length === 0){
        fileUploadMobile.classList.add("invalid");
    }

    if (fileUploadMobile.files.length === 0) {
        abrirDialog();
    }
});

var btnSelectionCourses = document.getElementById("selection-courses");
btnSelectionCourses.addEventListener("click", function () {
    document.querySelector(".dados-pessoais").style.display = "none";
    document.querySelector(".container-main-mobile .dados-pessoais").style.display = "none";
    document.querySelector(".container-main-mobile .mini-cursos").style.display = "flex";
    document.querySelector(".mini-cursos").style.display = "flex";
    document.querySelector(".selection-courses-box").style.display = "none";
});

function validateForm() {
    const checkboxes = document.querySelectorAll('.mini-cursos input[type="checkbox"]');
    let isAnyChecked = false;
    
    // Verifica se algum checkbox está marcado
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isAnyChecked = true;
        }
    });

    // Se nenhum checkbox estiver marcado, exibe uma mensagem de alerta
    if (!isAnyChecked) {
        document.getElementById("dialog-container-course").style.display = 'flex';
        return false; // Impede o envio do formulário
    }
    
    return true; // Permite o envio do formulário
}

//TUDO ABAIXO DESSE COMENTÁRIO SAO TESTES. LOGO APÓS, COMENTAREI TODOS ELES;
document.getElementById('submitCombo').addEventListener('click', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cpf1', document.getElementById('cpf1').value);
    formData.append('cpf2', document.getElementById('cpf2').value);
    formData.append('cpf3', document.getElementById('cpf3').value);
    formData.append('cpf4', document.getElementById('cpf4').value);
    formData.append('nome1', document.getElementById('nome1').value);
    formData.append('nome2', document.getElementById('nome2').value);
    formData.append('nome3', document.getElementById('nome3').value);
    formData.append('nome4', document.getElementById('nome4').value);

    try {
        const response = await fetch('/validar-dados-combo/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.mensagem);
            // Redirecionar ou realizar outras ações conforme necessário
            window.location.href = '/area-do-usuario'; // Substitua pelo URL desejado
        } else {
            alert(result.mensagem);
        }
    } catch (error) {
        console.error('Erro ao validar dados:', error);
        alert('Ocorreu um erro ao processar os dados. Tente novamente.');
    }
});