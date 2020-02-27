import { saveOwnersName, saveStartDate } from './db';
import router from './router';

const template = `
<section id="welcome-section">
    <!--Principal IMG-->
    <div class="img-container">
        <img src="/public/images/diaryimg.png" />
    </div>
    <div class="container-welcome">
        <!--Welcome title-->
        <h1 class="principal-title">Welcome to your <span style="color: #e678a7">new diary</span></h1>
        <!--Form section-->
        <form class="owner-form">
            <div class="input-field">
                <!--input -->
                <input id="name" type="text" class="validate" name="name" />
                <label for="name">What's your name?</label>
            </div>
            <!--button name submit -->
            <div class="container-button button-welcome">
                <button id="submit" class="btn btn-primary" type="submit">
                    Save
                </button>
            </div>
        </form>
    </div>
</section>
`;

export function initWelcomeForm() {
    const container = document.querySelector('main');
    container.innerHTML = template;

    const formWelcomeElm = container.querySelector('.owner-form');
    formWelcomeElm.addEventListener('submit', handleWelcomeFormSubmit);
}

function handleWelcomeFormSubmit(event) {
    //prevenimos que el boton actualice por default
    event.preventDefault();
    //guardamos en una variable el nombre que se introduce en el input
    //Utilizamos el name, ya que podemos obtener el valor del mismo, si utilizamos la clase name que tiene el input en el HTML
    const ownersName = event.target.name.value;
    saveOwnersName(ownersName);
    //navegar a la pagina de question
    router.navigate('');
}
